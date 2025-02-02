<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { PermissionsStore } from '@graphace/commons';
	import { init } from '@graphace/ui';
	import { page } from '$app/stores';
	import Iconify from '@iconify/svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';
	import pages from '~/lib/data/pages.json';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');
</script>

{#each pages as menu}
	{#if menu.menus && menu.menus.some((menu) => permissions.auth(...(menu.authPermissions || [])))}
		<li>
			<h2 class="menu-title flex flex-row gap-2">
				{#if menu.icon}
					<span class="text-base-content">
						<Iconify class="w-5 h-5" icon={menu.icon} />
					</span>
				{/if}
				<span>{$LL.graphence.components.sideBarMenu[menu.name]()}</span>
			</h2>
			<ul>
				{#each menu.menus as menu}
					{#if permissions.auth(...(menu.authPermissions || []))}
						<li>
							<a
								href={null}
								on:click|preventDefault={(e) => {
									init(`/${$locale}${menu.href}`);
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
			</ul>
		</li>
	{:else if !menu.menus && permissions.auth(...(menu.authPermissions || []))}
		<li>
			<a
				href={null}
				on:click|preventDefault={(e) => {
					init(`/${$locale}${menu.href}`);
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
