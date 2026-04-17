import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--color-bg-primary)",
        bgSecondary: "var(--color-bg-secondary)",
        accentMint: "var(--color-accent-mint)",
        accentCyan: "var(--color-accent-cyan)",
        textPrimary: "var(--color-text-primary)",
        textMuted: "var(--color-text-muted)",
        textDim: "var(--color-text-dim)",
        borderHighlight: "var(--color-border)",
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        sans: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
