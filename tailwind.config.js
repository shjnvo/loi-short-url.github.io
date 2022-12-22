module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: '#2acfcf',
          dark: {
            violet: '#3b3054',
          },
        },
        secondary: '#f46262',
        neutral: {
          gray: '#bfbfbf',
          grayish: {
            violet: '#9e9aa7',
          },
          very: {
            dark: {
              blue: '#35323e',
              violet: '#222126',
            },
          },
        },
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      fontSize: {
        themeSize: '18px',
      },

      backgroundImage: {
        'shorten-desktop': "url('./src/assets/bg-shorten-desktop.svg')",
        'shorten-mobile': "url('./src/assets/bg-shorten-mobile.svg')",
        'boost-desktop': "url('./src/assets/bg-boost-desktop.svg')",
        'boost-mobile': "url('./src/assets/bg-boost-mobile.svg')",
      },
    },
  },
  plugins: [],
};
