import { Request, Response } from 'express';
import { productService } from './product.service';

//create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

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

//get product
const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProduct();

    res.json({
      status: true,
      message: 'Bicycles retrieved successfully',
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

//get specific product
const getProductById = async (req: Request, res: Response) => {
  try {
    // console.log(req.params);
    const productId = req.params.productId;
    const result = await productService.getProductById(productId);

    res.json({
      status: true,
      message: 'Bicycles retrieved successfully',
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

//update specific product

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
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

//delete specific product

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
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
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
