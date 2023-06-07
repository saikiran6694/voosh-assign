import asyncHandler from "express-async-handler";
import { orderModel as Orders } from "../models/orderModel.js";

// @desc Get all orders
// @apply GET /api/orders
// @access private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find({ user_id: req.user.id });
  res.status(200).json(orders);
});

// @desc post a order
// @apply POST /api/orders
// @access private
const createOrders = asyncHandler(async (req, res) => {
  const { subTotal, email, phone } = req.body;
  if (!subTotal || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const order = await Orders.create({
    subTotal,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(order);
});

// @desc Get a order
// @apply GET /api/orders/:id
// @access private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Not Found a contact");
  }
  res.status(200).json(order);
});

// @desc Update a order
// @apply PUT /api/orders/:id
// @access private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Not Found a contact");
  }

  if (order.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to update other user order");
  }

  const updateOrder = await Orders.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json(updateOrder);
});

// @desc Delete a order
// @apply DELETE /api/orders/:id
// @access private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Not Found a contact");
  }

  if (order.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to update other user contacts");
  }

  const deleteOrder = await Orders.findByIdAndRemove(req.params.id);
  res.status(200).json(deleteOrder);
});

export { getOrder, getOrders, deleteOrder, updateOrder, createOrders };
