"use client";

import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white border border-yellow-200 shadow-xl rounded-2xl p-4 flex gap-3 items-center animate-fade z-50">
      <img
        src="https://i.pravatar.cc/100?img=32"
        className="w-12 h-12 rounded-full"
      />

      <div>
        <p className="font-semibold text-sm">Welcome ✨</p>
        <p className="text-xs text-gray-500">
          The universe has guidance for you today
        </p>
      </div>
    </div>
  );
}