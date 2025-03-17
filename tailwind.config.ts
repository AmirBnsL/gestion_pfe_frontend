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
        "primary-text" :"#D6CEF9",
        "footer-purple": "#5C48B0"
      },
    },
  },
  plugins: [
  ]

} satisfies Config;
