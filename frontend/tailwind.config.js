/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/pages//*.{js,ts,jsx,tsx,mdx}",
  "./src/components//*.{js,ts,jsx,tsx,mdx}",
  "./src/app//*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
];

export const theme = {
  screens: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1400px",
  },
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    colors: {
      "z-green": {
        100: "#F8FDF8",
        200: "#F4FBF5",
        300: "#E6F3E8",
        400: "#A5D3AC",
        500: "#4CA858",
      },
      "z-blue": {
        100: "#F2F7FD",
        200: "#CCE3F7",
        300: "#0075DB",
        400: "#005096",
        500: "#003E75",
      },
      "z-gray": {
        100: "#F2F2F2",
        200: "#E5E5E5",
        300: "#575757",
      },
      "z-br-lg-gray": "#EFEFEF",
      "z-br-gray": "#DCDCDC",
      "z-br-blue": "#DCD5FF",
    },
  },
};

export const plugins = [];

export const darkMode = "class";
