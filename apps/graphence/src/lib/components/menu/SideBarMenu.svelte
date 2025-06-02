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
	import type { PermissionsStore } from '@graphace/commons';
	import { init, zIndex, Menu, MenuTitle } from '@graphace/ui';
	import MaterialSymbols from '../icons/MaterialSymbols.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';
	import pages from '~/lib/data/pages.json';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');
	const menus = pages as MenuInfo[];
</script>

<aside class="bg-base-100 w-80">
	<Menu class="menu-sm md:menu-md">
		{#each menus as menu}
			{#if menu.menus && menu.menus.some( (menu) => permissions.auth(...(menu.authPermissions || [])) )}
				<li>
					<MenuTitle class="flex flex-row gap-2">
						{#if menu.icon}
							<span class="text-base-content">
								<MaterialSymbols icon={menu.icon} />
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
											zIndex.reset();
											init(`/${$locale}${subMenu.href}`, $LL.graphql.objects[subMenu.name].name());
										}}
										class={$page.url.pathname === `/${$locale}${subMenu.href}` ||
										$page.url.pathname.startsWith(`/${$locale}${subMenu.href}/`)
											? 'active'
											: ''}
									>
										{#if subMenu.icon}
											<MaterialSymbols icon={subMenu.icon} />
										{/if}
										<span>{$LL.graphql.objects[subMenu.name].name()}</span>
									</a>
								</li>
							{/if}
						{/each}
					</ul>
				</li>
			{:else if !menu.menus && permissions.auth(...(menu.authPermissions || []))}
				<li>
					<a
						href={null}
						on:click|preventDefault={(e) => {
							zIndex.reset();
							init(`/${$locale}${menu.href}`, $LL.graphql.objects[menu.name].name());
						}}
						class={$page.url.pathname === `/${$locale}${menu.href}` ||
						$page.url.pathname.startsWith(`/${$locale}${menu.href}/`)
							? 'active'
							: ''}
					>
						{#if menu.icon}
							<MaterialSymbols icon={menu.icon} />
						{/if}
						<span>{$LL.graphql.objects[menu.name].name()}</span>
					</a>
				</li>
			{/if}
		{/each}
	</Menu>
</aside>
