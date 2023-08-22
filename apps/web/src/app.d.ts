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
	interface Session {
		token: string | undefined;
		user?: User;
	}
	interface PageData {
	}

	interface Platform {
	}
}

interface User {
	iss: string
	sub?: string
	upn?: string
	full_name?: string | undefined
	family_name?: string | undefined
	groups?: string[] | undefined
	roles?: string[] | undefined
	iat?: number
	exp?: number
}