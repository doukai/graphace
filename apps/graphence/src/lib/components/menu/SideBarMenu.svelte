<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { PermissionsStore } from '@graphace/commons';
	import { init } from '@graphace/ui';
	import { page } from '$app/stores';
	import Iconify from '@iconify/svelte';
	import type { NamespaceGraphqlTranslation, TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';
	import pages from '~/lib/data/pages.json';

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;

	const menus = pages.map((page) => {
		return {
			...page,
			name: page.name as keyof NamespaceGraphqlTranslation['objects']
		};
	});
</script>

<li class="menu-title flex flex-row gap-4">
	<span class="text-base-content">
		<Iconify class="w-5 h-5" icon="material-symbols:view-module" />
	</span>
	<span>{$LL.graphence.components.sideBarMenu.modules()}</span>
</li>
{#each menus as { href, name, authPermissions, icon }}
	{#if permissions.auth(...(authPermissions || []))}
		<li>
			<a
				href={null}
				on:click|preventDefault={(e) => {
					init(`/${$locale}${href}`);
				}}
				class={$page.url.pathname === `/${$locale}${href}` ||
				($page.url.pathname.startsWith(`/${$locale}${href}/`) &&
					!$page.url.pathname.startsWith(`/${$locale}${href}/agg`) &&
					!$page.url.pathname.startsWith(`/${$locale}${href}/grid`))
					? 'active'
					: ''}
			>
				{#if icon}
					<Iconify class="w-5 h-5" {icon} />
				{/if}
				<span>{$LL.graphql.objects[name].name()}</span>
			</a>
		</li>
	{/if}
{/each}
