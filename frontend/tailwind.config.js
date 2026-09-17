/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#FAF7F1",
        ink: "#26333B",
        teal: {
          DEFAULT: "#2F6F6B",
          dark: "#20504C",
          light: "#E3EDEC",
        },
        clay: "#BE6240",
        status: {
          livre: "#3F7A52",
          ocupado: "#2F6F6B",
          pendente: "#B0793A",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
