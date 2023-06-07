import express from "express";
import {
  getOrder,
  getOrders,
  createOrders,
  deleteOrder,
  updateOrder,
} from "../controllers/orderController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.use(validateToken);
router.route("/").get(getOrders).post(createOrders);
router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

export default router;
