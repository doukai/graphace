import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public';
import { HoudiniClient } from '$houdini';
import type { ClientPlugin } from '$houdini'
import { locale } from '~/i18n/i18n-svelte';
import { baseLocale } from '~/i18n/i18n-util';

let lang: Locales = baseLocale;
locale.subscribe($locale => lang = $locale)

const authPlugin: ClientPlugin = () => {
	return {
		afterNetwork(ctx, { value, resolve }) {
			if (value.errors?.map(error => error.extensions).some(extensions => extensions?.code == -40100)) {
				if (browser) {
					goto(`/${lang}/login`);
				} else {
					throw redirect(307, `/${lang}/login`);
				}
			}

			// keep the information flowing to the user
			resolve(ctx, value);
		}
	}
}

export default new HoudiniClient({
	url: PUBLIC_GRAPHQL_URL,
	plugins: [
		authPlugin
	],
	fetchParams({ session }) {
		return {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${session?.token}`,
			},
		}
	}
});
