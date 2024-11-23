import { Request, Response } from 'express';
import { orderService } from './order.service';

//  create order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await orderService.placeOrder(orderData);

    res.json({
      status: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;

    res.json({
      success: false,
      message: 'Something went wrong',
      error: err,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  }
};

// calculate total revenue controller
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
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue,
};
