"use client";

import { useEffect, useState } from "react";
import TripCard from "@/components/TripCard";
import Pagination from "@/components/Pagination";
import { getTrips } from "@/lib/api";
import type { TripPlan } from "@/types/trip";

export default function DashboardPage() {
  const [items, setItems] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 6;

  async function load() {
    setLoading(true);
    try {
      const data = await getTrips({
        destination: q || undefined,
        minBudget: minBudget ? Number(minBudget) : undefined,
        maxBudget: maxBudget ? Number(maxBudget) : undefined,
        page,
        limit
      });
      setItems(data.items);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [page]);

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-600">Trip Dashboard</h1>
          <p className="text-sm text-gray-500">Search, filter and browse your trip plans.</p>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <input placeholder="Search destination..." value={q} onChange={(e) => setQ(e.target.value)} className="rounded-full border px-4 py-2 focus:ring-2 focus:ring-brand-500" />
          <input placeholder="Min budget" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} className="rounded-full border px-4 py-2 focus:ring-2 focus:ring-brand-500" />
          <input placeholder="Max budget" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} className="rounded-full border px-4 py-2 focus:ring-2 focus:ring-brand-500" />
          <button onClick={() => { setPage(1); load(); }} className="px-4 py-2 rounded-full bg-brand-500 text-white">Apply</button>
          <button onClick={() => { setQ(""); setMinBudget(""); setMaxBudget(""); setPage(1); load(); }} className="px-4 py-2 rounded-full border">Reset</button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 rounded-2xl bg-gray-200 animate-pulse" />)}
        </div>
      ) : (
        <>
          {items.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">No trips found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(t => <TripCard key={t._id} trip={t} />)}
            </div>
          )}
          <Pagination page={page} pages={pages} onPage={(p) => setPage(p)} />
        </>
      )}
    </section>
  );
}
