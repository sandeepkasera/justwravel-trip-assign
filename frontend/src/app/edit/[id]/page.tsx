"use client";

import { useEffect, useState } from "react";
import TripForm from "@/components/TripForm";
import { getTrips, updateTrip } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { TripPlan } from "@/types/trip";

export default function EditPage() {
  const params = useParams();
  const id = params?.id ?? "";
  const [trip, setTrip] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getTrips();
        const found = data.items.find(t => t._id === id) ?? null;
        setTrip(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!trip) return <p className="text-red-600">Trip not found.</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold text-brand-600 mb-4">Edit Trip</h1>
      <TripForm
        initial={trip}
        onSubmit={async (data) => {
          await updateTrip(trip._id as string, data);
          toast.success("Trip updated");
          router.push("/dashboard");
        }}
      />
    </section>
  );
}
