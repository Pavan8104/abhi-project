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
          dark: "#0F2418",
          primary: "#183B28",
          secondary: "#2B5A40",
          accent: "#B85A3C",
          clay: "#A2482E",
          gold: "#C49746",
          goldMuted: "#E4B869",
          cream: "#FAF7F2",
          parchment: "#F3EDE2",
          sand: "#E8DEC8",
          sage: "#79927A",
          sageLight: "#E8EFE8",
          sageSubtle: "#F1F5F1",
          border: "#E2D9CC",
          borderDark: "#183B28",
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
