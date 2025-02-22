export interface IProduct {
  name: string;
  brand: string;
  price: number;
  img: string;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
}
