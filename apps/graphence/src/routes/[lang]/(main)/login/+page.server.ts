import { type ServerLoadEvent, fail, redirect } from '@sveltejs/kit';
import { createMutation_login_Store } from '~/lib/stores/mutation/mutation_login_store';
import { getJsonSchema } from '~/utils';
import type { Actions } from './$types';

export const actions = {
    default: async (event: ServerLoadEvent) => {
        const { cookies } = event;
        const data = await event.request.formData();
        const login = data.get('login')?.toString() || undefined;
        const password = data.get('password')?.toString() || undefined;

        const { getSchemaErrors } = getJsonSchema(event);

        const errors = await getSchemaErrors({ "$id": "#Mutation_login_Arguments", "type": "object", "properties": { "login": { "type": "string" }, "password": { "type": "string" } }, "additionalProperties": true, "required": ["login", "password"] }, { login, password }, event.locals.locale);

        if (errors) {
            return fail(400, { errors, logining: false });
        }

        const mutation_login_Store = createMutation_login_Store(event);

        if (login && password) {
            const result = await mutation_login_Store.fetch({ login, password });
            if (result.data?.login) {
                cookies.set('Authorization', "Bearer " + result.data?.login, { path: '/', secure: false });
                const from = event.url.searchParams.get('from');
                if (from) {
                    throw redirect(303, from);
                } else {
                    throw redirect(307, '/');
                }
            } else {
                if (result.errors) {
                    return fail(400, { authErrorCodes: result.errors.map(error => error?.extensions?.code), logining: false });
                }
            }
        }
        return { logining: false };
    },
} satisfies Actions;