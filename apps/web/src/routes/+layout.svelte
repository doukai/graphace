<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import SideBar from '@graphace/ui/components/SideBar.svelte';
	import ObjectsMenu from '~/lib/components/menu/ObjectsMenu.svelte';
	import { NavBar, NavBarStart, NavBarCenter, NavBarEnd } from '@graphace/ui/components/navbar';
	import Notifications from '@graphace/ui/components/Notifications.svelte';
	import MessageBoxs from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bars4, AdjustmentsVertical } from '@steeze-ui/heroicons';
	import { LocaleSelect, ThemeSelect } from '~/lib/components/select';
	import { Search } from '~/lib/components/input';
	import { setLocale } from '~/i18n/i18n-svelte';
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
			<Search {addScrollPaddingToNavbar} {removeScrollPaddingFromNavbar} slot="search" />
			<ThemeSelect slot="option1" />
			<LocaleSelect slot="option2" />
		</NavBar>
		<main
			class="flex-1 max-w-[100vw] lg:max-w-[calc(100vw-20rem)] lg:px-6 lg:pt-6 lg:pb-16 px-2 py-2"
		>
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
				<Search on:search={closeDrawer} on:focus={openDrawer} slot="search" />
				<ObjectsMenu slot="items" />
			</SideBar>
			<div
				class="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 [mask-image:linear-gradient(transparent,#000000)]"
			/>
		</aside>
	</div>
</div>

<!-- <div class="drawer">
	<input id="left-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="drawer drawer-end">
			<input id="right-drawer" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				<div
					class={isMenuOpen ? 'hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0' : 'hidden'}
				>
					<SideBar>
						<ObjectsMenu />
					</SideBar>
				</div>
				<div class={isMenuOpen ? 'md:pl-64 flex flex-col' : 'flex flex-col'}>
					<NavBar>
						<NavBarStart>
							<button
								class="hidden md:btn md:btn-square md:btn-ghost"
								on:click={(e) => (isMenuOpen = !isMenuOpen)}
							>
								<Icon src={Bars4} solid class="h-6 w-6" />
							</button>
							<label for="left-drawer" class="btn btn-square btn-ghost drawer-button md:hidden">
								<Icon src={Bars4} solid class="h-6 w-6" />
							</label>
						</NavBarStart>
						<NavBarCenter />
						<NavBarEnd>
							<LocaleSelect />
							<label for="right-drawer" class="ml-1 btn btn-square btn-ghost drawer-button">
								<Icon src={AdjustmentsVertical} solid class="h-6 w-6" />
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
			<ObjectsMenu />
		</ul>
	</div>
</div> -->

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
		@apply inline-block p-1 rounded-lg shadow-sm bg-base-200;
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
