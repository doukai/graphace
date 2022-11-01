import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path'
import { resolve } from 'path';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			// Root
			$root: resolve('../../'),

			// App (main)
			$site: resolve('../../apps/site/src'),
		},
		vite: {
			resolve: {
				alias: {
					// Root
					$root: path.resolve('../../'),

					// App (main)
					$site: path.resolve('../../apps/site/src'),
				}
			}
		}
	}
};

export default config;
