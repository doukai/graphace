import type { LoadEvent } from '@sveltejs/kit';
import { jwt as jwtStore } from '@graphace/commons';
import { createJsonSchema, createPermissions, createStructQueryStores, setJsonSchema, setPermissionsStore, setLoadEvent } from '~/utils';
import type { Locales } from '$i18n/i18n-types';
import { namespaces } from '$i18n/i18n-util';
import { loadLocaleAsync, loadNamespaceAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
	setLoadEvent(event);
	const locale: Locales = event.data?.locale;
	const jwt: JsonWebToken = event.data?.jwt;
	const permissions = createPermissions(event);
	setPermissionsStore(permissions);
	const jsonSchema = createJsonSchema(event);
	setJsonSchema(jsonSchema);
	const structQueryStores = createStructQueryStores(event);

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
	return {
		locale,
		permissions,
		jsonSchema,
		structQueryStores
	};
}