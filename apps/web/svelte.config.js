import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      '~': path.resolve('./src'),
      "@graphace/commons": path.resolve('../../packages/commons/src/index'),
      "@graphace/commons/*": path.resolve('../../packages/commons/src'),
      "@graphace/graphql": path.resolve('../../packages/graphql/src/index'),
      "@graphace/graphql/*": path.resolve('../../packages/graphql/src'),
      "@graphace/ui": path.resolve('../../packages/ui/src/index'),
      "@graphace/ui/*": path.resolve('../../packages/ui/src'),
      "@graphace/ui-graphql": path.resolve('../../packages/ui-graphql/src/index'),
      "@graphace/ui-graphql/*": path.resolve('../../packages/ui-graphql/src'),
			$i18n: 'src/i18n',
      $houdini: path.resolve('.', '$houdini')
    }
  }
};

export default config;
