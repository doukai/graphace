<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { page } from '$app/stores';
	import Iconify from '@iconify/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { EllipsisVertical } from '@steeze-ui/heroicons';
	import { init, zIndex } from '@graphace/ui';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	const zIndex6 = zIndex.top(6);

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

{#if $page.url.pathname.split('/').length === 3 || $page.url.pathname.split('/')[3] === 'chart'}
	<div class="dropdown dropdown-end">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<div class="tooltip tooltip-bottom" data-tip={$LL.ui.menu.more()}>
			<label tabindex="0" class="btn btn-sm btn-square">
				<Icon src={EllipsisVertical} class="h-5 w-5 stroke-current" />
			</label>
		</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			tabindex="0"
			class="dropdown-content z-[{zIndex6}] menu p-2 shadow bg-base-100 rounded-box w-52"
		>
			<li>
				<h2 class="menu-title flex flex-row gap-2">
					<span class="text-base-content">
						<Iconify class="w-5 h-5" icon="material-symbols:bar-chart" />
					</span>
					<span>{$LL.graphence.components.sideBarMenu.statistics()}</span>
				</h2>
				<ul>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								zIndex.reset();
								init(
									new URL('./chart/bar', window.location.href + '/'),
									$LL.graphence.components.sideBarMenu.bar()
								);
							}}
							class={$page.url.pathname.endsWith('/chart/bar') ? 'active' : ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:bar-chart" />
							<span>{$LL.graphence.components.sideBarMenu.bar()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								zIndex.reset();
								init(
									new URL('./chart/line', window.location.href + '/'),
									$LL.graphence.components.sideBarMenu.line()
								);
							}}
							class={$page.url.pathname.endsWith('/chart/line') ? 'active' : ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:show-chart" />
							<span>{$LL.graphence.components.sideBarMenu.line()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								zIndex.reset();
								init(
									new URL('./chart/pie', window.location.href + '/'),
									$LL.graphence.components.sideBarMenu.pie()
								);
							}}
							class={$page.url.pathname.endsWith('/chart/pie') ? 'active' : ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:pie-chart-outline" />
							<span>{$LL.graphence.components.sideBarMenu.pie()}</span>
						</a>
					</li>
				</ul>
			</li>
			<li>
				<h2 class="menu-title flex flex-row gap-2">
					<span class="text-base-content">
						<Iconify class="w-5 h-5" icon="material-symbols:grid-on-sharp" />
					</span>
					<span>{$LL.graphence.components.sideBarMenu.grid()}</span>
				</h2>
				<ul>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								zIndex.reset();
								init(
									new URL('./grid/agg', window.location.href + '/'),
									$LL.graphence.components.sideBarMenu.statistics()
								);
								init('grid/agg', $LL.graphence.components.sideBarMenu.statistics());
							}}
							class={$page.url.pathname.endsWith('/grid/agg') ? 'active' : ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:table-eye-sharp" />
							<span>{$LL.graphence.components.sideBarMenu.statistics()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								zIndex.reset();
								init(
									new URL('./grid/mutation', window.location.href + '/'),
									$LL.graphence.components.sideBarMenu.mutation()
								);
							}}
							class={$page.url.pathname.endsWith('/grid/mutation') ? 'active' : ''}
						>
							<Iconify class="w-5 h-5" icon="material-symbols:table-edit-sharp" />
							<span>{$LL.graphence.components.sideBarMenu.mutation()}</span>
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
{/if}
