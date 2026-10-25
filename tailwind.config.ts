import type { Config } from "tailwindcss";

const config: Config = {
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
        ayur: {
          dark: "#09231B",
          primary: "#0E382B",
          secondary: "#184E3B",
          accent: "#B85A3C",
          clay: "#A2482E",
          gold: "#C59B4E",
          goldMuted: "#D8AF5D",
          cream: "#F7F4EE",
          parchment: "#EFE9DF",
          sand: "#E5DDCB",
          sage: "#79927A",
          sageLight: "#E8EFE8",
          sageSubtle: "#F1F5F1",
          border: "#E2DACD",
          borderDark: "#0E382B",
          muted: "#5A675E",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(15, 36, 24, 0.05)",
        card: "0 4px 20px -2px rgba(15, 36, 24, 0.07)",
        elevated: "0 10px 30px -4px rgba(15, 36, 24, 0.12)",
      },
      borderRadius: {
        DEFAULT: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
