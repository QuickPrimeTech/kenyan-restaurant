export interface ChoiceOption {
  label: string;
  price: number;
}

export interface MenuChoice {
  id?: string; // optional, not all choices have an id
  title: string;
  options: ChoiceOption[];
  required?: boolean; // optional
  maxSelectable?: number; // optional, defaults to 1 for single selection
}

export type MenuItem = {
  id: 669;
  name: string;
  description: string;
  price: number;
  category: string;
  is_available: boolean;
  image_url: string | null;
  dietary_preference: [];
  choices: MenuChoice[] | []; // optional
  lqip: string | null;
  start_time: string;
  end_time: string;
  is_popular: false;
  slug: string;
};
