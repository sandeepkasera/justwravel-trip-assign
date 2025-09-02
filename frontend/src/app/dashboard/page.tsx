"use client";
import TripCard from "@/components/TripCard";
import { getTrips } from "@/lib/api";
import type { TripPlan } from "@/types/trip";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [items, setItems] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [minBudget, setMinBudget] = useState<string>("");
  const [maxBudget, setMaxBudget] = useState<string>("");

  async function load() {
    setLoading(true);
    const data = await getTrips({
      destination: q || undefined,
      minBudget: minBudget ? Number(minBudget) : undefined,
      maxBudget: maxBudget ? Number(maxBudget) : undefined
    });
    setItems(data.items);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">All Trips</h2>

      <div className="card p-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input className="input" placeholder="Filter by destination" value={q} onChange={e => setQ(e.target.value)} />
        <input className="input" type="number" min={0} placeholder="Min Budget" value={minBudget} onChange={e => setMinBudget(e.target.value)} />
        <input className="input" type="number" min={0} placeholder="Max Budget" value={maxBudget} onChange={e => setMaxBudget(e.target.value)} />
        <button className="btn" onClick={load}>Apply</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {items.length === 0 && <p className="text-sm text-gray-500">No trips found.</p>}
          {items.map(t => <TripCard key={t._id} trip={t} />)}
        </div>
      )}
    </div>
  );
}
