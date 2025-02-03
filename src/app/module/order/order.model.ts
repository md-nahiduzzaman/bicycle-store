import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
    },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: [1, 'Total price must be at least 1'],
    },
    paymentData: {
      paymentIntentId: {
        type: String,
        required: true,
      },
      paymentAmount: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
