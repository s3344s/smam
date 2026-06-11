/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050507',
        panel: '#0B0B11',
        surface: '#101018',
        cream: '#F4F2EC',
        champagne: {
          DEFAULT: '#D8C5A0',
          light: '#EBDFC4',
          dark: '#B49E72',
        },
        violet: '#8B7CF6',
        electric: '#5D8BFF',
        muted: '#9A95A6',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(216, 197, 160, 0.35)',
        'glow-violet': '0 0 50px -10px rgba(139, 124, 246, 0.4)',
        card: '0 24px 60px -24px rgba(0,0,0,0.7)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        marquee: 'marquee 36s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
