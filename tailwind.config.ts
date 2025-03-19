import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "outline-purple": "#4A31B1",
        "button-purple": "#6341EC",
        "primary-text": "#D6CEF9",
        "footer-purple": "#5C48B0",
        "gradient-border": "linear-gradient(147.93deg, rgba(255, 255, 255, 0.2) 6.68%, rgba(0, 0, 0, 0) 51.71%, rgba(255, 255, 255, 0.2) 93.27%)",
      },
      boxShadow: {
        custom: "0px 0px 15px 0px #0000004D",
      },
    },
  },
  plugins: [],
} satisfies Config;