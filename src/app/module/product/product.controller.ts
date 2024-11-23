import { Request, Response } from 'express';
import { productService } from './product.service';

//create product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await productService.createProduct(payload);

    res.json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;

    res.json({
      success: false,
      message: 'Validation failed',
      error: err,
      stack: err.stack,
    });
  }
};

//get product controller
const getProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await productService.getProduct(searchTerm as string);

    res.json({
      status: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;

    res.json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
      stack: err.stack,
    });
  }
};

//get specific product controller
const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getProductById(productId);

    res.json({
      status: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;

    res.json({
      success: false,
      message: 'Product not found',
      error: err.message,
      stack: err.stack,
    });
  }
};

//update specific product controller
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await productService.updateProduct(productId, body);

    res.json({
      status: true,
      message: 'Bicycle updated successfully',
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

//delete specific product controller
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await productService.deleteProduct(productId);

    res.json({
      status: true,
      message: 'Bicycle deleted successfully',
      result: {},
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

export const productController = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
