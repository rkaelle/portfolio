/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nord Theme Colors
        nord: {
          // Polar Night
          'polar-1': '#1a1d24', // Darkest bg (darker than original)
          'polar-2': '#242933', // Dark bg
          'polar-3': '#2E3440', // Original polar-1 as polar-3
          'polar-4': '#3B4252', // Lighter bg
          
          // Snow Storm
          'snow-1': '#D8DEE9', // Main text
          'snow-2': '#E5E9F0', // Secondary text
          'snow-3': '#ECEFF4', // Bright text
          
          // Frost
          'frost-1': '#8FBCBB', // Mint
          'frost-2': '#88C0D0', // Light blue
          'frost-3': '#81A1C1', // Medium blue
          'frost-4': '#5E81AC', // Dark blue
          
          // Aurora
          'aurora-1': '#BF616A', // Red
          'aurora-2': '#D08770', // Orange
          'aurora-3': '#EBCB8B', // Yellow
          'aurora-4': '#A3BE8C', // Green
          'aurora-5': '#B48EAD', // Purple
        },
        // Keep existing colors but update the main ones
        'cyber-black': '#1a1d24', // New darkest background
        'cyber-white': '#D8DEE9', // Nord snow-1
        'neon-blue': '#88C0D0', // Nord frost-2
        'matrix-green': '#A3BE8C', // Nord aurora-4
        'tech-gray': '#2E3440', // Original polar-1 as tech-gray
      },
      fontFamily: {
        'cyber': ['Space Grotesk', 'sans-serif'],
        'tech': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scanline': 'scanline 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px #BF616A, 0 0 15px #BF616A' },
          '50%': { textShadow: '0 0 20px #EBCB8B, 0 0 30px #EBCB8B' },
          '100%': { textShadow: '0 0 5px #D08770, 0 0 15px #D08770' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
} 