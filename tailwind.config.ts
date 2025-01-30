import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb",
        white: "#fff",
        grey: "#d1d5dc",
        blue: "#4f39f6",
        blue_light: "rgba(79,57,246,0.30)"
      },
    },
  },
  plugins: [],
} satisfies Config;
