var tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./src/styles/tailwind/tailwind.config.js'),
    require('autoprefixer'),
  ],
};
