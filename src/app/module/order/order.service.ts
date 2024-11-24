import Product from '../product/product.model';
import { IOrder } from './order.interface';
import Order from './order.model';

// place order service
const placeOrder = async (orderData: IOrder) => {
  const { product, quantity } = orderData;

  const foundProduct = await Product.findById(product);
  if (!foundProduct) {
    throw new Error('Product not found');
  }
  if (foundProduct.quantity < quantity) {
    throw new Error('Insufficient quantity');
  }

  foundProduct.quantity = foundProduct.quantity - quantity;
  foundProduct.inStock = foundProduct.quantity > 0;
  await foundProduct.save();

  const order = new Order(orderData);
  return await order.save();
};

// calculate revenue service
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
};
