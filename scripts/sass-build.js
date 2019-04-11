var path = require('path');
var fs = require('fs');
var _a = require('../src/_utils/transformers'), JsonToScss = _a.JsonToScss, ScssToCss = _a.ScssToCss;
// LOAD THE CONFIG OBJECT
var cwd = process.cwd();
var config = require(path.resolve(cwd, './src/styles/config.js'));
var content = "/*\n * THESE VARIABLES ARE AUTOMATICALLY GENERATED USING THE SASS-BUILD SCRIPT AND SHOULD NOT BE UPDATED BY HAND\n * TO UPDATE ONE OF THESE VALUES, UPDATE THE STYLES/CONFIG.JS AND RUN \"YARN BUILD\"\n */\n\n";
try {
    content += JsonToScss(config);
}
catch (err) {
    throw err;
}
// CREATE DEFAULTS FILE
fs.writeFile(path.resolve(cwd, './src/styles/common/_defaults.scss'), content, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('./src/styles/common/_defaults.scss updated!');
    // CREATE COMPILED CSS FILE
    fs.readFile(path.resolve(cwd, './src/styles/index.scss'), async (err, data) => {
        if (err) {
            throw err;
        }
        content = data.toString('utf-8');
        // convert data write to file
        const css = await ScssToCss({
            scss: content,
            importers: ['package'],
            postCSS: ['postcss-import', 'tailwind', 'autoprefixer'],
            includePaths: [path.resolve(cwd, './src/styles')]
        });

        fs.mkdir(path.resolve(cwd, './dist/styles'), { recursive: true }, (err) => {
            if (err) throw err;

            fs.writeFile(path.resolve(cwd, './dist/styles/ui-kit.css'), css, (err, data) => {
                if (err) throw err;
            });
        });
    });
});
