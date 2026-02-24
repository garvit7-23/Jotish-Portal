"use client";

import { useEffect, useState } from "react";
import { fetchAstrologers } from "@/lib/api";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

/* ⭐ dynamic react-leaflet */
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

/* ⭐ city → coords */
const coords: any = {
  Delhi: [28.61, 77.23],
  Mumbai: [19.07, 72.87],
  Jaipur: [26.91, 75.78],
  Indore: [22.71, 75.85],
};

export default function MapPage() {
  const [data, setData] = useState<any[]>([]);
  const [icon, setIcon] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const load = async () => {
      const res = await fetchAstrologers();
      setData(res || []);

      /* ⭐ dynamically import leaflet (browser only) */
      const L = await import("leaflet");

      const glowingIcon = new L.DivIcon({
        className: "",
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-6 h-6 bg-yellow-400 rounded-full animate-pulse-soft opacity-60"></span>
            <span class="relative w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></span>
          </div>
        `,
      });

      setIcon(glowingIcon);
    };

    load();
  }, []);

  /* ⭐ prevent hydration crash */
  if (!mounted || !icon)
    return (
      <div className="h-[85vh] shimmer rounded-2xl flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading cosmic map…</p>
      </div>
    );

  return (
    <div className="relative h-[85vh]">

      {/* ⭐ zodiac background */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none -z-10 animate-spin-slow">
        <img src="/zodiac.png" className="w-[1100px]" />
      </div>

      {/* ⭐ MAP */}
      <MapContainer
        center={[23.5, 80]}
        zoom={5}
        className="h-full rounded-2xl shadow-lg border border-yellow-200"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {data.map((a: any, i) => {
          const position = coords[a.city] || [23.5, 80];

          return (
            <Marker
              key={i}
              position={position}
              icon={icon}
              eventHandlers={{
                mouseover: () => setActive(i),
                mouseout: () => setActive(null),
              }}
            >
              <Popup>
                <div className="min-w-[160px]">
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-xs text-gray-500">{a.city}</p>

                  <button
                    onClick={() => router.push(`/details/${i}`)}
                    className="mt-2 bg-yellow-400 px-3 py-1 rounded-lg text-sm shadow"
                  >
                    View Profile
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* ⭐ FLOATING SIDEBAR */}
      <div className="absolute top-4 left-4 z-[1000] w-72 max-h-[75vh] overflow-y-auto glass rounded-2xl p-3 shadow-xl">
        <p className="font-semibold mb-3">Nearby Astrologers</p>

        {data.map((a: any, i) => (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onClick={() => router.push(`/details/${i}`)}
            className={`p-3 rounded-xl cursor-pointer mb-2 transition ${
              active === i ? "bg-yellow-100 shadow" : "hover:bg-yellow-50"
            }`}
          >
            <p className="font-medium">{a.name}</p>
            <p className="text-xs text-gray-500">{a.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}