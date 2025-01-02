<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { init } from '@graphace/ui';
	import { page } from '$app/stores';
	import { EllipsisVertical } from '@steeze-ui/heroicons';
	import Iconify from '@iconify/svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';
	import { Icon } from '@steeze-ui/svelte-icon';

	const LL = getContext('LL') as Readable<TranslationFunctions>;

	function toAgg(aggPath: string) {
		let urlParts: string[] = $page.url.pathname.split('/');
		if (urlParts.length > 2) {
			init(`/${$locale}/${urlParts[2]}${aggPath}`);
		}
	}
</script>

{#if $page.url.pathname.split('/').length > 2}
	<div class="dropdown dropdown-end">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<div class="tooltip tooltip-bottom" data-tip={$LL.ui.menu.more()}>
			<label tabindex="0" class="btn btn-sm btn-square">
				<Icon src={EllipsisVertical} class="h-5 w-5 stroke-current" />
			</label>
		</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul tabindex="0" class="dropdown-content z-[60] menu p-2 shadow bg-base-100 rounded-box w-52">
			<li class="menu-title flex flex-row gap-4">
				<span class="text-base-content">
					<Iconify class="w-5 h-5" icon="material-symbols:bar-chart" />
				</span>
				<span>{$LL.graphence.components.sideBarMenu.statistics()}</span>
			</li>

			<li>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						toAgg(`/agg/table`);
					}}
					class={$page.url.pathname.endsWith(`/agg/table`) ? 'active' : ''}
				>
					<Iconify class="w-5 h-5" icon="material-symbols:table-chart-outline" />
					<span>{$LL.graphence.components.sideBarMenu.table()}</span>
				</a>
			</li>
			<li>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						toAgg(`/agg/bar`);
					}}
					class={$page.url.pathname.endsWith(`/agg/bar`) ? 'active' : ''}
				>
					<Iconify class="w-5 h-5" icon="material-symbols:bar-chart" />
					<span>{$LL.graphence.components.sideBarMenu.bar()}</span>
				</a>
			</li>
			<li>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						toAgg(`/agg/line`);
					}}
					class={$page.url.pathname.endsWith(`/agg/line`) ? 'active' : ''}
				>
					<Iconify class="w-5 h-5" icon="material-symbols:show-chart" />
					<span>{$LL.graphence.components.sideBarMenu.line()}</span>
				</a>
			</li>
			<li>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						toAgg(`/agg/pie`);
					}}
					class={$page.url.pathname.endsWith(`/agg/pie`) ? 'active' : ''}
				>
					<Iconify class="w-5 h-5" icon="material-symbols:pie-chart-outline" />
					<span>{$LL.graphence.components.sideBarMenu.pie()}</span>
				</a>
			</li>
			<li />
			<li class="menu-title flex flex-row gap-4">
				<span class="text-base-content">
					<Iconify class="w-5 h-5" icon="material-symbols:grid-on-sharp" />
				</span>
				<span>{$LL.graphence.components.sideBarMenu.grid()}</span>
			</li>

			<li>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						toAgg(`/grid/agg`);
					}}
					class={$page.url.pathname.endsWith(`/grid/agg`) ? 'active' : ''}
				>
					<Iconify class="w-5 h-5" icon="material-symbols:table-eye-sharp" />
					<span>{$LL.graphence.components.sideBarMenu.statistics()}</span>
				</a>
			</li>
			<li>
				<a
					href={null}
					on:click|preventDefault={(e) => {
						toAgg(`/grid/mutation`);
					}}
					class={$page.url.pathname.endsWith(`/grid/mutation`) ? 'active' : ''}
				>
					<Iconify class="w-5 h-5" icon="material-symbols:table-edit-sharp" />
					<span>{$LL.graphence.components.sideBarMenu.mutation()}</span>
				</a>
			</li>
		</ul>
	</div>
{/if}
