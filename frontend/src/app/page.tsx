"use client";

import TripForm from "@/components/TripForm";
import { createTrip } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div>
        <h1 className="text-4xl font-extrabold text-brand-600 mb-2">Submit Trip Plan ✈️</h1>
        <p className="text-gray-600 mb-6">Create a trip plan — add title, destination, days and budget. Quick, friendly and secure.</p>

        <TripForm
          onSubmit={async (data) => {
            await createTrip(data);
            toast.success("Trip created successfully 🎉");
            router.push("/dashboard");
          }}
        />
      </div>

      <aside className="hidden lg:block">
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="font-semibold text-lg mb-3">Tips</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>Use descriptive titles like “Goa Weekend Escape”.</li>
            <li>Set realistic budget estimates.</li>
            <li>Filter dashboard to find trips quickly.</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
