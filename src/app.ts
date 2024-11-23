// const express = require("express");
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import productRouter from './app/module/product/product.router';
import orderRouter from './app/module/order/order.router';

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Alhamdulillah, Bicycle Store Server Live..',
  });
});

export default app;
