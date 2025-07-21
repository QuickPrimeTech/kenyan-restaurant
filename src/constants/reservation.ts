/**
 * Reservation system constants and configuration
 * This file contains all static data and configuration used in the reservation system
 */

import {
  Trees,
  Home,
  Crown,
  Heart,
  Gift,
  Briefcase,
  Star,
  Users,
} from "lucide-react";
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
];

/**
 * Available dining areas with their properties
 * Each area has associated images and descriptions
 */

export const DINING_AREAS: DiningArea[] = [
  {
    id: "indoor",
    name: "Indoor Dining",
    icon: Home,
    description: "Climate-controlled comfort with elegant ambiance",
    image: "/placeholder.svg?height=360&width=640&text=Indoor+Dining",
    images: [
      "/placeholder.svg?height=360&width=640&text=Indoor+Dining+1",
      "/placeholder.svg?height=360&width=640&text=Indoor+Dining+2",
      "/placeholder.svg?height=360&width=640&text=Indoor+Dining+3",
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Terrace",
    icon: Trees,
    description: "Al fresco dining with garden views",
    image: "/placeholder.svg?height=360&width=640&text=Outdoor+Terrace",
    images: [
      "/placeholder.svg?height=360&width=640&text=Outdoor+Terrace+1",
      "/placeholder.svg?height=360&width=640&text=Outdoor+Terrace+2",
      "/placeholder.svg?height=360&width=640&text=Outdoor+Terrace+3",
    ],
  },
  {
    id: "private",
    name: "Private Dining",
    icon: Crown,
    description: "Exclusive rooms for intimate gatherings",
    image: "/placeholder.svg?height=360&width=640&text=Private+Dining",
    images: [
      "/placeholder.svg?height=360&width=640&text=Private+Dining+1",
      "/placeholder.svg?height=360&width=640&text=Private+Dining+2",
      "/placeholder.svg?height=360&width=640&text=Private+Dining+3",
    ],
  },
];

/**
 * Available tables organized by dining area
 * Each table has capacity, features, and availability status
 */
export const TABLES: TablesMap = {
  indoor: [
    {
      id: "indoor-1",
      name: "Window Table 1",
      capacity: 2,
      features: ["Window view", "Romantic lighting"],
      image: "/placeholder.svg?height=270&width=480&text=Window+Table+1",
      available: true,
    },
    {
      id: "indoor-2",
      name: "Central Table 5",
      capacity: 4,
      features: ["Central location", "Great for groups"],
      image: "/placeholder.svg?height=270&width=480&text=Central+Table+5",
      available: true,
    },
    {
      id: "indoor-3",
      name: "Corner Booth 3",
      capacity: 6,
      features: ["Privacy", "Comfortable seating"],
      image: "/placeholder.svg?height=270&width=480&text=Corner+Booth+3",
      available: false,
    },
    {
      id: "indoor-4",
      name: "Bar Counter",
      capacity: 2,
      features: ["Chef's view", "Interactive dining"],
      image: "/placeholder.svg?height=270&width=480&text=Bar+Counter",
      available: true,
    },
  ],
  outdoor: [
    {
      id: "outdoor-1",
      name: "Garden View 1",
      capacity: 2,
      features: ["Garden view", "Fresh air"],
      image: "/placeholder.svg?height=270&width=480&text=Garden+View+1",
      available: true,
    },
    {
      id: "outdoor-2",
      name: "Terrace Table 4",
      capacity: 4,
      features: ["City view", "Sunset dining"],
      image: "/placeholder.svg?height=270&width=480&text=Terrace+Table+4",
      available: true,
    },
    {
      id: "outdoor-3",
      name: "Pergola Seating",
      capacity: 8,
      features: ["Covered area", "Group dining"],
      image: "/placeholder.svg?height=270&width=480&text=Pergola+Seating",
      available: true,
    },
  ],
  private: [
    {
      id: "private-1",
      name: "Executive Room",
      capacity: 8,
      features: ["Private room", "Business amenities"],
      image: "/placeholder.svg?height=270&width=480&text=Executive+Room",
      available: true,
    },
    {
      id: "private-2",
      name: "Celebration Suite",
      capacity: 12,
      features: ["Private room", "Party setup"],
      image: "/placeholder.svg?height=270&width=480&text=Celebration+Suite",
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
