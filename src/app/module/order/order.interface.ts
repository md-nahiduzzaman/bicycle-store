import { ObjectId } from 'mongoose';

export interface ICartItem {
  product: ObjectId;
  quantity: number;
}

export interface IOrder {
  email: string;
  cartItems: ICartItem[];
  totalPrice: number;
}
