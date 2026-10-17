import { createDb } from "./db.js";
import { createProductRepo } from "./productRepo.js";
import { createCustomerRepo } from "./customerRepo.js";
import { createInventoryRepo } from "./inventoryRepo.js";
import { createOrderService } from "./orderService.js";
import { createOrderController } from "./orderController.js";

export function createApp(db = createDb()) {
  const orderService = createOrderService({
    db,
    productRepo: createProductRepo(db),
    customerRepo: createCustomerRepo(db),
    inventoryRepo: createInventoryRepo(db),
  });
  return { db, orderService, controller: createOrderController(orderService) };
}
