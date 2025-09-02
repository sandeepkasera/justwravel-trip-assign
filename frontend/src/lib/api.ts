import type { TripPlan, TripListResponse } from "@/types/trip";
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json() as Promise<T>;
}

export async function getTrips(params?: { destination?: string; page?: number; limit?: number; minBudget?: number; maxBudget?: number; }): Promise<TripListResponse> {
  const url = new URL("/api/trips", BASE);
  if (params) Object.entries(params).forEach(([k, v]) => v != null && url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString(), { cache: "no-store" });
  return handle<TripListResponse>(res);
}

export async function createTrip(payload: Omit<TripPlan,"_id"|"createdAt">): Promise<TripPlan> {
  const res = await fetch(`${BASE}/api/trips`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return handle<TripPlan>(res);
}

export async function updateTrip(id: string, payload: Omit<TripPlan,"_id"|"createdAt">): Promise<TripPlan> {
  const res = await fetch(`${BASE}/api/trips/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return handle<TripPlan>(res);
}
