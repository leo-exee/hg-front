import { position } from "../contexts/LocationProvider";

export enum lockSystem {
  automatic = "automatic",
  manual = "manual",
  no_lock = "no_lock",
}

export interface information {
  rating: number;
  state: number;
  cleanliness: number;
  accessbility: number;
  babyFriendly: boolean;
  handicapFriendly: boolean;
  lockSystem: lockSystem;
  openingHours: string[];
  maintenancePhoneNum: string;
  dateCreated: Date;
  lastModified: Date;
}

export interface ReviewDTO {
  id: string;
  userId: string;
  toiletId: string;
  rating: number;
  review: string;
  dateCreated: Date;
  lastModified: Date;
}

export interface ToiletDTO {
  id: string;
  userId: string;
  name: string;
  description: string;
  address: string;
  location: position;
  information: information;
  reviews: ReviewDTO[];
}
