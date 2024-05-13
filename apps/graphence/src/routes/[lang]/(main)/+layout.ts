import { jwt as jwtStore } from '@graphace/commons';
import type { LayoutLoad } from './$types';
import type { Locales } from '$i18n/i18n-types'
import { loadLocaleAsync, loadNamespaceAsync } from '$i18n/i18n-util.async';
import LL, { setLocale } from '$i18n/i18n-svelte';

export const load: LayoutLoad<{ locale: Locales, jwt: JsonWebToken }> = async ({ data: { locale, jwt } }) => {
	// load dictionary into memory
	await loadLocaleAsync(locale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	await loadNamespaceAsync(locale, "graphence");
	await loadNamespaceAsync(locale, "graphql");
	await loadNamespaceAsync(locale, "errors");
	await loadNamespaceAsync(locale, "ui");
	await loadNamespaceAsync(locale, "uiGraphql");
	setLocale(locale);

	jwtStore.set(jwt);

	// pass locale to the "rendering context"
	return { locale };
}