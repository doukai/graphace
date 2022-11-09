<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { setLocale, locale } from '../../i18n/i18n-svelte';
	import type { Locales } from '../../i18n/i18n-types';
	import { locales } from '../../i18n/i18n-util';
	import { loadLocaleAsync } from '../../i18n/i18n-util.async';
	import { replaceLocaleInUrl } from '../utils';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Translate } from '@steeze-ui/heroicons';
	import LL from '../../i18n/i18n-svelte';

	let value: Locales = $locale;

	const switchLocale = async (newLocale: Locales, updateHistoryState = true) => {
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		if (browser) {
			const html = document.querySelector('html');
			if (html) {
				// update `lang` attribute
				html.setAttribute('lang', newLocale);
			}
		}

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState(
				{ locale: newLocale },
				'',
				replaceLocaleInUrl(location.pathname, newLocale)
			);
		}
	};

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false);

	// update locale when page store changes
	$: switchLocale($page.params.lang as Locales, false);
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<div class="form-control">
	<label class="input-group">
		<span><Icon src={Translate} solid class="h-6 w-6" /></span>
		<select class="select select-bordered" bind:value on:change={() => switchLocale(value)}>
			{#each locales as locale}
				<option value={locale}>{$LL.localeName[locale]()}</option>
			{/each}
		</select>
	</label>
</div>
