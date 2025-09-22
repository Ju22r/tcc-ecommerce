/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "jvm-blue-dark": "#001a4d",   // Azul marinho escuro
        "jvm-blue": "#003399",        // Azul vibrante (chips)
        "jvm-blue-hover": "#0040cc",  // Azul mais claro (hover)
        "jvm-orange": "#ff5e00",      // Laranja vibrante
      },
      fontFamily: {
        headline: ["Teko", "system-ui", "sans-serif"], // Fonte de títulos
      },
    },
  },
  plugins: [],
};

