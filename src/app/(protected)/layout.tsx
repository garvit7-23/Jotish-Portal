"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("loggedIn") === "true";

    if (!isAuth) {
      router.replace("/login");
    } else {
      setAllowed(true);
    }
  }, []);

  if (!allowed) return null;

  return <>{children}</>;
}