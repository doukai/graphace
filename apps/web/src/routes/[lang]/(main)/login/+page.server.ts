import { type ServerLoadEvent, fail, redirect } from '@sveltejs/kit';
import { graphql } from '$houdini'
import type { Actions } from './$types';

export const actions = {
    login: async (event: ServerLoadEvent) => {
        const { cookies, request } = event;
        const data = await event.request.formData()

        const login = data.get('login')?.toString()
        const password = data.get('password')?.toString()

        if (!login || !password) {
            return fail(403, { login: '*' })
        }

        const loginMutation = graphql(`
            mutation Login($login: String!, $password: String!) {
                login(login: $login, password: $password)
            }
        `);

        const result = await loginMutation.mutate({ login, password }, { event });

        if (result.data?.login) {
            cookies.set('Authorization', result.data?.login);
            console.log(result.data?.login)
            const from = event.url.searchParams.get('from');
            if (from) {
                throw redirect(307, from);
            } else {
                throw redirect(307, `/`);
            }
        } else {

        }
    },
} satisfies Actions;