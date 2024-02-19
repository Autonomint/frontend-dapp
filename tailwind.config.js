/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
       
      },
    },
    extend: {
      zIndex: {
        'max': 999999,
      },
      screens: {
        "2dppx": {
          raw: "(min-width: 1440px) and (min-resolution: 2dppx)",
        },
        "3xl": "1980px",
      },
      colors: {
        bgGrey: "#F4F8FF",
        textGrey: "#3A3A3A",
        borderGrey: "#808080",
        lineGrey: "#C4C4C4",
        textPrimary: "#041A50",
        textSecondary: "#5B5B5B",
        textHighlight: "#020202",
        borderBlue: "#00B2BF",
        toastSuccess: "#268730",
        toastSuccessClose: "#57C262",
        toastError: "#B43939",
        toastErrorClose: "#C25757",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
