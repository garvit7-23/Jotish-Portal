/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: "#F4C400",
        brandSoft: "#FFF7D6",
        dark: "#1A1A1A",
      },
    },
  },
  plugins: [],
};