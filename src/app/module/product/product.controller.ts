import { Request, Response } from 'express';
import Product from './product.model';

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await Product.create(payload);

    res.json({
      status: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Validation failed',
      error,
    });
  }
};

export const productController = {
  createProduct,
};
