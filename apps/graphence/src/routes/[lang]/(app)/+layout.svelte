<script lang="ts">
	import '../../../app.css';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
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
		LocaleDropdown,
		tItems,
		Typeahead
	} from '@graphace/ui';
	import { SideBarMenu, ModuleMenu, UserMenu } from '~/lib/components/menu';
	import Flag from '~/lib/components/icons/Flag.svelte';
	import pages from '~/lib/data/pages.json';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { NamespaceGraphqlTranslation } from '$i18n/i18n-types';

	setContext('LL', LL);
	setContext('theme', writable(undefined));
	setContext('ui.card', 'bg-base-100 shadow-xl');
	setContext('ui.card-body', 'w-full md:max-h-[calc(100vh-8rem)] max-sm:p-3');
	setContext('ui.dropdown-content', 'bg-base-200 text-base-content rounded-box shadow-xl');
	setContext('ui.popover-content', 'bg-base-200 rounded-box shadow-xl');
	setContext('ui.table', 'table-zebra');
	setContext('ui.tab', 'tab-bordered');
	setContext('ui.drawer', 'gap-1');

	let open = false;

	$: tItems.add(
		pages
			.flatMap((page) => page.menus || [page])
			.map((page) => ({
				name: $LL.graphql.objects[page.name as keyof NamespaceGraphqlTranslation['objects']].name(),
				data: page,
				onSelect: (data: any) => {
					init(
						'/' + $locale + data.href,
						$LL.graphql.objects[data.name as keyof NamespaceGraphqlTranslation['objects']].name()
					);
					open = false;
				}
			}))
	);
</script>

