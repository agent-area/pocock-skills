# muddy-orders

Order intake for a small online shop: place an order, refund an item.

```bash
npm test
```

Node 20+, no dependencies.

## Layout

- `src/app.js` wires everything together
- `src/orderController.js` request handlers
- `src/orderService.js` order placement and refunds
- `src/priceUtils.js`, `src/discountUtils.js`, `src/taxUtils.js` pricing helpers
- `src/orderValidator.js`, `src/orderMapper.js` input checks and row/DTO mapping
- `src/*Repo.js`, `src/db.js` data access over an in-memory store
