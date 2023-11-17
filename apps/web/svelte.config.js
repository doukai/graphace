// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      // default options are shown
      out: 'build'
    }),
    csrf: {
      checkOrigin: false,
    },
    alias: {
      '~': path.resolve('./src'),
      $i18n: 'src/i18n',
      $houdini: path.resolve('.', '$houdini')
    }
  }
};

export default config;
