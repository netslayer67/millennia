/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/components/ui/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // map colors from CSS variables (HSL tokens)
      colors: {
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        card: 'hsl(var(--card))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        // brand + accents (object form for easier usage in components)
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        gold: {
          DEFAULT: 'hsl(var(--gold))',
          foreground: 'hsl(var(--gold-foreground))',
        },
        emerald: {
          DEFAULT: 'hsl(var(--emerald))',
          foreground: 'hsl(var(--emerald-foreground))',
        },

        // UI tokens
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },

      // radius pulled from CSS var
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 6px)',
        sm: 'calc(var(--radius) - 8px)',
        full: '9999px',
      },

      // shadows tuned for premium feel
      boxShadow: {
        'glass-sm': '0 6px 20px rgba(16,24,40,0.04)',
        'glass-md': '0 12px 36px rgba(16,24,40,0.06)',
        'glass-lg': '0 20px 60px rgba(16,24,40,0.08)',
        'elevated': '0 10px 30px rgba(16,24,40,0.08)',
      },

      // fonts (you already import Inter in CSS)
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },

      // sizes (useful for hero blobs etc.)
      spacing: {
        '9': '2.25rem',
        '14': '3.5rem',
      },

      // animation keyframes for blobs (GPU-friendly: transform & opacity)
      keyframes: {
        blobFloatLeft: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(-14px) translateX(6px) scale(1.03)' },
          '100%': { transform: 'translateY(0) translateX(0) scale(1)' },
        },
        blobFloatRight: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(10px) translateX(-8px) scale(1.02)' },
          '100%': { transform: 'translateY(0) translateX(0) scale(1)' },
        },
        shimmerMove: {
          '0%': { transform: 'translateX(-110%)' },
          '100%': { transform: 'translateX(110%)' },
        },
      },

      animation: {
        'blob-left': 'blobFloatLeft 12s ease-in-out infinite',
        'blob-right': 'blobFloatRight 10s ease-in-out infinite',
        'shimmer': 'shimmerMove 1.2s ease-in-out infinite',
      },

      // global transition timing & easing (useable via utilities)
      transitionTimingFunction: {
        premium: 'cubic-bezier(.2,.9,.1,1)',
      },
      transitionDuration: {
        DEFAULT: '320ms',
      },
    },
  },
  plugins: [
    // recommended utilities for forms & typographic content + animations
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // If you installed tailwindcss-animate, keep it; otherwise remove this line
    require('tailwindcss-animate'),
  ],
};
