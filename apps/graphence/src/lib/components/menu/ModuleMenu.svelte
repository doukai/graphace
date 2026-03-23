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
</script>

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
					<MaterialSymbols icon="sync" />
				</span>
				<span>{$LL.graphence.components.moduleMenu.sync()}</span>
			</h2>
			<ul>
				<slot />
			</ul>
		</li>
	</ul>
</div>
