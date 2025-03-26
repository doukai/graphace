<script lang="ts">
	import '../../../app.css';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Iconify from '@iconify/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bars4 } from '@steeze-ui/heroicons';
	import {
		init,
		to,
		history,
		zIndex,
		Breadcrumbs,
		Drawer,
		NavBar,
		Modals,
		Toasts,
		DrawerContent,
		DrawerSide,
		NavBarStart,
		NavBarEnd,
		ThemeDropdown,
		LocaleDropdown
	} from '@graphace/ui';
	import { SideBarMenu, ModuleMenu, UserMenu } from '~/lib/components/menu';
	import { setLocale, LL, locale } from '$i18n/i18n-svelte';
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

<Drawer let:id class="lg:drawer-open overflow-hidden">
	<DrawerContent {id} class="bg-base-200">
		<NavBar zIndex={$zIndex + 1} class="sticky top-0 bg-base-100">
			<NavBarStart class="flex items-center space-x-1">
				<span
					class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)] lg:hidden"
					data-tip={$LL.ui.menu.menu()}
				>
					<label
						aria-label={$LL.ui.menu.open()}
						for={id}
						class="btn btn-square btn-ghost drawer-button"
					>
						<Icon src={Bars4} class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6" />
					</label>
				</span>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						init(`/${$locale}`);
					}}
					aria-current="page"
					aria-label={$LL.graphence.path.home()}
					class="btn btn-ghost px-0 lg:hidden"
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
				<UserMenu zIndex={$zIndex + 1} />
			</NavBarEnd>
		</NavBar>
		<main class="max-w-[100vw] p-1 md:p-2">
			<div class="flex justify-between items-center pl-4">
				<Breadcrumbs>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								init(`/${$locale}`, $LL.graphence.path.home());
							}}
						>
							<span>{$LL.graphence.path.home()}</span>
						</a>
					</li>
					{#each $history as page}
						<li>
							<a
								href={null}
								on:click|preventDefault={(e) => {
									to(page.url, page.name);
								}}
							>
								{page.name}
							</a>
						</li>
					{/each}
				</Breadcrumbs>
				<ModuleMenu />
			</div>
			<slot />
			<Toasts />
			<Modals />
		</main>
	</DrawerContent>
	<DrawerSide {id} class="z-[{$zIndex + 2}] lg:z-[0]">
		<div>
			<div
				class="bg-base-100 sticky top-0 items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur max-lg:hidden"
			>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						init(`/${$locale}`);
					}}
					aria-current="page"
					aria-label={$LL.graphence.path.home()}
					class="flex-0 btn btn-ghost px-2"
				>
					<Iconify class="h-6 w-6" icon="logos:graphql" />
					<div class="font-title inline-flex text-lg md:text-2xl">
						<span class="lowercase">graph</span>
						<span class="uppercase text-[#E535AB]">ACE</span>
					</div>
				</a>
			</div>
			<SideBarMenu />
		</div>
	</DrawerSide>
</Drawer>
