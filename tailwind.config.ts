import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/react-bits/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        heading: ["var(--font-heading)", "Playfair Display", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        background: {
          DEFAULT: "var(--background)",
          surface: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        foreground: "var(--foreground)",
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
        },
        accent: {
          DEFAULT: "var(--accent-cyan)",
          cyan: "var(--accent-cyan)",
          bright: "var(--accent-bright)",
          highlight: "var(--highlight)",
        },
        border: "var(--border-color)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        overlay: {
          soft: "var(--overlay-soft)",
          strong: "var(--overlay-strong)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "calc(var(--radius-xl) + 0.5rem)",
      },
      boxShadow: {
        glass: "0 20px 60px rgba(6, 15, 30, 0.55)",
        "glass-soft": "0 10px 35px rgba(10, 25, 47, 0.45)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
