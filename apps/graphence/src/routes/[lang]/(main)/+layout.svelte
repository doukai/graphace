<script lang="ts">
	import '../../../app.css';
	import { setContext } from 'svelte';
	import { NavBar, LocaleSelect, ThemeSelect } from '@graphace/ui';
	import { setLocale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale);
	setContext('LL', LL);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;900&family=Noto+Sans+JP:wght@300;900&family=Noto+Sans:wght@300;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<NavBar showMenuButton={false}>
	<ThemeSelect slot="option1" />
	<LocaleSelect
		locales={{
			en: { name: 'English', flag: 'twemoji:flag-united-kingdom' },
			zh: { name: '简体中文', flag: 'twemoji:flag-china' }
		}}
		slot="option2"
	/>
</NavBar>
<main>
	<slot />
</main>

<style global>
	code[class*='language-'],
	pre[class*='language-'] {
		background: unset;
	}
	.prose pre[class*='language-'] {
		max-width: clamp(20rem, calc(100vw - 4rem), 80ch);
		background-color: hsl(var(--n));
		color: hsl(var(--nc));
	}
	@media (min-width: 1024px) {
		.prose pre[class*='language-'] {
			max-width: clamp(20rem, calc(100vw - 20rem - 4rem), 80ch);
		}
	}
	@media (min-width: 1280px) {
		.prose pre[class*='language-'] {
			max-width: clamp(20rem, calc(100vw - 20rem - 4rem - 8rem), 80ch);
		}
	}
</style>
