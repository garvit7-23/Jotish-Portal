"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  /* ⭐ check auth on route change */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
    }
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    router.push("/login");
  };

  const handleNav = (path: string) => {
    if (!loggedIn) {
      router.push("/login");
      return;
    }
    router.push(path);
  };

  const linkStyle = (path: string) =>
    `px-3 py-1 rounded-lg transition ${
      pathname === path
        ? "bg-yellow-200 text-black"
        : "hover:bg-yellow-100 text-gray-700"
    }`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-yellow-200 shadow-sm">

      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* ⭐ Logo */}
        <div
          onClick={() => router.push(loggedIn ? "/list" : "/login")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/logo.png" className="w-9 drop-shadow-sm" />
          <p className="font-semibold text-gray-800 tracking-wide">
            Astrology Portal
          </p>
        </div>

        {/* ⭐ Navigation */}
        <div className="flex items-center gap-3 text-sm font-medium">

          <button onClick={() => handleNav("/list")} className={linkStyle("/list")}>
            Profiles
          </button>

          <button onClick={() => handleNav("/charts")} className={linkStyle("/charts")}>
            Charts
          </button>

          <button onClick={() => handleNav("/map")} className={linkStyle("/map")}>
            Map
          </button>

          {!loggedIn ? (
            <button
              onClick={() => router.push("/login")}
              className="ml-2 bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded-lg"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg shadow transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* ⭐ glow divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60" />
    </div>
  );
}