import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#082045",
        blue: "#2952a3",
        sage: "#e8ece3",
        "sage-2": "#dde3d5",
        paper: "#f4f6f1",
        ink: {
          2: "#33415c",
          3: "#4a5670",
        },
        rule: {
          DEFAULT: "#b7c2b3",
          2: "#a9b5a5",
        },
        tick: "#6b7690",
        green: {
          DEFAULT: "#166534",
          bar: "#15803d",
          pill: "#4ade80",
        },
        dark: {
          rule: "#2a4170",
          soft: "#a9b7d0",
          text: "#c8d2e6",
          input: "#10295a",
        },
        focus: "#b45309",
        // legacy tokens kept temporarily so not-yet-migrated components don't break
        midnight: "#082045",
        background: "#e8ece3",
        surface: "#f4f6f1",
        text: {
          primary: "#082045",
          muted: "#4a5670",
        },
        border: "#b7c2b3",
        jpm: {
          gold: "#2952a3",
          cream: "#dde3d5",
          ink: "#33415c",
        },
      },
      fontFamily: {
        sans: ["var(--font-familjen)", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "0.125rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(8 32 69 / 0.06), 0 1px 2px -1px rgb(8 32 69 / 0.06)",
        "card-hover": "0 10px 25px -5px rgb(8 32 69 / 0.1), 0 4px 6px -4px rgb(8 32 69 / 0.06)",
      },
      animation: {
        marquee: "marquee 200s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
