import Product from '../product/product.model';
import { IOrder } from './order.interface';
import Order from './order.model';
import mongoose from 'mongoose';

const placeOrder = async (orderData: IOrder) => {
  const { email, cartItems, totalPrice, paymentData } = orderData;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (const cartItem of cartItems) {
      const { product, quantity } = cartItem;

      const foundProduct = await Product.findById(product).session(session);
      if (!foundProduct) {
        throw new Error(`Product with ID ${product} not found`);
      }

      if (foundProduct.quantity < quantity) {
        throw new Error(`Insufficient stock for product: ${foundProduct.name}`);
      }

      foundProduct.quantity -= quantity;
      foundProduct.inStock = foundProduct.quantity > 0;
      await foundProduct.save({ session });
    }

    const newOrder = new Order({
      email,
      cartItems,
      totalPrice,
      paymentData,
    });

    const savedOrder = await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    return savedOrder;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// get user service
const getOrder = async () => {
  const result = await Order.find();
  return result;
};

const calculateRevenue = async () => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return revenue.length > 0 ? revenue[0].totalRevenue : 0;
};

export const orderService = {
  placeOrder,
  calculateRevenue,
  getOrder,
};
