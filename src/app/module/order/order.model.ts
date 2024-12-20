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
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity can not be negative'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price can not be negative'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Order = model('Order', orderSchema);
export default Order;
