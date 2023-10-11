<script lang="ts">
	import '../../../app.css';
	import { onMount } from 'svelte';
	import { to, PageType, init, history } from '~/lib/stores/useNavigate';
	import { SideBar, Breadcrumbs } from '@graphace/ui/components';
	import ObjectsMenu from '~/lib/components/menu/ObjectsMenu.svelte';
	import UserMenu from '~/lib/components/menu/UserMenu.svelte';
	import { NavBar } from '@graphace/ui/components/navbar';
	import Notifications from '@graphace/ui/components/Notifications.svelte';
	import MessageBoxs from '@graphace/ui/components/MessageBoxs.svelte';
	import Iconify from '@iconify/svelte';
	import { LocaleSelect, ThemeSelect } from '~/lib/components/select';
	import { Search } from '~/lib/components/input';
	import { setLocale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale);

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
				aria-label={$LL.web.path.home()}
				class="flex-0 btn btn-ghost gap-1 px-2 md:gap-2"
				slot="logo"
			>
				<Iconify class="h-6 w-6 md:h-8 md:w-8" icon="logos:graphql" />
				<div class="font-title inline-flex text-lg md:text-2xl">
					<span class="lowercase">graph</span>
					<span class="uppercase text-[#E535AB]">ACE</span>
				</div>
			</a>
			<Search {addScrollPaddingToNavbar} {removeScrollPaddingFromNavbar} slot="search" />
			<ThemeSelect slot="option1" />
			<LocaleSelect slot="option2" />
			<UserMenu slot="option3" />
		</NavBar>
		<main class="flex-1 max-w-[100vw] px-2 py-2 lg:max-w-[calc(100vw-20rem)]">
			<Breadcrumbs>
				<li>
					<a
						href={null}
						on:click|preventDefault={(e) => {
							init(`/${$locale}`);
						}}
					>
						<span>{$LL.web.path.home()}</span>
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
								{$LL.web.path.create({ name: page.name })}
							{:else if page.type === PageType.SELECT}
								{$LL.web.path.select({ name: page.name })}
							{:else}
								{page.name}
							{/if}
						</a>
					</li>
				{/each}
			</Breadcrumbs>
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
					aria-label={$LL.web.path.home()}
					class="flex-0 btn btn-ghost px-2"
					slot="logo"
				>
					<Iconify class="h-6 w-6 md:h-8 md:w-8" icon="logos:graphql" />
					<div class="font-title inline-flex text-lg md:text-2xl">
						<span class="lowercase">graph</span>
						<span class="uppercase text-[#E535AB]">ACE</span>
					</div>
				</a>
				<Search on:search={closeDrawer} on:focus={openDrawer} slot="search" />
				<ObjectsMenu slot="items" />
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
	.tippy-box[data-theme='daisy'] {
		@apply inline-block p-1 rounded-lg shadow-lg bg-base-200;
	}
	.tippy-box[data-theme~='daisy'][data-placement^='top'] > .tippy-arrow {
		@apply -bottom-1.5 left-0 border-t-8 border-x-8 border-b-0 border-transparent border-t-base-200;
	}
	.tippy-box[data-theme~='daisy'][data-placement^='bottom'] > .tippy-arrow {
		@apply -top-1.5 left-0 border-t-0 border-x-8 border-b-8 border-transparent border-b-base-200;
	}
	.tippy-box[data-theme~='daisy'][data-placement^='left'] > .tippy-arrow {
		@apply -right-1.5 border-l-8 border-y-8 border-r-0 border-transparent border-l-base-200;
	}
	.tippy-box[data-theme~='daisy'][data-placement^='right'] > .tippy-arrow {
		@apply -left-1.5 border-l-0 border-y-8 border-r-8 border-transparent border-r-base-200;
	}
</style>
