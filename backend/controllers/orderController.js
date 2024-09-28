import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const newOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    order,
  });
};

const getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json({ order });
};

const myOrders = async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });
  if (!order) {
    res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json({ order });
};

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    totalAmount,
    orders,
  });
};

const updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus == "delivered") {
    res.status(401).json({ message: "Order has been already delivered" });
  }

  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({ success: true });
};

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  product.save({ validateBeforeSave: false });
}

const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res
      .status(404)
      .json({ message: "Oops... Order is not found with this id" });
  }

  await order.deleteOne();
  res.status(200).json({ message: "Order deleted successfully" });
};

export {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
