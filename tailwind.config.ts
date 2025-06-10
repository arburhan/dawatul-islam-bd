import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Islamic color scheme
        'islamic-primary': '#1B4332',    // Deep Islamic green
        'islamic-secondary': '#2D5A40',  // Medium green
        'islamic-accent': '#FFD700',     // Gold accent
        'islamic-light': '#52B788',      // Light green
        'islamic-dark': '#081C15',       // Very dark green
        // Bangladesh flag colors
        'bangladesh-green': '#006A4E',
        'bangladesh-red': '#F42A41',
        // Neutral colors
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        // Bengali fonts
        'bengali': ['Noto Sans Bengali', 'Kalpurush', 'SolaimanLipi', 'sans-serif'],
        // English fonts
        'english': ['Inter', 'Open Sans', 'sans-serif'],
        // Arabic fonts for Quranic verses
        'arabic': ['Noto Sans Arabic', 'serif'],
        // Default sans
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Bengali text sizing
        'bengali-sm': ['0.875rem', { lineHeight: '1.6' }],
        'bengali-base': ['1rem', { lineHeight: '1.7' }],
        'bengali-lg': ['1.125rem', { lineHeight: '1.8' }],
        'bengali-xl': ['1.25rem', { lineHeight: '1.8' }],
        'bengali-2xl': ['1.5rem', { lineHeight: '1.8' }],
        'bengali-3xl': ['1.875rem', { lineHeight: '1.8' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'islamic-pattern': "url('/images/islamic-pattern.svg')",
      },
      boxShadow: {
        'islamic': '0 4px 6px -1px rgba(27, 67, 50, 0.1), 0 2px 4px -1px rgba(27, 67, 50, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config 