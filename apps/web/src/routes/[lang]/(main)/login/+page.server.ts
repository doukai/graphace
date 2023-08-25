import { type ServerLoadEvent, fail, redirect } from '@sveltejs/kit';
import { graphql } from '$houdini'
import type { Actions } from './$types';
import { validateAsync } from '@graphace/graphql/schema/json-schema';

export const actions = {
    default: async (event: ServerLoadEvent) => {
        const { cookies } = event;
        const data = await event.request.formData();
        const login = data.get('login')?.toString() || undefined;
        const password = data.get('password')?.toString() || undefined;
        const errors = await validateAsync('MutationType', { login: { login, password } }, event.locals.locale);

        if (errors) {
            return fail(400, { errors: errors.login?.iterms, logining: false });
        }

        const loginMutation = graphql(`
            mutation Login($login: String!, $password: String!) {
                login(login: $login, password: $password)
            }
        `);

        if (login && password) {
            const result = await loginMutation.mutate({ login, password }, { event });
            if (result.data?.login) {
                cookies.set('Authorization', "Bearer " + result.data?.login, { path: '/' });
                const from = event.url.searchParams.get('from');
                if (from) {
                    throw redirect(307, from);
                } else {
                    throw redirect(307, `/`);
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