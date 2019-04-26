var tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [require('postcss-import'), tailwindcss('./styles/tailwind/tailwind.config.js'), require('autoprefixer')],
};
