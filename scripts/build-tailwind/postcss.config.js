var tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./src/styles/tailwind/tailwind.config.js'),
    require('postcss-prepend-selector')({ selector: '.#{$ns} ' }),
    require('autoprefixer'),
  ],
};
