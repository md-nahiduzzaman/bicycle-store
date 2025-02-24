import { Request, Response } from 'express';
import Stripe from 'stripe';
import config from '../../config';

// const stripe = new Stripe(config.stripe_secret_key as string, {
//   apiVersion: '2020-08-27',
// });

const stripe = new Stripe(config.stripe_secret_key as string);

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd', // or any currency
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
