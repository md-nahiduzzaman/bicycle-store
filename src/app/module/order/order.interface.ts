import { ObjectId } from 'mongoose';

export interface ICartItem {
  product: ObjectId;
  quantity: number;
}

export interface IPaymentData {
  paymentIntentId: number;
  paymentAmount: string;
}

export interface IOrder {
  email: string;
  cartItems: ICartItem[];
  totalPrice: number;
  paymentData: IPaymentData;
}
