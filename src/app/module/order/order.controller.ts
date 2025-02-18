import { Request, Response } from 'express';
import { orderService } from './order.service';

// Create order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, cartItems, totalPrice, paymentData } = req.body;

    if (!email || !cartItems || !totalPrice || !paymentData) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid order data' });
    }

    const orderData = { email, cartItems, totalPrice, paymentData };
    const result = await orderService.placeOrder(orderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: `Server Error - ${err.message}`,
      stack: err.stack,
    });
  }
};

// Calculate total revenue controller
const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.calculateRevenue();

    res.json({
      status: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;

    res.json({
      success: false,
      message: 'Something went wrong',
      error: err,
      stack: err.stack,
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue,
};
