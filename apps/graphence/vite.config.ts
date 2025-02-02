import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import 'dotenv/config';

const config: UserConfig = {
    plugins: [sveltekit()],

    resolve: {
        alias: {
        },
    },
};

export default config;
