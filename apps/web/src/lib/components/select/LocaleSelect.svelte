<script lang="ts">
	import { replaceLocaleInUrl } from '@graphace/commons';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { setLocale, locale } from '$i18n/i18n-svelte';
	import type { Locales } from '$i18n/i18n-types';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Iconify from '@iconify/svelte';
	import { Language, ChevronDown } from '@steeze-ui/heroicons';

	$: value = $locale as Locales;

	const flags: Record<Locales, string> = {
		en: 'twemoji:flag-united-kingdom',
		zh: 'twemoji:flag-china'
	};

	const names: Record<Locales, string> = {
		en: 'English',
		zh: '简体中文'
	};

	const switchLocale = async (newLocale: Locales, updateHistoryState = true) => {
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState({ locale: newLocale }, '', replaceLocaleInUrl($page.url, newLocale));
		}

		// run the `load` function again
		invalidateAll();
	};

	// update `lang` attribute
	$: browser && document.querySelector('html')!.setAttribute('lang', $locale);

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false);

	// update locale when page store changes
	$: if (browser) {
		const lang = $page.params.lang as Locales;
		switchLocale(lang, false);
		history.replaceState(
			{ ...history.state, locale: lang },
			'',
			replaceLocaleInUrl($page.url, lang)
		);
	}
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<div title="Change Language" class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0" class="btn btn-ghost normal-case">
		<Icon src={Language} class="h-5 w-5 stroke-current" />
		<Icon src={ChevronDown} class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" />
	</div>
	<div
		class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 w-56 overflow-y-auto shadow"
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul class="menu menu-sm gap-1" tabindex="0">
			{#each locales as locale}
				<li>
					<button class:active={value == locale} on:click={() => switchLocale(locale)}>
						<Iconify class="drop-shadow" icon={flags[locale]} />
						{names[locale]}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
