import { mockEmployees } from "./mock";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export const fetchAstrologers = async () => {
  try {
    if (!BASE) {
      console.log("No API → using mock");
      return mockEmployees;
    }

    const res = await fetch(BASE);

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    const list = Array.isArray(data)
      ? data
      : data?.data || data?.result || [];

    return list.length ? list : mockEmployees;
  } catch (err) {
    console.log("API failed → using mock", err);
    return mockEmployees;
  }
};