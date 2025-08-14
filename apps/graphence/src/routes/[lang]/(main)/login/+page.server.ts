import { type ServerLoadEvent, fail, redirect } from '@sveltejs/kit';
import { createMutation_login_Store } from '~/lib/stores/mutation/mutation_login_store';
import { validator } from '~/utils';
import type { Actions } from './$types';

export const actions = {
    default: async (event: ServerLoadEvent) => {
        const { cookies } = event;
        const data = await event.request.formData();
        const login = data.get('login')?.toString() || undefined;
        const password = data.get('password')?.toString() || undefined;

        try {
            await validator.validateSchema(
                {
                    "$id": "#Mutation_login_Arguments",
                    "type": "object",
                    "properties": {
                        "login": { "type": "string" },
                        "password": { "type": "string" }
                    },
                    "additionalProperties": true,
                    "required": ["login", "password"]
                },
                { login, password }
            );
        } catch (errors) {
            return fail(400, { errors, logining: false });
        }

        if (login && password) {
            const mutation_login_Store = createMutation_login_Store(event);
            const result = await mutation_login_Store.fetch({ login, password });
            if (result.data?.login) {
                cookies.set('Authorization', "Bearer " + result.data?.login, { path: '/', secure: false });
                const from = event.url.searchParams.get('from');
                if (from) {
                    redirect(303, from);
                } else {
                    redirect(307, '/');
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