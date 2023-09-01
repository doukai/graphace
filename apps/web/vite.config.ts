import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite'
import type { UserConfig } from 'vite';
import 'dotenv/config';

const config: UserConfig = {
	plugins: [houdini(), sveltekit()]
};

export default config;
