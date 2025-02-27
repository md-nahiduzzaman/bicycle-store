/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from './product.interface';
import Product from './product.model';

// create product
const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);

  return result;
};

// get product
// const getProduct = async (searchTerm: string | undefined) => {
//   let filter = {};
//   if (searchTerm) {
//     const regex = new RegExp(searchTerm, 'i');
//     filter = {
//       $or: [{ name: regex }, { brand: regex }, { type: regex }],
//     };
//   }

//   const result = await Product.find(filter);
//   return result;
// };

// get specific product by id
const getProductById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// get specific product by id for update
const getUpdateProductId = async (id: string) => {
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

// Get products with search & filters

// const getProduct = async (filters: any) => {
//   let query: any = {};

//   // Search term filter
//   if (filters.searchTerm) {
//     const regex = new RegExp(filters.searchTerm, 'i');
//     query.$or = [{ name: regex }, { brand: regex }, { category: regex }];
//   }

//   // Handle the inStock filter
//   if (filters.inStock !== undefined && filters.inStock !== 'all') {
//     // Check if inStock is true or false and filter accordingly
//     query.inStock =
//       filters.inStock === 'true'
//         ? true
//         : filters.inStock === 'false'
//           ? false
//           : undefined;
//   }

//   // Handle other filters
//   if (filters.brand && filters.brand !== 'all') {
//     query.brand = filters.brand;
//   }

//   if (filters.category && filters.category !== 'all') {
//     query.category = filters.category;
//   }

//   // Handle price range filter
//   if (filters.priceRange) {
//     const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
//     query.price = { $gte: minPrice, $lte: maxPrice };
//   }

//   // Handle model filter
//   if (filters.model && filters.model !== 'all') {
//     query.model = filters.model;
//   }

//   // Fetch the products based on the constructed query
//   const result = await Product.find(query);
//   return result;
// };

const getProduct = async (filters: any): Promise<IProduct[]> => {
  const query: any = {};

  if (filters.searchTerm) {
    query.name = { $regex: filters.searchTerm, $options: 'i' };
  }

  if (filters.brand && filters.brand !== 'all') {
    query.brand = filters.brand;
  }

  if (filters.category && filters.category !== 'all') {
    query.category = filters.category;
  }

  if (filters.inStock && filters.inStock !== 'all') {
    query.inStock = filters.inStock === 'true';
  }

  return await Product.find(query);
};

export const productService = {
  createProduct,
  getProduct,
  getProductById,
  getUpdateProductId,
  updateProduct,
  deleteProduct,
};
