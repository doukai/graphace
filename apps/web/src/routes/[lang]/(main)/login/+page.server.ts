import { type ServerLoadEvent, fail, redirect } from '@sveltejs/kit';
import { graphql } from '$houdini'
import type { Actions } from './$types';
import { validateAsync } from '@graphace/graphql/schema/json-schema';
import { locale } from '$i18n/i18n-svelte';
import { baseLocale } from '~/i18n/i18n-util';

let lang: Locales = baseLocale;
locale.subscribe($locale => lang = $locale)

export const actions = {
    default: async (event: ServerLoadEvent) => {
        const { cookies, request } = event;
        const data = await event.request.formData()

        const login = data.get('login')?.toString()
        const password = data.get('password')?.toString()

        const errors = await validateAsync('MutationType', { login: { login, password } }, lang);

        if (errors) {
            return fail(400, errors);
        }

        const loginMutation = graphql(`
            mutation Login($login: String!, $password: String!) {
                login(login: $login, password: $password)
            }
        `);

        const result = await loginMutation.mutate({ login, password }, { event });
        console.log(result)

        if (result.data?.login) {
            cookies.set('Authorization', "Bearer " + result.data?.login);
            const from = event.url.searchParams.get('from');
            if (from) {
                throw redirect(307, from);
            } else {
                throw redirect(307, `/`);
            }
        } else {
            if (result.errors) {
                // console.error(result.errors);
            }

        }
        return { success: true }
    },
} satisfies Actions;