<script lang="ts">
	import { init } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import Iconify from '@iconify/svelte';
	import LL from '$i18n/i18n-svelte';
	import type { NamespaceGraphqlTranslation } from '$i18n/i18n-types';
	import { locale } from '~/i18n/i18n-svelte';
	import pages from '~/lib/data/pages.json';
	import { permissions } from '~/lib/utils/auth-util';

	const menus = pages.map((page) => {
		return {
			...page,
			items: page.items.map((item) => {
				return {
					...item,
					objectKey: item.name as keyof NamespaceGraphqlTranslation['objects']
				};
			})
		};
	});
</script>

{#each menus as { name, icon, items }}
	{#if items && items.length > 0}
		<li class="menu-title flex flex-row gap-4">
			<span class="text-base-content"><Iconify class="w-5 h-5" {icon} /></span>
			<span>{name}</span>
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
{/each}
