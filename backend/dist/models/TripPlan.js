import mongoose, { Schema, model } from "mongoose";
const TripPlanSchema = new Schema({
    title: { type: String, required: true },
    destination: { type: String, required: true },
    days: { type: Number, required: true, min: 1 },
    budget: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: () => new Date() }
});
export const TripPlan = mongoose.models.TripPlan || model("TripPlan", TripPlanSchema);
