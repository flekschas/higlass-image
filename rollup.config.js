import { terser } from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';

const { VERSION, DEPENDENCIES } = require('./globals.js');

const configurator = (file, format, plugins) => ({
  input: 'src/index.js',
  output: {
    name: 'GeoJsonTrack',
    format,
    file,
    intro: `const VERSION = ${VERSION};\nconst DEPENDENCIES = ${DEPENDENCIES};`
  },
  plugins
});

const devConfig = configurator('dist/higlass-image.js', 'umd', [
  resolve(),
  commonjs({ sourceMap: false }),
  buble(),
  filesize(),
  visualizer()
]);

const prodConfig = configurator('dist/higlass-image.min.js', 'umd', [
  resolve(),
  commonjs({ sourceMap: false }),
  buble(),
  terser()
]);

export default [devConfig, prodConfig];
