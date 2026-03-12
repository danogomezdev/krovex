export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne','sans-serif'],
        body: ['Outfit','sans-serif'],
      },
      gridTemplateColumns: {
        'contact': '1fr 1.6fr',
      }
    }
  },
  plugins: []
}
