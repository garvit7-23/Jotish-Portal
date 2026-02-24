"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PhotoResult() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fullText =
  "Your aura suggests strong intuitive energy. This is a favorable period for career decisions and emotional clarity.";

   const [typed, setTyped] = useState("");

  useEffect(() => {
    const img = localStorage.getItem("capturedPhoto");
    setImage(img);

    setTimeout(() => setLoading(false), 2500); // fake AI analysis
  }, []);
  useEffect(() => {
     if (loading) return;

     let i = 0;

     const interval = setInterval(() => {
       setTyped(fullText.slice(0, i));
       i++;

       if (i > fullText.length) clearInterval(interval);
     }, 25); // typing speed

     return () => clearInterval(interval);
   }, [loading]);

  if (!image)
    return (
      <p className="text-center mt-20 text-gray-500">
        No photo available
      </p>
    );

  return (
    <div className="relative min-h-screen p-6 text-center">

      {/* ⭐ zodiac watermark */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none -z-10">
        <img src="/zodiac.png" className="w-[1100px]" />
      </div>

      <h1 className="text-2xl font-semibold mb-6">AI Analysis</h1>

      <img
        src={image}
        className="mx-auto rounded-2xl shadow w-72"
      />

      {loading ? (
        <div className="mt-10 flex flex-col items-center">

          {/* rotating zodiac */}
          <img
            src="/zodiac.png"
            className="w-40 opacity-40 animate-spin-slow mb-6"
          />

          <p className="text-gray-500 animate-pulse">
            Analyzing cosmic patterns...
          </p>
        </div>
      ) : (
        <div className="mt-6 max-w-md mx-auto bg-white/90 backdrop-blur border border-yellow-200 rounded-2xl p-4 shadow">
          <p className="font-semibold text-yellow-700 mb-2">
            ✨ Insight
          </p>

          <p className="text-sm text-gray-600 min-h-[60px]">
             {typed}
             <span className="animate-pulse">|</span>
           </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={() => router.back()}
          className="bg-yellow-200 px-4 py-2 rounded-lg"
        >
          Retake
        </button>

        <button
          onClick={() => router.push("/list")}
          className="bg-yellow-400 px-4 py-2 rounded-lg font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}