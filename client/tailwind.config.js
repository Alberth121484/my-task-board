/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system colors
        background: '#F8FAFC',
        'task-yellow': {
          light: '#F5E8D5',
          DEFAULT: '#F5D565',
          dark: '#E9A23B',
        },
        'task-green': {
          light: '#A0ECB1',
          DEFAULT: '#32D657',
        },
        'task-red': {
          light: '#F7D4D3',
          DEFAULT: '#DD524C',
        },
        'task-gray': {
          light: '#E3E8EF',
          DEFAULT: '#97A3B6',
        },
        'task-blue': {
          DEFAULT: '#3662E3',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        // Typography scale from design
        'title': ['2.5rem', { lineHeight: '1.2', fontWeight: '400' }],      // 40px
        'description': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],  // 16px
        'task-title': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px
        'task-button': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],  // 16px
        'button': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],   // 14px
        'label': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],     // 12px
      },
      boxShadow: {
        'task': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'task': '12px',
        'button': '8px',
        'icon': '8px',
      },
      maxWidth: {
        'board': '640px',
      },
    },
  },
  plugins: [],
}
