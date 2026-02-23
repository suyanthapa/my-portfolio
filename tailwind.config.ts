import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "rgb(var(--color-navy) / <alpha-value>)",
        "slate-dark": "rgb(var(--color-slate-dark) / <alpha-value>)",
        electric: "#3b82f6",
        emerald: "#10b981",
        "slate-light": "rgb(var(--color-slate-light) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
