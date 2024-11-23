import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      minlength: 5,
      maxlength: 30,
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
        message:
          '{VALUE} is not valid, please provide a valid type like Mountain, Road, Hybrid, BMX, Electric',
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
    versionKey: false,
  },
);

const Product = model('Product', productSchema);
export default Product;
