module.exports = {
  mode: "jit",
  purge: ['**/*.{html,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        "heading-1": '2.75rem',
        "heading-2": '1.75rem'
      },
      lineHeight: {
        "heading-1": '3.25rem',
      },
      textColor: {
        'secondary': '#797874',
      },
      boxShadow: {
        "btn": "0px 1px 2px 0px #00000033"
      }
    },
  },
}
