export interface TripPlan {
  _id?: string;
  title: string;
  destination: string;
  days: number;
  budget: number;
  createdAt?: string;
}

export interface TripListResponse {
  items: TripPlan[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}
