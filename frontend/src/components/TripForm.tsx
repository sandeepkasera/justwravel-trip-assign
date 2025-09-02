"use client";
import { useState } from "react";
import type { TripPlan } from "@/types/trip";

type Props = {
  initial?: Partial<TripPlan>;
  onSubmit: (data: Omit<TripPlan, "_id"|"createdAt">) => Promise<void> | void;
  submittingText?: string;
};

export default function TripForm({ initial, onSubmit, submittingText = "Saving..." }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [days, setDays] = useState<number>(initial?.days ?? 1);
  const [budget, setBudget] = useState<number>(initial?.budget ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = title.trim() && destination.trim() && Number.isInteger(days) && days > 0 && budget >= 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
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
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <div>
        <label className="label" htmlFor="title">Title</label>
        <input id="title" className="input mt-1" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Goa Weekend" />
      </div>
      <div>
        <label className="label" htmlFor="destination">Destination</label>
        <input id="destination" className="input mt-1" value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g., Goa" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="days">Days</label>
          <input id="days" className="input mt-1" type="number" min={1} value={days} onChange={e => setDays(Number(e.target.value))} />
        </div>
        <div>
          <label className="label" htmlFor="budget">Budget</label>
          <input id="budget" className="input mt-1" type="number" min={0} value={budget} onChange={e => setBudget(Number(e.target.value))} />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn" disabled={!valid || loading} type="submit">
        {loading ? submittingText : "Submit"}
      </button>
    </form>
  );
}
