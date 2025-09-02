"use client";

import type { TripPlan } from "@/types/trip";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Wallet } from "lucide-react";

export default function TripCard({ trip }: { trip: TripPlan }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl p-4 shadow border flex items-start justify-between gap-4">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg">
          {trip.destination?.[0] ?? "T"}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{trip.title}</h3>
          <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{trip.destination}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{trip.days} days</span>
            <span className="flex items-center gap-1 text-green-600"><Wallet className="w-4 h-4" />₹{trip.budget}</span>
          </div>
          {trip.createdAt && <div className="text-xs text-gray-400 mt-2">Created: {new Date(trip.createdAt).toLocaleString()}</div>}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button className="px-3 py-2 rounded-lg bg-white border hover:shadow" onClick={() => router.push(`/edit/${trip._id}`)}>Edit</button>
      </div>
    </div>
  );
}
