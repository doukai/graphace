/// <reference types="@sveltejs/kit" />

type Locales = import('./lib/i18n/i18n-types').Locales
type TranslationFunctions = import('~/lib/i18n/i18n-types').TranslationFunctions
type JsonWebToken = import('@graphace/commons').JsonWebToken

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		locale: Locales
		LL: TranslationFunctions
		jwt?: JsonWebToken;
	}
	interface Session {
		token: string | undefined;
		locale: Locales
	}
	interface PageData {
	}

	interface Platform {
	}
}