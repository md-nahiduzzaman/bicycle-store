// const express = require("express");
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import productRouter from './app/module/product/product.router';

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/product', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Alhamdulillah, Bicycle Store Server Live..',
  });
});

export default app;
