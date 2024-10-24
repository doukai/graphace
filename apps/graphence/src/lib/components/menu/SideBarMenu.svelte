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
<li />
<li class="menu-title flex flex-row gap-4">
	<span class="text-base-content">
		<Iconify class="w-5 h-5" icon="material-symbols:bar-chart" />
	</span>
	<span>{$LL.graphence.components.sideBarMenu.statistics()}</span>
</li>
{#each menus as { href, name, authPermissions, icon }}
	{#if permissions.auth(...(authPermissions || []))}
		<li>
			<details>
				<summary>{$LL.graphql.objects[name].name()}</summary>
				<ul>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								init(`/${$locale}${href}/agg/table`);
							}}
							class={$page.url.pathname === `/${$locale}${href}/agg/table` ||
							$page.url.pathname.startsWith(`/${$locale}${href}/agg/table/`)
								? 'active'
								: ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:table-chart-outline" />
							<span>{$LL.graphence.components.sideBarMenu.table()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								init(`/${$locale}${href}/agg/bar`);
							}}
							class={$page.url.pathname === `/${$locale}${href}/agg/bar` ||
							$page.url.pathname.startsWith(`/${$locale}${href}/agg/bar/`)
								? 'active'
								: ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:bar-chart" />
							<span>{$LL.graphence.components.sideBarMenu.bar()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								init(`/${$locale}${href}/agg/line`);
							}}
							class={$page.url.pathname === `/${$locale}${href}/agg/line` ||
							$page.url.pathname.startsWith(`/${$locale}${href}/agg/line/`)
								? 'active'
								: ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:show-chart" />
							<span>{$LL.graphence.components.sideBarMenu.line()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								init(`/${$locale}${href}/agg/pie`);
							}}
							class={$page.url.pathname === `/${$locale}${href}/agg/pie` ||
							$page.url.pathname.startsWith(`/${$locale}${href}/agg/pie/`)
								? 'active'
								: ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:pie-chart-outline" />
							<span>{$LL.graphence.components.sideBarMenu.pie()}</span>
						</a>
					</li>
				</ul>
			</details>
		</li>
	{/if}
{/each}
<li />
<li class="menu-title flex flex-row gap-4">
	<span class="text-base-content">
		<Iconify class="w-5 h-5" icon="material-symbols:grid-on-sharp" />
	</span>
	<span>{$LL.graphence.components.sideBarMenu.grid()}</span>
</li>
{#each menus as { href, name, authPermissions, icon }}
	{#if permissions.auth(...(authPermissions || []))}
		<li>
			<details>
				<summary>{$LL.graphql.objects[name].name()}</summary>
				<ul>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								init(`/${$locale}${href}/grid/agg`);
							}}
							class={$page.url.pathname === `/${$locale}${href}/grid/agg` ||
							$page.url.pathname.startsWith(`/${$locale}${href}/grid/agg/`)
								? 'active'
								: ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:table-eye-sharp" />
							<span>{$LL.graphence.components.sideBarMenu.statistics()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								init(`/${$locale}${href}/grid/mutation`);
							}}
							class={$page.url.pathname === `/${$locale}${href}/grid/mutation` ||
							$page.url.pathname.startsWith(`/${$locale}${href}/grid/mutation/`)
								? 'active'
								: ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:table-edit-sharp" />
							<span>{$LL.graphence.components.sideBarMenu.mutation()}</span>
						</a>
					</li>
				</ul>
			</details>
		</li>
	{/if}
{/each}
