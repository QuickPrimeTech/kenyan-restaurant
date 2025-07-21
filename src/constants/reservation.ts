/**
 * Reservation system constants and configuration
 * This file contains all static data and configuration used in the reservation system
 */

import { Trees, Home, Heart, Gift, Briefcase, Star, Users } from "lucide-react";
import type {
  DiningArea,
  TablesMap,
  ReservationStep,
  OccasionLabels,
  RestaurantConfig,
  OccasionType,
} from "@/types/reservations";

/**
 * Restaurant operating configuration
 * These values control the core business rules for reservations
 */
export const RESTAURANT_CONFIG: RestaurantConfig = {
  OPEN_HOUR: 10, // 10:00 AM opening time
  CLOSE_HOUR: 22, // 10:00 PM closing time
  MINIMUM_ADVANCE_HOURS: 3, // Minimum 3 hours advance booking
  MAX_ADVANCE_DAYS: 7, // Maximum 7 days advance booking
  TIME_SLOT_INTERVAL_MINUTES: 30, // 30-minute time slot intervals
  MAX_PARTY_SIZE: 12, // Maximum party size before requiring phone booking
};

/**
 * Multi-step form configuration
 * Defines the steps in the reservation process
 */
export const RESERVATION_STEPS: ReservationStep[] = [
  {
    id: "datetime",
    title: "Date & Time",
    description: "When would you like to dine?",
  },
  {
    id: "party",
    title: "Party Details",
    description: "Tell us about your group",
  },
  {
    id: "table",
    title: "Select Table",
    description: "Choose your perfect spot",
  },
  {
    id: "contact",
    title: "Contact Info",
    description: "How can we reach you?",
  },
  {
    id: "confirm",
    title: "Confirm",
    description: "Review your reservation",
  },
  {
    id: "Success",
    title: "Success",
    description: "Successfuly reserved you a table",
  },
];

/**
 * Available dining areas with their properties
 * Each area has associated images and descriptions
 */

export const diningAreas: DiningArea[] = [
  {
    id: "indoor",
    name: "Indoor Dining",
    icon: Home,
    description: "Climate-controlled comfort with elegant ambiance",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753105596/imgi_200_Bungalo34_delrjt.jpg",
    images: [
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753105644/imgi_156_Tide-Room-Daytime-scaled.jpg_czfg9d.webp",
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753105684/imgi_136_BRGR-Restaurant_TIBR-Tables-scaled_uc8sfa.jpg",
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753105735/imgi_194_IMG_3664_nrsasv.jpg",
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Terrace",
    icon: Trees,
    description: "Al fresco dining with garden views",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753107080/imgi_173_sjuiv-restaurant-0113-hor-wide_o557zc.jpg",
    images: [
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753107122/imgi_149_93b250b9_qpood7.jpg",
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753107141/imgi_199_KHaydenAmritCocktailTerraceDusk-scaled_v4z4py.jpg",
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753107167/imgi_196_Home-Restaurants-Half-Width-1680x0-c-default_kdozfp.jpg",
    ],
  },
];

/**
 * Available tables organized by dining area
 * Each table has capacity, features, and availability status
 */
export const tables: TablesMap = {
  indoor: [
    {
      id: "indoor-1",
      name: "Window Table 1",
      capacity: 2,
      features: ["Window view", "Romantic lighting"],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753105644/imgi_156_Tide-Room-Daytime-scaled.jpg_czfg9d.webp",
      available: true,
    },
    {
      id: "indoor-2",
      name: "Central Table 5",
      capacity: 4,
      features: ["Central location", "Great for groups"],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753105684/imgi_136_BRGR-Restaurant_TIBR-Tables-scaled_uc8sfa.jpg",
      available: true,
    },
    {
      id: "indoor-3",
      name: "Corner Booth 3",
      capacity: 6,
      features: ["Privacy", "Comfortable seating"],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753105735/imgi_194_IMG_3664_nrsasv.jpg",
      available: true,
    },
  ],
  outdoor: [
    {
      id: "outdoor-1",
      name: "Garden View 1",
      capacity: 2,
      features: ["Garden view", "Fresh air"],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753107080/imgi_173_sjuiv-restaurant-0113-hor-wide_o557zc.jpg",
      available: true,
    },
    {
      id: "outdoor-2",
      name: "Terrace Table 4",
      capacity: 4,
      features: ["City view", "Sunset dining"],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753107122/imgi_149_93b250b9_qpood7.jpg",
      available: true,
    },
    {
      id: "outdoor-3",
      name: "Pergola Seating",
      capacity: 8,
      features: ["Covered area", "Group dining"],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753107141/imgi_199_KHaydenAmritCocktailTerraceDusk-scaled_v4z4py.jpg",
      available: true,
    },
  ],
};

/**
 * Available occasion types with their icons
 * Used in the party details step for special event selection
 */
export const OCCASIONS = [
  { value: "casual" as OccasionType, label: "Casual Dining", icon: Users },
  { value: "anniversary" as OccasionType, label: "Anniversary", icon: Heart },
  { value: "birthday" as OccasionType, label: "Birthday", icon: Gift },
  {
    value: "business" as OccasionType,
    label: "Business Meeting",
    icon: Briefcase,
  },
  { value: "special" as OccasionType, label: "Special Occasion", icon: Star },
];

/**
 * Human-readable labels for occasion types
 * Used for display purposes in confirmation and summary views
 */
export const OCCASION_LABELS: OccasionLabels = {
  casual: "Casual Dining",
  anniversary: "Anniversary",
  birthday: "Birthday",
  business: "Business Meeting",
  special: "Special Occasion",
};
