/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        botao: "#4069E5",
        white: "#FFFFFF",
        legenda: "#9095A1",
        footer: "#1E2128",
        "text-footer": "#DEE1E6",
      },
      fontSize: {
        18: "18px",
        14: "14px",
        48: "48px",
        32: "32px",
      },
      backgroundImage: {
        capa: "url('/utils/image/capa.png')",
      },
    },
  },
  plugins: [],
};
