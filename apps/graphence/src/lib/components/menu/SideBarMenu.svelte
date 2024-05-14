<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { PermissionsStore } from '@graphace/commons';
	import { init } from '@graphace/ui';
	import { page } from '$app/stores';
	import Iconify from '@iconify/svelte';
	import type {
		NamespaceGraphqlTranslation,
		NamespaceGraphenceTranslation,
		TranslationFunctions
	} from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';
	import pages from '~/lib/data/pages.json';

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;

	const menus = pages.map((page) => {
		return {
			...page,
			name: page.name as keyof NamespaceGraphenceTranslation['components']['sideBarMenu'],
			items: page.items.map((item) => {
				return {
					...item,
					objectKey: item.name as keyof NamespaceGraphqlTranslation['objects']
				};
			})
		};
	});
</script>

{#each menus as { name, icon, items }, i}
	{#if items && items.length > 0}
		<li class="menu-title flex flex-row gap-4">
			<span class="text-base-content"><Iconify class="w-5 h-5" {icon} /></span>
			<span>{$LL.graphence.components.sideBarMenu[name]()}</span>
		</li>
		{#each items as { href, objectKey, authPermissions }}
			{#if permissions.auth(...authPermissions)}
				<li>
					<a
						href={null}
						on:click|preventDefault={(e) => {
							init(`/${$locale}${href}`);
						}}
						class={$page.url.pathname === `/${$locale}${href}` ||
						$page.url.pathname.startsWith(`/${$locale}${href}/`)
							? 'active'
							: ''}
					>
						<span>{$LL.graphql.objects[objectKey].name()}</span>
					</a>
				</li>
			{/if}
		{/each}
	{/if}
	{#if i < menus.length - 1}
		<div class="divider" />
	{/if}
{/each}
