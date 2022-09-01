import browserslist from 'browserslist';
import { esbuildPluginBrowserslist } from 'esbuild-plugin-browserslist';

/** @typedef {import('esbuild').BuildOptions} BuildOptions */
/** @typedef {import('esbuild').ServeOptions} ServeOptions */

const browserslistPlugin = esbuildPluginBrowserslist(browserslist(), {
  printUnknownTargets: false
});

/** @type {BuildOptions} */
export const commonConfig = {
  entryPoints: ['src/js/lightbox.js'],
  outbase: 'src/js',
  bundle: false,
  banner: {
    js: `/*!
  * Lightbox v2.11.2
  * by Lokesh Dhakar
  *
  * More info:
  * http://lokeshdhakar.com/projects/lightbox2/
  *
  * Copyright Lokesh Dhakar
  * Released under the MIT license
  * https://github.com/lokesh/lightbox2/blob/master/LICENSE
  *
  * @preserve
  */`
  }
};

/** @type {BuildOptions} */
export const esmConfig = {
  format: 'esm',
  outfile: 'dist/js/lightbox.mjs',
  plugins: [browserslistPlugin]
};

/** @type {BuildOptions} */
export const cjsConfig = {
  format: 'cjs',
  platform: 'node',
  outfile: 'dist/js/lightbox.cjs',
  target: ['node16']
};

/** @type {BuildOptions} */
export const browserConfig = {
  format: 'iife',
  platform: 'browser',
  globalName: 'lightbox',
  outfile: 'dist/js/lightbox.js',
  plugins: [browserslistPlugin]
};

/** @type {BuildOptions} */
export const buildConfig = { minify: true };

/** @type {BuildOptions} */
export const watchConfig = {
  minify: false,
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error);
      else console.log('watch build succeeded:', result);
    }
  },
  sourcemap: true
};

export const serveConfig = {
  minify: false,
  sourcemap: true
};

/** @type {ServeOptions} */
export const serveOptions = {
  servedir: '.'
};
