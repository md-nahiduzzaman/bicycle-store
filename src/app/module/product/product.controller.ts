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
// const getProduct = async (req: Request, res: Response) => {
//   try {
//     const { searchTerm } = req.query;

//     const result = await productService.getProduct(searchTerm as string);

//     res.json({
//       status: true,
//       message: 'Bicycles retrieved successfully',
//       data: result,
//     });
//   } catch (error) {
//     const err = error as Error;

//     res.json({
//       success: false,
//       message: 'Something went wrong',
//       error: err.message,
//       stack: err.stack,
//     });
//   }
// };

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

//get specific product controller for update
const getUpdateProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getUpdateProductId(productId);

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
      stack: err.stack,
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
      stack: err.stack,
    });
  }
};

// Get products with search & filters
const getProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm, brand, category, inStock, priceRange, model } =
      req.query;

    const filters = {
      searchTerm: searchTerm as string | undefined,
      brand: brand as string | undefined,
      category: category as string | undefined,
      inStock: inStock as string | undefined,
      priceRange: priceRange as string | undefined,
      model: model as string | undefined,
    };

    const result = await productService.getProduct(filters);

    res.json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
      stack: err.stack,
    });
  }
};

export const productController = {
  createProduct,
  getProduct,
  getProductById,
  getUpdateProductId,
  updateProduct,
  deleteProduct,
};
