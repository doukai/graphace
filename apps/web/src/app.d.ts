/// <reference types="@sveltejs/kit" />

type Locales = import('./i18n/i18n-types').Locales

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		locale: Locales
	}

	interface PageData {
	}

	interface Platform {
	}
}
