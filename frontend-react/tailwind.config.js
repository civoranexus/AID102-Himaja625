/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civora: {
          primary: "#1E9AA6",
          dark: "#0F4C5C",
          light: "#E6F7F8",
          accent: "#F4B400",
        },
      },
    },
  },
  plugins: [],
};