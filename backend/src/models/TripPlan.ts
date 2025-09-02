import mongoose, { Schema, model } from "mongoose";

export interface TripPlanDocument {
  title: string;
  destination: string;
  days: number;
  budget: number;
  createdAt: Date;
}

const TripPlanSchema = new Schema<TripPlanDocument>({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  days: { type: Number, required: true, min: 1 },
  budget: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: () => new Date() }
});

export const TripPlan = mongoose.models.TripPlan || model<TripPlanDocument>("TripPlan", TripPlanSchema);
