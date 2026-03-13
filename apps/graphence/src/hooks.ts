import type { Reroute } from '@sveltejs/kit';
import { loadEvent, createPermissions, createValidator } from './utils';

export const reroute: Reroute = (event) => {
    loadEvent.set(event);
    createValidator(event);
    createPermissions(event);
};