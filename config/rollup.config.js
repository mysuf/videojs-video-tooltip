import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  name: 'videojsIma',
  input: 'src/mouse.video.display.js',
  output: {
    file: 'dist/videojs.video.tooltip.js',
    format: 'umd',
  },
  external: ['video.js'],
  globals: {
    'video.js': 'videojs',
  },
  plugins: [
    json(),
    copy({
      'src/css/video.tooltip.css': 'dist/videojs.video.tooltip.css',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
