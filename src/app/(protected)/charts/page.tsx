"use client";

import { useEffect, useState } from "react";
import { fetchAstrologers } from "@/lib/api";

export default function ChartsPage() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const load = async () => {
      const res = await fetchAstrologers();
      setData(res || []);
    };
    load();
  }, []);

  const avg =
    data.reduce((a, b) => a + (b.salary || 500), 0) / (data.length || 1);

  return (
    <div className="relative min-h-screen p-6">

      {/* ⭐ subtle rotating zodiac */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none -z-10 animate-spin-slow">
        <img src="/zodiac.png" className="w-[1100px]" />
      </div>

      {/* ⭐ header + filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-yellow-200 px-3 py-1 rounded-lg shadow"
        >
          <option>All</option>
          <option>Premium</option>
          <option>Standard</option>
          <option>Basic</option>
        </select>
      </div>

      {/* ⭐ KPI */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <KPI title="Astrologers" value={data.length} />
        <KPI title="Avg Fee" value={`₹${Math.round(avg)}`} />
        <KPI title="Cities" value="4" />
        <KPI title="Growth" value="+12%" />
      </div>

      {/* ⭐ charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Donut />
        <Bar data={data} />
      </div>

      {/* ⭐ insight row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Trend />
        <Performance />
      </div>

      {/* ⭐ revenue */}
      <div className="grid md:grid-cols-3 gap-4">
        <Revenue color="from-green-500 to-green-400" label="Premium" />
        <Revenue color="from-blue-500 to-indigo-400" label="Standard" />
        <Revenue color="from-pink-500 to-purple-400" label="Basic" />
      </div>
    </div>
  );
}

/* ---------- KPI ---------- */
function KPI({ title, value }: any) {
  return (
    <div className="bg-white/85 backdrop-blur border border-yellow-200 rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}

/* ---------- DONUT ---------- */
function Donut() {
  return (
    <div className="bg-white/85 backdrop-blur border border-yellow-200 rounded-2xl p-6 shadow text-center hover:shadow-xl transition">
      <h2 className="font-semibold mb-4">Consultation Split</h2>

      <div className="relative w-40 h-40 mx-auto">
        <div
          className="w-full h-full rounded-full transition"
          style={{
            background:
              "conic-gradient(#facc15 0% 60%, #fb923c 60% 85%, #fde68a 85% 100%)",
          }}
        />
        <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center font-semibold">
          Premium
        </div>
      </div>
    </div>
  );
}

/* ---------- BAR ---------- */
function Bar({ data }: any) {
  return (
    <div className="bg-white/85 backdrop-blur border border-yellow-200 rounded-2xl p-6 shadow hover:shadow-xl transition">
      <h2 className="font-semibold mb-4">Consultation Fees</h2>

      {data.map((d: any, i: number) => {
        const width = Math.min((d.salary || 500) / 10, 100);

        return (
          <div key={i} className="mb-3 group">
            <div className="flex justify-between text-sm">
              <p>{d.name}</p>
              <span className="opacity-0 group-hover:opacity-100 transition text-xs text-gray-500">
                ₹{d.salary}
              </span>
            </div>

            <div className="w-full bg-yellow-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-yellow-400 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- TREND ---------- */
function Trend() {
  return (
    <div className="bg-white/85 backdrop-blur border border-yellow-200 rounded-2xl p-6 shadow hover:shadow-xl transition">
      <h2 className="font-semibold mb-4">Revenue Trend</h2>

      <div className="h-32 rounded-xl bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
      </div>
    </div>
  );
}

/* ---------- PERFORMANCE ---------- */
function Performance() {
  return (
    <div className="bg-white/85 backdrop-blur border border-yellow-200 rounded-2xl p-6 shadow hover:shadow-xl transition">
      <h2 className="font-semibold mb-4">Performance</h2>

      <div className="bg-yellow-100 h-3 rounded-full overflow-hidden">
        <div className="bg-yellow-400 h-3 rounded-full w-[75%] transition-all duration-1000" />
      </div>

      <p className="text-xs text-gray-500 mt-2">Consultation success rate</p>
    </div>
  );
}

/* ---------- REVENUE ---------- */
function Revenue({ color, label }: any) {
  return (
    <div className={`rounded-2xl p-5 text-white shadow-lg bg-gradient-to-r ${color} hover:scale-[1.03] transition`}>
      <p className="text-sm opacity-80">{label}</p>
      <p className="text-xl font-semibold mt-1">₹32K</p>
    </div>
  );
}