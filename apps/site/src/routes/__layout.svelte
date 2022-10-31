<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Locales } from '../i18n/i18n-types';
	import { replaceLocaleInUrl } from '../lib/utils';
	import { baseLocale, locales } from '../i18n/i18n-util';
	import { loadLocaleAsync } from '../i18n/i18n-util.async';
	import { isMenuOpen } from '../lib/stores';

	type LoadParams = {
		lang?: Locales;
	};

	export const load: Load<LoadParams> = async ({ url, session, params }) => {
		// fallback needed because of https://github.com/sveltejs/kit/issues/3647
		const lang = params.lang || (url.pathname.split('/')[1] as Locales);

		// redirect to preferred language if user comes from page root
		if (!lang) {
			return {
				status: 302,
				redirect: `/${session.locale}`
			};
		}

		// redirect to base locale if language is not present
		if (!locales.includes(lang)) {
			return {
				status: 302,
				redirect: replaceLocaleInUrl(url.pathname, baseLocale)
			};
		}

		// delete session locale since we don't need it to be sent to the client
		delete session.locale;

		await loadLocaleAsync(lang);

		return { props: { locale: lang } };
	};
</script>

<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import SideBar from '$lib/components/ui/SideBar.svelte';
	import TypeMenu from '$lib/components/graphql/introspection/TypeMenu.svelte';
	import { NavBar, NavBarStart, NavBarEnd } from '$lib/components/ui/navbar';
	import Notifications from '$lib/components/ui/Notifications.svelte';
	import MessageBoxs from '$lib/components/ui/MessageBoxs.svelte';
	import { setLocale } from '$i18n/i18n-svelte';
	import { LocaleSelect, ThemeSelect } from '$lib/components/ui/select';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Menu, Adjustments } from '@steeze-ui/heroicons';

	export let locale: Locales;
	setLocale(locale);

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="drawer">
	<input id="left-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="drawer drawer-end">
			<input id="right-drawer" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				<div
					class={$isMenuOpen
						? 'hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'
						: 'hidden'}
				>
					<SideBar>
						<TypeMenu />
					</SideBar>
				</div>
				<div class={$isMenuOpen ? 'md:pl-64 flex flex-col' : 'flex flex-col'}>
					<NavBar>
						<NavBarStart>
							<button
								class="hidden md:btn md:btn-square md:btn-ghost"
								on:click={(e) => isMenuOpen.update((isOpen) => !isOpen)}
							>
								<Icon src={Menu} solid class="h-6 w-6" />
							</button>
							<label for="left-drawer" class="btn btn-square btn-ghost drawer-button md:hidden">
								<Icon src={Menu} solid class="h-6 w-6" />
							</label>
						</NavBarStart>
						<NavBarEnd>
							<LocaleSelect />
							<label for="right-drawer" class="ml-1 btn btn-square btn-ghost drawer-button">
								<Icon src={Adjustments} solid class="h-6 w-6" />
							</label>
						</NavBarEnd>
					</NavBar>
					<main class="flex-1">
						<div class="py-6">
							<div class="overflow-hidden max-w-full mx-auto px-4 sm:px-6 md:px-8">
								<slot />
							</div>
						</div>
						<MessageBoxs />
						<Notifications />
					</main>
				</div>
			</div>
			<div class="drawer-side">
				<label for="right-drawer" class="drawer-overlay" />
				<div class="menu p-4 overflow-y-auto bg-base-100 text-base-content space-y-3">
					<ThemeSelect />
				</div>
			</div>
		</div>
	</div>
	<div class="drawer-side">
		<label for="left-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<TypeMenu />
		</ul>
	</div>
</div>

<style>
	:global(.tippy-box[data-theme='daisy']) {
		@apply inline-block py-1 px-1 rounded-lg shadow-sm bg-base-100;
	}
	:global(.tippy-box[data-theme~='daisy'][data-placement^='top'] > .tippy-arrow) {
		@apply -bottom-1.5 left-0 border-t-8 border-x-8 border-b-0 border-transparent border-t-base-100;
	}
	:global(.tippy-box[data-theme~='daisy'][data-placement^='bottom'] > .tippy-arrow) {
		@apply -top-1.5 left-0 border-t-0 border-x-8 border-b-8 border-transparent border-b-base-100;
	}
	:global(.tippy-box[data-theme~='daisy'][data-placement^='left'] > .tippy-arrow) {
		@apply -right-1.5 border-l-8 border-y-8 border-r-0 border-transparent border-l-base-100;
	}
	:global(.tippy-box[data-theme~='daisy'][data-placement^='right'] > .tippy-arrow) {
		@apply -left-1.5 border-l-0 border-y-8 border-r-8 border-transparent border-r-base-100;
	}
</style>
