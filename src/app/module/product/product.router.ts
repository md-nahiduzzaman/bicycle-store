import { Router } from 'express';
import { productController } from './product.controller';
import auth from '../../middlewares/auth';

const productRouter = Router();

// Then place your parameter routes
productRouter.post('/', productController.createProduct);
productRouter.get('/:productId', productController.getProductById);
productRouter.get(
  '/update/:productId',
  auth('admin'),
  productController.getUpdateProductId,
);
productRouter.put(
  '/:productId',
  auth('admin'),
  productController.updateProduct,
);
productRouter.delete(
  '/:productId',
  auth('admin'),
  productController.deleteProduct,
);
productRouter.get('/', productController.getProduct);

export default productRouter;
