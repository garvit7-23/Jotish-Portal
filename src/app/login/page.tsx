"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [error, setError] = useState("");

  const login = () => {
     if (u === "testuser" && p === "Test123") {
       setError(""); // ⭐ clear previous error
       localStorage.setItem("loggedIn", "true");
       localStorage.setItem("justLoggedIn", "true");
       router.push("/list");
     } else {
       setError("Invalid credentials");
     }
   };


  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-spin-slow">
          <img
            src="/zodiac.png"
            className="w-[900px] opacity-30"
          />
        </div>
      </div>
      {/* soft decorative glow */}
      <div className="absolute w-72 h-72 bg-yellow-300 blur-3xl opacity-30 rounded-full -top-10 -left-10" />
      <div className="absolute w-72 h-72 bg-yellow-400 blur-3xl opacity-20 rounded-full bottom-0 right-0" />

      <div className="bg-white/90 backdrop-blur-md border border-yellow-200 rounded-3xl shadow-2xl p-10 w-80 text-center">

        <img src="/logo.png" className="w-16 mx-auto mb-3 drop-shadow" />

        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Jotish Portal
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Discover guidance for your journey ✨
        </p>

        <input
          placeholder="Username"
          className="border border-gray-300 p-3 w-full mb-3 rounded-xl focus:border-yellow-400"
          value={u}
          onChange={(e) => setU(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 w-full mb-2 rounded-xl focus:border-yellow-400"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {error}
          </p>
        )}

        <button
          onClick={login}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition"
        >
          Enter Portal
        </button>
      </div>
    </div>
  );
}