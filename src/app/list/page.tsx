"use client";

import { useEffect, useState } from "react";
import { fetchAstrologers } from "@/lib/api";
import { useRouter } from "next/navigation";
import WelcomePopup from "@/components/WelcomePopup";
import { mockEmployees } from "@/lib/mock";

export default function ListPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
     if (localStorage.getItem("justLoggedIn")) {
       setShowPopup(true);
       localStorage.removeItem("justLoggedIn");
     }
   }, []);

 useEffect(() => {
  const load = async () => {
    try {
      const res = await fetchAstrologers();
      console.log("Profiles 👉", res);
      setData(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

  if (loading)
    return <p className="text-center mt-16 text-gray-500">Loading profiles...</p>;

  return (
    <div className="relative pt-4">
         {/* ⭐ zodiac background */}
         <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10  pointer-events-none -z-10">
           <img src="/zodiac.png" className="w-[1100px]" />
         </div>
      

      {/* ⭐ welcome popup */}
       {showPopup && <WelcomePopup />}

      <h1 className="text-2xl font-bold mb-6 text-gray-800 relative">
        Available Profiles
      </h1>

      {!data.length && (
        <p className="text-center text-gray-500 mt-10 relative">
          No profiles available
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative">
        {data.map((a: any, i) => (
          <div
            key={i}
            onClick={() => router.push(`/details/${i}`)}
            className="bg-white/90 backdrop-blur border border-yellow-200 rounded-2xl p-4 shadow-md hover:shadow-xl transition cursor-pointer flex gap-4 overflow-hidden relative"
          >
            {/* glow */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-200 blur-2xl opacity-30" />

            {/* avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-yellow-200 flex items-center justify-center text-xl font-bold">
                {a.name?.[0] || "🔮"}
              </div>

              {/* online indicator */}
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-white" />
            </div>

            {/* info */}
            <div className="flex-1">
              <p className="font-semibold">{a.name || "Unknown"}</p>
              <p className="text-sm text-gray-500">{a.city || "Location"}</p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                  ₹{a.salary || "Consult"}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/details/${i}`);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg text-sm font-medium shadow"
                >
                  Consult
                </button>
              </div>

              {/* rating */}
              <p className="text-xs mt-1 text-yellow-600">⭐ 4.{i + 3} rating</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}