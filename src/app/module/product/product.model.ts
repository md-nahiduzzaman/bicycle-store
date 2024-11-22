import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    brand: {
      type: String,
      required: [true, 'Please enter brand name'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    type: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message: '{VALUE} is not valid, please provide a valid type',
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, '{VALUE} is not valid, quantity can not be less than zero'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = model('Product', productSchema);
export default Product;
