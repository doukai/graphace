/// <reference types="@sveltejs/kit" />

type Locales = import('./i18n/i18n-types').Locales
type TranslationFunctions = import('$i18n/i18n-types').TranslationFunctions

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		locale: Locales
		LL: TranslationFunctions
	}

	interface PageData {
	}

	interface Platform {
	}
}
