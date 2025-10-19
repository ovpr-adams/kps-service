/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFDF7',
          100: '#FFF9E6',
          200: '#FFF0C2',
          300: '#FFE59E',
          400: '#FFD66B',
          500: '#FFD700', // Or principal
          600: '#E6C200',
          700: '#CC9E00',
          800: '#B37F00',
          900: '#996B00',
        },
        secondary: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#111111', // Noir profond
        },
        accent: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FFD700 0%, #E6C200 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #111111 0%, #262626 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(255, 215, 0, 0.9) 0%, rgba(17, 17, 17, 0.8) 100%)',
      }
    },
  },
  plugins: [],
}
