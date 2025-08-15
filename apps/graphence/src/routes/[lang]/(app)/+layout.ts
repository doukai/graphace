import type { LoadEvent } from '@sveltejs/kit';
import { jwt } from '@graphace/commons';
import type { Locales } from '$i18n/i18n-types';
import { namespaces } from '$i18n/i18n-util';
import { loadLocaleAsync, loadNamespaceAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';
import { loadEvent } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
	loadEvent.set(event);
	jwt.set(event.data?.jwt);
	const locale: Locales = event.data?.locale;

	// load dictionary into memory
	await loadLocaleAsync(locale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	for (const namespace of namespaces) {
		await loadNamespaceAsync(locale, namespace);
	}

	setLocale(locale);

	// pass locale to the "rendering context"
	return {};
}