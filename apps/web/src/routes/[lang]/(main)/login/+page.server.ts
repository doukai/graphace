import { type ServerLoadEvent, fail, redirect } from '@sveltejs/kit';
import { graphql } from '$houdini';
import jwt_decode from "jwt-decode";
import type { Actions } from './$types';


export const actions = {
    login: async (event: ServerLoadEvent) => {
        const { cookies, locals } = event;
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
        const token = result.data?.login;

        if (token) {
            cookies.set('Authorization', "Bearer " + token);
            const jwtToken = jwt_decode(token);
            console.log(JSON.stringify(jwtToken));
            const from = event.url.searchParams.get('from');
            if (from) {
                throw redirect(307, from);
            } else {
                throw redirect(307, `/`);
            }
        }
        return {};
    },
} satisfies Actions;