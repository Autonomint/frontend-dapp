/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
      fontSize:{
        "xs":"0.75rem",
      },
      fontFamily: {
        'plex-sans': ['IBM Plex Sans', 'sans-serif'],
      },
      boxShadow: {
        custom: '4px 4px 0px #C4C4C4',
        smallcustom: '4px 4px 0px #00679F',
        darkcustom: '4px 4px 0px #5B5B5B',
      },
      zIndex: {
        'max': 999999,
      },
      spacing: {
        'thumb-size': '12px', // Custom size for the thumb
      },
      screens: {
        "2dppx": {
          raw: "(min-width: 1440px) and (min-resolution: 2dppx)",
        },
        "3xl": "1980px",
        "mdl":"700px",
        "mdb":"860px"
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
  plugins: [require("tailwindcss-animate"),
  function ({ addUtilities }) {
    const newUtilities = {
      '.range-thumb': {
        // Use the custom spacing utility for the thumb size
        '--thumb-size': 'var(--tw-spacing-thumb-size)',
        // Apply the custom size to the thumb
        '&::-webkit-slider-thumb': {
          height: 'var(--thumb-size)',
          width: 'var(--thumb-size)',
        },
        '&::-moz-range-thumb': {
          height: 'var(--thumb-size)',
          width: 'var(--thumb-size)',
        },
      },
    }
    addUtilities(newUtilities)
  },
],
};
