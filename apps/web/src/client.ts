import { redirect, fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit'
import { PUBLIC_GRAPHQL_URL } from '$env/static/public';
import { HoudiniClient } from '$houdini';
import type { ClientPlugin } from '$houdini'
import { locale } from '~/i18n/i18n-svelte';
import { baseLocale } from '~/i18n/i18n-util';
import { Writable, writable, derived } from 'svelte/store';

export const errorHandler: Writable<number> = writable(-1);

let lang: Locales = baseLocale;
locale.subscribe($locale => lang = $locale)

errorHandler.subscribe($errorCode => {
	if ($errorCode === 401) {
		throw redirect(307, `/${lang}/login`);
	}
})

export default new HoudiniClient({
	url: PUBLIC_GRAPHQL_URL,
	fetchParams({ session }) {
		return {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${session?.token}`,
			},
		}
	},
	throwOnError: {
		// can be any combination of
		// query, mutation, subscription, and all
		operations: ['all'],
		// the function to call
		error: (errors, ctx) => {
			if (errors?.map(error => error.extensions).some(extensions => extensions?.code == -40100)) {
				// resolve(ctx, value);
				throw redirect(307, `/${lang}/login`);
			}
			return errors.map(error => error?.extensions?.code);
		}
	}
});
