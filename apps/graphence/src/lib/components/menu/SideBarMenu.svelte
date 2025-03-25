<script lang="ts" context="module">
	export type MenuInfo = {
		name: string;
		tags?: string | undefined;
		href?: string | undefined;
		icon?: string | undefined;
		authPermissions?: string[] | undefined;
		menus?: MenuInfo[] | undefined;
	};
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { page } from '$app/stores';
	import Iconify from '@iconify/svelte';
	import type { PermissionsStore } from '@graphace/commons';
	import { init, Menu, MenuTitle } from '@graphace/ui';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';
	import pages from '~/lib/data/pages.json';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');
	const menus = pages as MenuInfo[];
</script>

<Menu class="menu-sm md:menu-md w-80 px-4 py-0">
	{#each menus as menu}
		{#if menu.menus && menu.menus.some((menu) => permissions.auth(...(menu.authPermissions || [])))}
			<li>
				<MenuTitle class="flex flex-row gap-2">
					{#if menu.icon}
						<span class="text-base-content">
							<Iconify class="w-5 h-5" icon={menu.icon} />
						</span>
					{/if}
					<span>{$LL.graphence.components.sideBarMenu[menu.name]()}</span>
				</MenuTitle>
				<ul>
					{#each menu.menus as subMenu}
						{#if permissions.auth(...(subMenu.authPermissions || []))}
							<li>
								<a
									href={null}
									on:click|preventDefault={(e) => {
										init(`/${$locale}${subMenu.href}`, $LL.graphql.objects[subMenu.name].name());
									}}
									class={$page.url.pathname === `/${$locale}${subMenu.href}` ||
									$page.url.pathname.startsWith(`/${$locale}${subMenu.href}/`)
										? 'active'
										: ''}
								>
									{#if subMenu.icon}
										<Iconify class="w-5 h-5" icon={subMenu.icon} />
									{/if}
									<span>{$LL.graphql.objects[subMenu.name].name()}</span>
								</a>
							</li>
						{/if}
					{/each}
				</ul>
			</li>
		{:else if permissions.auth(...(menu.authPermissions || []))}
			<li>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						init(`/${$locale}${menu.href}`, $LL.graphql.objects[menu.name].name());
					}}
					class={$page.url.pathname === `/${$locale}${menu.href}` ||
					$page.url.pathname.startsWith(`/${$locale}${menu.href}/`)
						? 'active'
						: ''}
				>
					{#if menu.icon}
						<Iconify class="w-5 h-5" icon={menu.icon} />
					{/if}
					<span>{$LL.graphql.objects[menu.name].name()}</span>
				</a>
			</li>
		{/if}
	{/each}
</Menu>
