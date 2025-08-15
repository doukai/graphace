import type { Reroute } from '@sveltejs/kit';
import { createPermissions, createStructQueryStores, createValidator } from './utils';

export const reroute: Reroute = (event) => {
    createValidator(event);
    createPermissions(event);
    createStructQueryStores(event);
};