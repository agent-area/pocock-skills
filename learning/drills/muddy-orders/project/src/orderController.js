// HTTP-ish handlers. The real server wires these to routes.
export function createOrderController(orderService) {
  return {
    handlePlaceOrder(req) {
      const body = req.body ?? {};
      if (!body.items || !body.items.length) {
        return { status: 400, body: { error: "no items" } };
      }
      for (const item of body.items) {
        if (typeof item.qty !== "number" || item.qty < 1) {
          return { status: 400, body: { error: `bad qty for ${item.sku}` } };
        }
      }
      try {
        return { status: 201, body: orderService.placeOrder(body) };
      } catch (err) {
        return { status: 422, body: { error: err.message } };
      }
    },

    handleRefundItem(req) {
      try {
        return { status: 200, body: orderService.refundItem(Number(req.params.orderId), req.params.sku) };
      } catch (err) {
        return { status: 422, body: { error: err.message } };
      }
    },
  };
}
