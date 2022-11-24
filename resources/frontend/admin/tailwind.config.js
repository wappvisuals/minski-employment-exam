/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addComponents }) {
      const buttons = {
        '.btn': {
          padding: '.70rem 1.5rem',
          borderRadius: '.25rem',
          fontWeight: '400',
          '&:focus': {
            outline: 'none'
          }
        },
        '.btn-primary': {
          backgroundColor: '#41b883',
          color: '#fff',
          borderWidth: '2px',
          borderColor: '#41b883',
          '&:hover': {
            backgroundColor: '#17b16d'
          },
          '&:disabled':{
            cursor: 'not-allowed'
          }
        },
        '.btn-secondary': {
          backgroundColor: '#04243C',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#04243C !important',
            color: '#fff !important',
          },
          '&.no-fill': {
            backgroundColor: 'transparent',
            borderWidth: '2px',
            borderColor: '#04243C',
            color: '#04243C',
          },
        },
        '.btn-black': {
          backgroundColor: '#04243C',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#000A11 !important',
            color: '#fff !important',
          },
          '&.no-fill': {
            backgroundColor: 'transparent',
            borderWidth: '2px',
            borderColor: '#000A11',
            color: '#000A11',
          },
        }
      }

      const inputs = {
        '.form-control': {
          borderColor: '#CCCCCC',
          padding: '.78rem',
          borderWidth: '1px',
          color: '#1D222D',
          borderRadius: '5px',
          '&:hover': {
            borderColor: '#41b883 !important',
            borderWidth: '1px',
          },
          '&:focus': {
            borderColor: '#41b883 !important',
            borderWidth: '1px',
            outline: 'none',
          },
          '&.has-error': {
            borderColor: '#C3566A !important',
          }
        }
      }

      const text = {
        '.text-primary': {
          color: '#41b883'
        },
        '.text-secondary': {
          color: '#04243C'
        }
      }

      const background = {
        '.bg-primary': {
          backgroundColor: '#41b883'
        },
        '.bg-primary-100': {
          backgroundColor: 'rgba(151, 80, 48, 0.1)'
        },
        '.bg-secondary': {
          backgroundColor: '#04243C'
        },
        '.bg-blue': {
          backgroundColor: '#366E78'
        },
        '.bg-green': {
          backgroundColor: '#049561'
        },
      }

      addComponents(buttons);
      addComponents(inputs);
      addComponents(text);
      addComponents(background);
    }
  ],
}
