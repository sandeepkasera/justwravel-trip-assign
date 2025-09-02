"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ onSearch }: { onSearch?: (q: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          active ? "bg-brand-500 text-gray-500 shadow" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <header className="sticky top-4 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur rounded-2xl shadow-md p-4 border">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
            <div className="h-10 w-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold">TP</div>
            <div className="hidden sm:block">
              <div className="font-extrabold text-lg text-brand-500">Trip Planner</div>
              <div className="text-xs text-gray-500">Plan. Save. Go.</div>
            </div>
          </div>

          {/* search (desktop) */}
          <div className="hidden sm:flex flex-1 justify-center px-4">
            <input
              type="search"
              placeholder="Search destination..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full max-w-md rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* nav actions */}
          <div className="flex items-center gap-3">
            <nav className="hidden sm:flex items-center gap-2">
              <NavLink href="/">Submit</NavLink>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </nav>

            <div className="hidden sm:block">
              <button className="px-4 py-2 rounded-full bg-white border hover:shadow"> <img src="https://i.pravatar.cc/40" className="h-6 w-6 rounded-full" alt="avatar" /> </button>
            </div>

            <button className="sm:hidden p-2 rounded-md bg-white border" onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? "✖️" : "☰"}
            </button>
          </div>
        </div>

        {/* mobile panel */}
        {mobileOpen && (
          <div className="mt-3 bg-white rounded-2xl shadow p-4 border space-y-3">
            <input
              type="search"
              placeholder="Search destination..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
            <div className="flex flex-col gap-2">
              <Link href="/" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Submit</Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Dashboard</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
