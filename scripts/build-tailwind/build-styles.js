/* eslint-disable @typescript-eslint/no-unused-vars */
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// 1. Load your existing config file
const configPath = path.resolve(__dirname, './postcss.config.js');
const postcssConfig = require(configPath);

// 2. Define input and output files
const inputFile = path.resolve(__dirname, './tailwind.css');
const outputFile = path.resolve(__dirname, '../../src/styles/tailwind/_base.scss');

// 3. Read the Tailwind CSS file
const css = fs.readFileSync(inputFile, 'utf8');

// 4. Process CSS using the array of plugins from your config
postcss(postcssConfig.plugins)
  .process(css, { from: inputFile, to: outputFile })
  .then(result => {
    // Ensure directory exists
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    // Write processed file
    fs.writeFileSync(outputFile, result.css, 'utf8');
    if (result.map) {
      fs.writeFileSync(`${outputFile}.map`, result.map.toString(), 'utf8');
    }
  })
  .catch(error => {
    process.exit(1);
  });