<Drawer bind:open let:id class="lg:drawer-open overflow-hidden">
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
					<svg
						class="h-6 w-6 md:h-8 md:w-8"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 256 288"
					>
						<path
							fill="#e535ab"
							fill-rule="evenodd"
							d="m152.576 32.963l59.146 34.15a25.8 25.8 0 0 1 5.818-4.604c12.266-7.052 27.912-2.865 35.037 9.402c7.052 12.267 2.865 27.912-9.402 35.037a25.7 25.7 0 0 1-6.831 2.72v68.325a25.7 25.7 0 0 1 6.758 2.702c12.34 7.125 16.527 22.771 9.402 35.038c-7.052 12.266-22.771 16.453-35.038 9.402a25.5 25.5 0 0 1-6.34-5.147l-58.786 33.94a25.7 25.7 0 0 1 1.295 8.08c0 14.103-11.458 25.636-25.635 25.636s-25.635-11.46-25.635-25.636c0-2.52.362-4.954 1.037-7.253l-59.13-34.14a25.8 25.8 0 0 1-5.738 4.52c-12.34 7.051-27.986 2.864-35.038-9.402c-7.051-12.267-2.864-27.913 9.402-35.038a25.7 25.7 0 0 1 6.758-2.703v-68.324a25.7 25.7 0 0 1-6.831-2.72C.558 99.897-3.629 84.178 3.423 71.911s22.77-16.454 35.037-9.402a25.8 25.8 0 0 1 5.79 4.575l59.163-34.159a25.7 25.7 0 0 1-1.048-7.29C102.365 11.46 113.823 0 128 0s25.635 11.459 25.635 25.635c0 2.548-.37 5.007-1.059 7.328m-6.162 10.522l59.287 34.23a25.6 25.6 0 0 0 2.437 19.831c3.609 6.278 9.488 10.44 16.013 12.062v68.41q-.5.122-.993.264L145.725 44.17q.351-.336.689-.684m-36.123.7l-77.432 134.11a26 26 0 0 0-1.01-.27v-68.417c6.525-1.622 12.404-5.784 16.013-12.062a25.6 25.6 0 0 0 2.427-19.869l59.27-34.22q.359.371.732.727m24.872 6.075l77.414 134.08a25.5 25.5 0 0 0-4.513 5.757a25.7 25.7 0 0 0-2.702 6.758H50.64a25.7 25.7 0 0 0-2.704-6.758a25.8 25.8 0 0 0-4.506-5.724l77.429-134.107A25.7 25.7 0 0 0 128 51.27c2.487 0 4.89-.352 7.163-1.01m11.795 194.478l58.902-34.008a26 26 0 0 1-.473-1.682H50.607q-.123.499-.266.992l59.19 34.175A25.56 25.56 0 0 1 128 236.373a25.56 25.56 0 0 1 18.958 8.365"
						/>
					</svg>
					<div class="font-title inline-flex text-lg md:text-2xl">
						<span class="lowercase">graph</span>
						<span class="uppercase text-[#E535AB]">ACE</span>
					</div>
				</a>
				<Typeahead placeholder={$LL.graphence.components.search.label()} class="max-lg:hidden" />
			</NavBarStart>
			<NavBarEnd class="flex items-center space-x-1">
				<ThemeDropdown zIndex={$zIndex + 1} />
				<LocaleDropdown zIndex={$zIndex + 1} let:currentLocale let:switchLocale>
					<li>
						<button class:active={currentLocale === 'en'} on:click={(e) => switchLocale('en')}>
							<Flag icon="gb-4x3" />
							English
						</button>
					</li>
					<li>
						<button class:active={currentLocale === 'zh'} on:click={(e) => switchLocale('zh')}>
							<Flag icon="cn-4x3" />
							简体中文
						</button>
					</li>
				</LocaleDropdown>
				<UserMenu zIndex={$zIndex + 1} />
			</NavBarEnd>
		</NavBar>
		<main class="max-w-[100vw] lg:max-w-[calc(100vw-20rem)] p-1 md:p-2">
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
					{#each $history.filter((history) => history.url.pathname !== `/${$locale}`) as page}
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
				class="bg-base-100 sticky top-0 items-center gap-2 px-4 py-2 backdrop-blur z-[{$zIndex +
					2}]"
			>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						init(`/${$locale}`);
					}}
					aria-current="page"
					aria-label={$LL.graphence.path.home()}
					class="flex-0 btn btn-ghost px-2 max-lg:hidden"
				>
					<svg
						class="h-6 w-6 md:h-8 md:w-8"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 256 288"
					>
						<path
							fill="#e535ab"
							fill-rule="evenodd"
							d="m152.576 32.963l59.146 34.15a25.8 25.8 0 0 1 5.818-4.604c12.266-7.052 27.912-2.865 35.037 9.402c7.052 12.267 2.865 27.912-9.402 35.037a25.7 25.7 0 0 1-6.831 2.72v68.325a25.7 25.7 0 0 1 6.758 2.702c12.34 7.125 16.527 22.771 9.402 35.038c-7.052 12.266-22.771 16.453-35.038 9.402a25.5 25.5 0 0 1-6.34-5.147l-58.786 33.94a25.7 25.7 0 0 1 1.295 8.08c0 14.103-11.458 25.636-25.635 25.636s-25.635-11.46-25.635-25.636c0-2.52.362-4.954 1.037-7.253l-59.13-34.14a25.8 25.8 0 0 1-5.738 4.52c-12.34 7.051-27.986 2.864-35.038-9.402c-7.051-12.267-2.864-27.913 9.402-35.038a25.7 25.7 0 0 1 6.758-2.703v-68.324a25.7 25.7 0 0 1-6.831-2.72C.558 99.897-3.629 84.178 3.423 71.911s22.77-16.454 35.037-9.402a25.8 25.8 0 0 1 5.79 4.575l59.163-34.159a25.7 25.7 0 0 1-1.048-7.29C102.365 11.46 113.823 0 128 0s25.635 11.459 25.635 25.635c0 2.548-.37 5.007-1.059 7.328m-6.162 10.522l59.287 34.23a25.6 25.6 0 0 0 2.437 19.831c3.609 6.278 9.488 10.44 16.013 12.062v68.41q-.5.122-.993.264L145.725 44.17q.351-.336.689-.684m-36.123.7l-77.432 134.11a26 26 0 0 0-1.01-.27v-68.417c6.525-1.622 12.404-5.784 16.013-12.062a25.6 25.6 0 0 0 2.427-19.869l59.27-34.22q.359.371.732.727m24.872 6.075l77.414 134.08a25.5 25.5 0 0 0-4.513 5.757a25.7 25.7 0 0 0-2.702 6.758H50.64a25.7 25.7 0 0 0-2.704-6.758a25.8 25.8 0 0 0-4.506-5.724l77.429-134.107A25.7 25.7 0 0 0 128 51.27c2.487 0 4.89-.352 7.163-1.01m11.795 194.478l58.902-34.008a26 26 0 0 1-.473-1.682H50.607q-.123.499-.266.992l59.19 34.175A25.56 25.56 0 0 1 128 236.373a25.56 25.56 0 0 1 18.958 8.365"
						/>
					</svg>
					<div class="font-title inline-flex text-lg md:text-2xl">
						<span class="lowercase">graph</span>
						<span class="uppercase text-[#E535AB]">ACE</span>
					</div>
				</a>
				<Typeahead placeholder={$LL.graphence.components.search.label()} class="w-full lg:hidden" />
			</div>
			<SideBarMenu />
		</div>
	</DrawerSide>
</Drawer>
