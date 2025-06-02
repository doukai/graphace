import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Icons from 'unplugin-icons/vite'
import 'dotenv/config';

const config: UserConfig = {
    plugins: [
        sveltekit(),
        Icons({
            compiler: 'svelte',
        })
    ],
    resolve: {
        alias: {
        },
    },
};

export default config;
