"use client";

export default function Pagination({ page, pages, onPage }: { page: number; pages: number; onPage: (p: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button className="px-3 py-2 rounded-lg border" onClick={() => onPage(Math.max(1, page - 1))} disabled={page <= 1}>Prev</button>
      <div className="px-3 py-2 rounded-lg bg-brand-50 text-brand-600 font-semibold">{page} / {pages}</div>
      <button className="px-3 py-2 rounded-lg border" onClick={() => onPage(Math.min(pages, page + 1))} disabled={page >= pages}>Next</button>
    </div>
  );
}
