export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number | string;
  category: string;
  image: string;
  rating?: number;
  popular?: boolean;
};
