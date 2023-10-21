/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: { center: true, padding: '24px' },
      boxShadow: {
        medium:
          '0px 0px 15px 0px rgba(0,0,0,.03),0px 2px 30px 0px rgba(0,0,0,.08),0px 0px 1px 0px rgba(0,0,0,.3)',
        large:
          '0px 0px 30px 0px rgba(0,0,0,.04),0px 30px 60px 0px rgba(0,0,0,.12),0px 0px 1px 0px rgba(0,0,0,.3)',
      },
    },
  },
  plugins: [],
};
