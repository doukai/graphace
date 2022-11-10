import adapter from '@sveltejs/adapter-auto';
import houdini from 'houdini-svelte/preprocess'
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true,
  }),

  kit: {
    adapter: adapter(),
    alias: {
      '~': path.resolve('./src'),
      $houdini: path.resolve('.', '$houdini')
    }
  }
};

export default config;
