<script lang="ts">
	import '../../../app.css';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import {
		SideBar,
		Breadcrumbs,
		NavBar,
		Notifications,
		MessageBoxs,
		LocaleSelect,
		ThemeSelect,
		FuzzySearch,
		to,
		PageType,
		init,
		history
	} from '@graphace/ui';
	import Iconify from '@iconify/svelte';
	import { setLocale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { NamespaceGraphqlTranslation } from '$i18n/i18n-types';
	import SideBarMenu from '~/lib/components/menu/SideBarMenu.svelte';
	import UserMenu from '~/lib/components/menu/UserMenu.svelte';
	import ModuleMenu from '~/lib/components/menu/ModuleMenu.svelte';
	import pages from '~/lib/data/pages.json';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale);
	setContext('permissions', data.permissions);
	setContext('jsonSchema', data.jsonSchema);
	setContext('structQueryStores', data.structQueryStores);
	setContext('LL', LL);
	setContext('theme', writable(undefined));

	let drawersidebar: HTMLDivElement;
	let drawerSidebarScrollY = 0;
	function parseSidebarScroll() {
		drawerSidebarScrollY = drawersidebar.scrollTop;
	}
	onMount(() => {
		parseSidebarScroll();
		document.documentElement.style.scrollPaddingTop = '5rem';
		document.documentElement.style.scrollBehavior = 'smooth';
	});

	let checked = false;
	function closeDrawer() {
		checked = false;
	}

	function openDrawer() {
		checked = true;
	}

	let navbarScrollPadding = '5rem';
	function addScrollPaddingToNavbar() {
		navbarScrollPadding = '5rem';
		document.documentElement.style.scrollPaddingTop = '5rem';
	}

	function removeScrollPaddingFromNavbar() {
		navbarScrollPadding = '0rem';
		document.documentElement.style.scrollPaddingTop = '0rem';
	}

	function onSelect(
		select: CustomEvent<{
			searched: string;
			selected: string | number | Record<string, any>;
			selectedIndex: number;
			original: string | number | Record<string, any>;
			originalIndex: number;
		}>
	) {
		init('/' + $locale + searchIndex[select.detail.originalIndex].href);
		closeDrawer();
	}

	let searchIndex = pages.flatMap((page) =>
		pages.map((page) => {
			return {
				...page,
				name: $LL.graphql.objects[page.name as keyof NamespaceGraphqlTranslation['objects']].name()
			};
		})
	);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;900&family=Noto+Sans+JP:wght@300;900&family=Noto+Sans:wght@300;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<div class="drawer lg:drawer-open bg-base-100">
	<input id="drawer" type="checkbox" class="drawer-toggle" bind:checked />
	<div class="drawer-content bg-base-200">
		<NavBar>
			<a
				href={null}
				on:click|preventDefault={(e) => {
					init(`/${$locale}`);
				}}
				aria-current="page"
				aria-label={$LL.graphence.path.home()}
				class="flex-0 btn btn-ghost gap-1 px-2 md:gap-2"
				slot="logo"
			>
				<Iconify class="h-6 w-6 md:h-8 md:w-8" icon="logos:graphql" />
				<div class="font-title inline-flex text-lg md:text-2xl">
					<span class="lowercase">graph</span>
					<span class="uppercase text-[#E535AB]">ACE</span>
				</div>
			</a>
			<FuzzySearch
				label={$LL.graphence.components.search.label()}
				placeholder={$LL.graphence.components.search.label()}
				data={searchIndex}
				limit={8}
				on:focus={removeScrollPaddingFromNavbar}
				on:blur={addScrollPaddingToNavbar}
				on:select={onSelect}
				slot="search"
			/>
			<ThemeSelect slot="option1" />
			<LocaleSelect
				locales={{
					en: { name: 'English', flag: 'twemoji:flag-united-kingdom' },
					zh: { name: '简体中文', flag: 'twemoji:flag-china' }
				}}
				slot="option2"
			/>
			<UserMenu slot="option3" />
		</NavBar>
		<main class="flex-1 max-w-[100vw] px-2 py-2 lg:max-w-[calc(100vw-20rem)]">
			<div class="flex justify-between items-center">
				<Breadcrumbs>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								init(`/${$locale}`);
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
									to(page.url);
								}}
							>
								{#if page.type === PageType.CREATE}
									{$LL.graphence.path.create({ name: page.name })}
								{:else if page.type === PageType.SELECT}
									{$LL.graphence.path.select({ name: page.name })}
								{:else}
									{page.name}
								{/if}
							</a>
						</li>
					{/each}
				</Breadcrumbs>
				<ModuleMenu />
			</div>
			<slot />
			<MessageBoxs />
			<Notifications />
		</main>
	</div>
	<div
		class="drawer-side z-40 lg:hidden"
		style="scroll-behavior: smooth; scroll-padding-top: {navbarScrollPadding};"
		bind:this={drawersidebar}
		on:scroll={parseSidebarScroll}
	>
		<label for="drawer" class="drawer-overlay" aria-label="Close menu" />
		<aside class="bg-base-100 w-80">
			<SideBar {drawerSidebarScrollY}>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						init(`/${$locale}`);
					}}
					aria-current="page"
					aria-label={$LL.graphence.path.home()}
					class="flex-0 btn btn-ghost px-2"
					slot="logo"
				>
					<Iconify class="h-6 w-6 md:h-8 md:w-8" icon="logos:graphql" />
					<div class="font-title inline-flex text-lg md:text-2xl">
						<span class="lowercase">graph</span>
						<span class="uppercase text-[#E535AB]">ACE</span>
					</div>
				</a>
				<FuzzySearch
					label={$LL.graphence.components.search.label()}
					placeholder={$LL.graphence.components.search.label()}
					data={searchIndex}
					limit={8}
					on:select={onSelect}
					on:focus={openDrawer}
					slot="search"
				/>
				<SideBarMenu slot="items" />
			</SideBar>
			<div
				class="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 [mask-image:linear-gradient(transparent,#000000)]"
			/>
		</aside>
	</div>
</div>

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
