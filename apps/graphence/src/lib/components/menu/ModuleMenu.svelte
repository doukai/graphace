<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { EllipsisVertical } from '@steeze-ui/heroicons';
	import { init, zIndex } from '@graphace/ui';
	import MaterialSymbols from '../icons/MaterialSymbols.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	const zIndex6 = zIndex.top(6);

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	$: pathSize = $page.url.pathname.split('/').length;
	$: pathName = $page.url.pathname.split('/')[3];
</script>

{#if pathSize === 3 || pathName === 'chart' || pathName === 'grid'}
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
						<MaterialSymbols icon="bar-chart" />
					</span>
					<span>{$LL.graphence.components.sideBarMenu.statistics()}</span>
				</h2>
				<ul>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								zIndex.reset();
								if (pathSize === 3) {
									init(
										new URL('./chart/bar', window.location.href + '/'),
										$LL.graphence.components.sideBarMenu.bar()
									);
								} else {
									init('../chart/bar', $LL.graphence.components.sideBarMenu.bar());
								}
							}}
							class={$page.url.pathname.endsWith('/chart/bar') ? 'active' : ''}
						>
							<MaterialSymbols icon="bar-chart" />
							<span>{$LL.graphence.components.sideBarMenu.bar()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								zIndex.reset();
								if (pathSize === 3) {
									init(
										new URL('./chart/line', window.location.href + '/'),
										$LL.graphence.components.sideBarMenu.line()
									);
								} else {
									init('../chart/line', $LL.graphence.components.sideBarMenu.line());
								}
							}}
							class={$page.url.pathname.endsWith('/chart/line') ? 'active' : ''}
						>
							<MaterialSymbols icon="bar-chart" />
							<span>{$LL.graphence.components.sideBarMenu.line()}</span>
						</a>
					</li>
					<li>
						<a
							href={null}
							on:click|preventDefault={(e) => {
								zIndex.reset();
								if (pathSize === 3) {
									init(
										new URL('./chart/pie', window.location.href + '/'),
										$LL.graphence.components.sideBarMenu.pie()
									);
								} else {
									init('../chart/pie', $LL.graphence.components.sideBarMenu.pie());
								}
							}}
							class={$page.url.pathname.endsWith('/chart/pie') ? 'active' : ''}
						>
							<MaterialSymbols icon="show-chart" />
							<span>{$LL.graphence.components.sideBarMenu.pie()}</span>
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
{/if}
