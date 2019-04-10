import * as nodeSass from 'node-sass';
import * as postcss from 'postcss';

const path = require('path');
const cwd = process.cwd();

/**
 * IMPORTERS
 */

type IImporter = (url: string, prev?: string) => void | 'js' | 'package';

const Importers = {
  js: require('../../../scripts/sass-js-importer'),
  package: require('node-sass-package-importer')(),
};

/**
 * POSTCSS PLUGINS
 */

type IPostCSSPlugin = postcss.AcceptedPlugin | 'postcss-import' | 'tailwind' | 'autoprefixer';

const PostCSSPlugins = {
  'postcss-import': () => require('postcss-import'),
  autoprefixer: () => require('autoprefixer'),
  tailwind: (config: string | any) => require('tailwindcss')(config),
};

/**
 * SCSS TO CSS
 */

// todo add typings for tailwind.config
interface IScssToCss {
  scss: string;
  config?: any;
  importers?: IImporter[];
  postCSS?: IPostCSSPlugin[];
  includePaths?: string[];
}

const ScssToCss = async ({ scss, importers = [], postCSS = [], includePaths = [], config = {} }: IScssToCss) => {
  const resolvePaths = [...includePaths, path.resolve(cwd, '/node_modules/@stoplight/ui-kit/src/styles')];
  const scssImporters = importers.map(importer => Importers[importer as any] || importer);
  const postCSSPlugins = postCSS.map(plugin => PostCSSPlugins[plugin as any](config) || plugin);

  return nodeSass.render(
    {
      data: scss,
      includePaths: resolvePaths,
      importer: scssImporters,
    },
    (err, res) => {
      if (err) {
        console.error(`error compiling the css: ${err}`);
        return err;
      }

      const css = res.css.toString('utf-8');

      try {
        if (postCSSPlugins.length) {
          return postcss(postCSSPlugins)
            .process(css, { from: '' })
            .then(result => {
              return result.css;
            });
        }
      } catch (e) {
        console.error(`issue post processing the css: ${e}`);
      }

      return css;
    }
  );
};

/**
 * EXPORTS
 */
export { IScssToCss, ScssToCss };
