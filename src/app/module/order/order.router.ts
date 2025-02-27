import { Router } from 'express';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/', orderController.getOrder);
orderRouter.get('/revenue', orderController.getRevenue);
orderRouter.delete('/:orderId', orderController.deleteOrder);

export default orderRouter;
