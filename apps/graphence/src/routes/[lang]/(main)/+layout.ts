import { jwt as jwtStore } from '@graphace/commons';
import type { LayoutLoad } from './$types';
import type { Locales } from '$i18n/i18n-types';
import { namespaces } from '$i18n/i18n-util';
import { loadLocaleAsync, loadNamespaceAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';

export const load: LayoutLoad<{ locale: Locales, jwt: JsonWebToken }> = async ({ data: { locale, jwt } }) => {
	// load dictionary into memory
	await loadLocaleAsync(locale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	for (const namespace of namespaces) {
		await loadNamespaceAsync(locale, namespace);
	}
	setLocale(locale);

	jwtStore.set(jwt);

	// pass locale to the "rendering context"
	return { locale };
}