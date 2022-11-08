/// <reference types="@sveltejs/kit" />

type Locales = import('./i18n/i18n-types').Locales

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals { }

	interface Platform { }

	interface Session {
		locale: Locales
	}

	interface Stuff { }
}
