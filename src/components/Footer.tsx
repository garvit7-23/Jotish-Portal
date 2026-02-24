"use client";

import { useRouter } from "next/navigation";
import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { isLoggedIn } from "@/lib/auth";

export default function Footer() {
  const router = useRouter();
  const handleNav = (path: string) => {
     if (!isLoggedIn()) {
       router.push("/");
       return;
     }

  router.push(path);
};

  return (
    <footer className="mt-20 glass border-t border-yellow-200">

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        {/* ⭐ LEFT — LOGO + DESC */}
        <div className="flex items-start gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <img
            src="/logo.png"
            alt="Jotish Logo"
            className="w-10 h-10 rounded-full shadow"
          />

          <div>
            <h3 className="font-semibold text-lg">Jotish</h3>

            <p className="text-sm text-gray-600 mt-1 max-w-xs">
              Discover guidance, clarity, and cosmic alignment through personalized
              astrology insights designed to help you make confident life decisions.
            </p>
          </div>
        </div>

        {/* ⭐ QUICK LINKS */}
       <div>
         <p className="font-semibold mb-3">Quick Links</p>

         <div className="flex flex-col gap-2 text-sm text-gray-600">
           <span
             onClick={() => handleNav("/list")}
             className="cursor-pointer hover:text-yellow-600 transition"
           >
             Astrologers
           </span>

           <span
             onClick={() => handleNav("/charts")}
             className="cursor-pointer hover:text-yellow-600 transition"
           >
             Insights Dashboard
           </span>

           <span
             onClick={() => handleNav("/map")}
             className="cursor-pointer hover:text-yellow-600 transition"
           >
             Astrologer Map
            </span>
         </div>
       </div>

        {/* ⭐ SOCIALS */}
        <div>
          <p className="font-semibold mb-3">Connect with us</p>

          <div className="flex gap-4">
            <Social icon={<Instagram size={18} />} />
            <Social icon={<Twitter size={18} />} />
            <Social icon={<Linkedin size={18} />} />
            <Social icon={<Mail size={18} />} />
          </div>
        </div>
      </div>

      {/* ⭐ bottom strip */}
      <div className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} Jotish — All rights reserved.
      </div>
    </footer>
  );
}

/* ---------- SOCIAL BUTTON ---------- */
function Social({ icon }: any) {
  return (
    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-100 hover:bg-yellow-200 cursor-pointer transition shadow">
      {icon}
    </div>
  );
}