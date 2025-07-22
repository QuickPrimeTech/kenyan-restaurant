export type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  popular?: boolean;
  dietary: string[] | [];
};
