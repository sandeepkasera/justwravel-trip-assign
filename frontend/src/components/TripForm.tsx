"use client";

import { useState } from "react";
import type { TripPlan } from "@/types/trip";

type Props = {
  initial?: Partial<TripPlan>;
  onSubmit: (data: Omit<TripPlan, "_id" | "createdAt">) => Promise<void> | void;
  submittingText?: string;
};

export default function TripForm({ initial, onSubmit, submittingText = "Saving..." }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [days, setDays] = useState<number>(initial?.days ?? 1);
  const [budget, setBudget] = useState<number>(initial?.budget ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = title.trim() !== "" && destination.trim() !== "" && Number.isInteger(days) && days > 0 && budget >= 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return setError("Please fill all fields correctly.");
    try {
      setLoading(true);
      setError(null);
      await onSubmit({ title: title.trim(), destination: destination.trim(), days, budget });
    } catch (err: any) {
      setError(err?.message ?? "Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-md border space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Weekend in Goa" className="mt-1 w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-brand-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Destination</label>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Goa" className="mt-1 w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-brand-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Days</label>
          <input type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-1 w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Budget (₹)</label>
          <input type="number" min={0} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-1 w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600">
          {loading ? submittingText : (initial ? "Update Trip" : "Create Trip")}
        </button>
        <button type="button" onClick={() => { setTitle(""); setDestination(""); setDays(1); setBudget(0); }} className="px-4 py-2 rounded-xl border">Reset</button>
      </div>
    </form>
  );
}
