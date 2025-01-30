import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/module/product/product.router';
import orderRouter from './app/module/order/order.router';
import AuthRouter from './app/module/auth/auth.router';
import userRouter from './app/module/user/user.router';
import paymentRouter from './app/module/payment/payment.router';

const app: Application = express();

// List of allowed origins
const allowedOrigins = ['https://spinzo.vercel.app', 'http://localhost:5173'];

// Configure CORS with dynamic origin handling
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// Parsers
app.use(express.json());

// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment', paymentRouter);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Alhamdulillah, Bicycle Store Server Live..',
  });
});

export default app;
