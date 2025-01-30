import express from 'express';
import { createPaymentIntent } from './payment.controller';

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent', createPaymentIntent);

export default paymentRouter;
