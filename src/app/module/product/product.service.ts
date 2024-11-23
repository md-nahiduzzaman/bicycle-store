import { IProduct } from './product.interface';
import Product from './product.model';

// create product
const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);

  return result;
};

// get product
const getProduct = async (searchTerm: string | undefined) => {
  let filter = {};
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    filter = {
      $or: [{ name: regex }, { brand: regex }, { type: regex }],
    };
  }

  const result = await Product.find(filter);
  return result;
};

// get specific product by id
const getProductById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// update product
const updateProduct = async (id: string, data: IProduct) => {
  const result = await Product.findByIdAndUpdate(id, data, { new: true });
  return result;
};

// delete product
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
