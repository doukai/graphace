<script lang="ts">
	import '../../../app.css';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Iconify from '@iconify/svelte';
	import {
		init,
		zIndex,
		NavBar,
		Modals,
		Toasts,
		NavBarStart,
		NavBarEnd,
		ThemeDropdown,
		LocaleDropdown
	} from '@graphace/ui';
	import { setLocale, LL, locale } from '$i18n/i18n-svelte';
	import { UserMenu } from '~/lib/components/menu';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	setLocale(data.locale);
	setContext('permissions', data.permissions);
	setContext('jsonSchema', data.jsonSchema);
	setContext('structQueryStores', data.structQueryStores);
	setContext('LL', LL);
	setContext('theme', writable(undefined));
	setContext('ui.card', 'bg-base-100 shadow-xl');
	setContext('ui.card-body', 'w-full md:max-h-[calc(100vh-8rem)]');
	setContext('ui.dropdown-content', 'bg-base-200 text-base-content rounded-box shadow-xl');
	setContext('ui.popover-content', 'bg-base-200 rounded-box shadow-xl');
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;900&family=Noto+Sans+JP:wght@300;900&family=Noto+Sans:wght@300;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<NavBar zIndex={$zIndex + 1} class="sticky top-0 bg-base-100">
	<NavBarStart class="flex items-center space-x-1">
		<a
			href={null}
			on:click|preventDefault={(e) => {
				init(`/${$locale}`);
			}}
			aria-current="page"
			aria-label={$LL.graphence.path.home()}
			class="btn btn-ghost px-0"
		>
			<Iconify class="h-6 w-6" icon="logos:graphql" />
			<div class="font-title inline-flex text-lg md:text-2xl">
				<span class="lowercase">graph</span>
				<span class="uppercase text-[#E535AB]">ACE</span>
			</div>
		</a>
	</NavBarStart>
	<NavBarEnd class="flex items-center space-x-1">
		<ThemeDropdown zIndex={$zIndex + 1} />
		<LocaleDropdown
			zIndex={$zIndex + 1}
			locales={{
				en: { name: 'English', flag: 'twemoji:flag-united-kingdom' },
				zh: { name: '简体中文', flag: 'twemoji:flag-china' }
			}}
		/>
		<UserMenu />
	</NavBarEnd>
</NavBar>
<main class="max-w-[100vw] p-1 md:p-2">
	<slot />
	<Toasts />
	<Modals />
</main>
