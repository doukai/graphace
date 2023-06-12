<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { setLocale, locale } from '$i18n/i18n-svelte';
	import type { Locales } from '$i18n/i18n-types';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import { replaceLocaleInUrl } from '@graphace/commons/utils/url-util';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Language } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';

	$: value = $locale as Locales;

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
	$: browser && document.querySelector('html').setAttribute('lang', $locale);

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

<div class="form-control">
	<label class="input-group">
		<span><Icon src={Language} solid class="h-6 w-6" /></span>
		<select class="select select-bordered" bind:value on:change={() => switchLocale(value)}>
			{#each locales as locale}
				<option value={locale}>{$LL.localeName[locale]()}</option>
			{/each}
		</select>
	</label>
</div>
