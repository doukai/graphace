<script lang="ts" context="module">
	export type LocaleItem = {
		name: string;
		flag: string | undefined;
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Language, ChevronDown } from '@steeze-ui/heroicons';
	import Iconify from '@iconify/svelte';
	import { replaceLocaleInUrl } from '@graphace/commons';
	import { Dropdown, DropdownContent } from '.';
	import { setLocale, locale } from '~/i18n/i18n-svelte';
	import type { Locales } from '~/i18n/i18n-types';
	import { baseLocale } from '~/i18n/i18n-util';
	import { loadLocaleAsync } from '~/i18n/i18n-util.async';

	export let locales: Record<string, LocaleItem>;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'mt-2 max-h-96 w-56 overflow-y-auto';
	export { className as class };

	let currentLocale: string = baseLocale;

	const switchLocale = async (newLocale: string, updateHistoryState = true) => {
		if (!newLocale || $locale === newLocale) {
			return;
		}

		currentLocale = newLocale;

		// load new dictionary from server
		await loadLocaleAsync(newLocale as Locales);

		// select locale
		setLocale(newLocale as Locales);

		if (updateHistoryState) {
			// update url to reflect locale changes
			goto(replaceLocaleInUrl($page.url, newLocale), {
				state: {
					locale: newLocale
				},
				invalidateAll: true
			});
		}
	};

	// update `lang` attribute
	$: browser && document.querySelector('html')!.setAttribute('lang', $locale);

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false);

	// update locale when page store changes
	$: if (browser) {
		const lang = $page.params.lang as Locales;
		switchLocale(lang, false);
	}
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<Dropdown class="dropdown-end">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0" class="btn btn-ghost normal-case">
		<Icon src={Language} class="h-5 w-5 stroke-current" />
		<Icon src={ChevronDown} class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" />
	</div>
	<DropdownContent {zIndex} class={className}>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul class="menu menu-sm gap-1" tabindex="0">
			{#each Object.entries(locales) as locale}
				<li>
					<button
						class:active={currentLocale === locale[0]}
						on:click={(e) => switchLocale(locale[0])}
					>
						<Iconify class="drop-shadow" icon={locale[1].flag} />
						{locale[1].name}
					</button>
				</li>
			{/each}
		</ul>
	</DropdownContent>
</Dropdown>
