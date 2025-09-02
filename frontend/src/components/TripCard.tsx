"use client";
import type { TripPlan } from "@/types/trip";
import { useRouter } from "next/navigation";

export default function TripCard({ trip }: { trip: TripPlan }) {
  const router = useRouter();
  return (
    <div className="card p-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold">{trip.title}</h3>
        <p className="text-sm text-gray-500">{trip.destination}</p>
        <div className="mt-2 text-sm">
          <span className="mr-3">Days: <strong>{trip.days}</strong></span>
          <span>Budget: <strong>₹{trip.budget}</strong></span>
        </div>
        {trip.createdAt && <p className="text-xs text-gray-400 mt-2">Created: {new Date(trip.createdAt).toLocaleString()}</p>}
      </div>
      <button className="btn" onClick={() => router.push(`/edit/${trip._id}`)}>Edit</button>
    </div>
  );
}
