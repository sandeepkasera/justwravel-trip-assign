"use client";
import TripForm from "@/components/TripForm";
import { createTrip } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Submit a New Trip</h2>
      <TripForm
        onSubmit={async (data) => {
          await createTrip(data);
          router.push("/dashboard");
        }}
        submittingText="Creating..."
      />
    </div>
  );
}
