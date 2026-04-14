import type { Config } from "tailwindcss";

const versePreset = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        verse: {
          bg: "var(--verse-bg)",
          surface: "var(--verse-surface)",
          "surface-hover": "var(--verse-surface-hover)",
          border: "var(--verse-border)",
          "border-hover": "var(--verse-border-hover)",
          text: "var(--verse-text)",
          "text-muted": "var(--verse-text-muted)",
          "text-heading": "var(--verse-text-heading)",
          primary: "var(--verse-primary)",
          "primary-hover": "var(--verse-primary-hover)",
          "primary-glow": "var(--verse-primary-glow)",
          accent: "var(--verse-accent)",
          "accent-hover": "var(--verse-accent-hover)",
          "accent-glow": "var(--verse-accent-glow)",
          success: "var(--verse-success)",
          warning: "var(--verse-warning)",
          error: "var(--verse-error)",
          glass: "var(--verse-glass)",
          "glass-border": "var(--verse-glass-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        heading: ["var(--font-heading)", "var(--font-geist-sans)", "sans-serif"],
      },
      backdropBlur: {
        glass: "var(--verse-glass-blur)",
      },
      boxShadow: {
        glow: "0 0 20px var(--verse-primary-glow)",
        "glow-accent": "0 0 20px var(--verse-accent-glow)",
        "glow-lg": "0 0 40px var(--verse-primary-glow)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        "glass-lg": "0 16px 48px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        "verse-gradient":
          "linear-gradient(135deg, var(--verse-primary-glow), var(--verse-accent-glow))",
        "verse-radial":
          "radial-gradient(ellipse at top, var(--verse-primary-glow), transparent 50%)",
        "verse-grid": "radial-gradient(circle at 1px 1px, var(--verse-border) 1px, transparent 0)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px var(--verse-primary-glow)" },
          "50%": { boxShadow: "0 0 40px var(--verse-primary-glow)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      borderRadius: {
        verse: "12px",
        "verse-lg": "16px",
        "verse-xl": "24px",
      },
    },
  },
} satisfies Partial<Config>;

export default versePreset;
