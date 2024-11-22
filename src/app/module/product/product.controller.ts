import { Request, Response } from 'express';
import Product from './product.model';
import { productService } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    // const result = await Product.create(payload);
    const result = await productService.createProduct(payload);

    res.json({
      status: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const productController = {
  createProduct,
};
