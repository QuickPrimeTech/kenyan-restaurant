// 1. Updated Interface matching public.offers schema
type Offer = {
  id: string;
  title: string;
  description: string;
  image_url: string; // Changed from image
  start_time: string; // Format: "HH:mm:ss"
  end_time: string; // Format: "HH:mm:ss"
  is_recurring: boolean;
  start_date?: string | null;
  end_date?: string | null;
  days_of_week?: string[] | null;
  lqip?: string | null; // Blur hash support
};
