/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        botao: "#4069E5",
        white: "#FFFFFF",
        legenda: "#9095A1",
        footer: "#1E2128",
        pesquisar: "#F3F4F6",
        fundo: "#F3F4F6",
        "text-footer": "#DEE1E6",
      },
      fontSize: {
        14: "14px",
        18: "18px",
        48: "48px",
        32: "32px",
      },
      backgroundImage: {
        capa: "url('/utils/image/capa.png')",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
