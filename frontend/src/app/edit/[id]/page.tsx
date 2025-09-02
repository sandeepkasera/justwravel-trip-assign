"use client";
import TripForm from "@/components/TripForm";
import { getTrips, updateTrip } from "@/lib/api";
import type { TripPlan } from "@/types/trip";
import { useEffect, useState } from "react";

export default function EditPage({ params }: { params: { id: string } }) {
  const [trip, setTrip] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getTrips();
      const found = data.items.find(t => t._id === params.id) ?? null;
      setTrip(found);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (!trip) return <p className="text-sm text-red-600">Trip not found.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Trip</h2>
      <TripForm
        initial={trip}
        onSubmit={async (data) => {
          await updateTrip(trip._id as string, data);
          window.location.href = "/dashboard";
        }}
        submittingText="Updating..."
      />
    </div>
  );
}
