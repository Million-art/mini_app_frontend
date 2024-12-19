/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
<<<<<<< HEAD
    extend: {},
=======
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000", // For bg-black
          light: "#FFFFFF", // For text-white
        },
        gray: {
          light: "##9CA3AF",
          deep: "#111827", // For bg-gray-900
          dark: "#1F2937", // For bg-gray-800
          medium: "#374151", // For bg-gray-700
        },
        yellow: {
          light: "#FACC15", // For bg-yellow-400
          DEFAULT: "#EAB308", // For bg-yellow-500 and text-yellow-500
        },
        blue: {
          dark: "#1E3A8A", // For bg-blue-900
          medium: "#4263EB", // For bg-blue-700
          DEFAULT: "#4263EB", // For bg-blue-500 and text-blue-500
        },
        green: {
          dark: "#198754", // For bg-green-900
        },
        red: {
          light: "#D73A49", // For bg-red-400
          DEFAULT: "#E93D2A", // For bg-red-500 and text-red-500
        },
      },
      animation: {
        glow: 'glow 2s infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px #FFD700' },
          '50%': { boxShadow: '0 0 30px #FFD700' },
        },
      },
    },
>>>>>>> ui-update
  },
  plugins: [],
};
