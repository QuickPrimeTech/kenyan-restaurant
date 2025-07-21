import type React from "react";
/**
 * Core reservation data types and interfaces
 * This file contains all TypeScript types used throughout the reservation system
 */

/**
 * Represents the dining area options available in the restaurant
 */
export type DiningAreaType = "indoor" | "outdoor";

/**
 * Represents the occasion types for special events
 */
export type OccasionType =
  | "casual"
  | "anniversary"
  | "birthday"
  | "business"
  | "special";

/**
 * Main reservation data interface that holds all form data
 * This is the central data structure passed between components
 */
export interface ReservationData {
  // Date and time selection
  date: Date | null;
  time: string;

  // Party information
  partySize: number;
  occasion: OccasionType | "";
  specialRequests: string;

  // Table selection
  diningArea: DiningAreaType;
  tableId: string;
  tableName: string;

  // Contact information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dietaryRestrictions: string;
}

/**
 * Props interface for components that update reservation data
 */
export interface ReservationStepProps {
  data: ReservationData;
  onUpdate: (data: Partial<ReservationData>) => void;
}

/**
 * Represents a dining area with its properties and images
 */
export interface DiningArea {
  id: DiningAreaType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  image: string;
  images: string[];
}

/**
 * Represents a table with its properties and availability
 */
export interface Table {
  id: string;
  name: string;
  capacity: number;
  features: string[];
  image: string;
  available: boolean;
}

/**
 * Maps dining areas to their available tables
 */
export type TablesMap = Record<DiningAreaType, Table[]>;

/**
 * Represents a form step in the multi-step reservation process
 */
export interface ReservationStep {
  id: string;
  title: string;
  description: string;
}

/**
 * Occasion labels mapping for display purposes
 */
export interface OccasionLabels {
  casual: string;
  anniversary: string;
  birthday: string;
  business: string;
  special: string;
}

/**
 * Restaurant configuration constants
 */
export interface RestaurantConfig {
  OPEN_HOUR: number;
  CLOSE_HOUR: number;
  MINIMUM_ADVANCE_HOURS: number;
  MAX_ADVANCE_DAYS: number;
  TIME_SLOT_INTERVAL_MINUTES: number;
  MAX_PARTY_SIZE: number;
}
