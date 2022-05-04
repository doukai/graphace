<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PlusSm, MinusSm } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let name: string;
	export let value: string[];
	export let placeholder: string = '';
	export let className: string = '';

	if (!value) {
		value = [];
	}

	const addItem = (index: number) => {
		if (!value) {
			value = [];
		}
		value = [...value.slice(0, index + 1), null, ...value.slice(index + 1)];
	};

	const removeItem = (index: number) => {
		value = [...value.slice(0, index), ...value.slice(index + 1)];
	};
</script>

<div class="space-y-5">
	{#each value as item, index}
		<div class="flex space-x-1">
			<input
				type="text"
				{name}
				{placeholder}
				class="input input-bordered {className}"
				bind:value={item}
			/>
			<div class="tooltip" data-tip={$LL.components.ui.inputList.add()}>
				<button
					class="mt-3 btn btn-xs btn-square btn-outline"
					on:click={(e) => {
						e.preventDefault();
						addItem(index);
					}}
				>
					<Icon src={PlusSm} solid class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.components.ui.inputList.remove()}>
				<button
					class="mt-3 btn btn-xs btn-square btn-outline"
					on:click={(e) => {
						e.preventDefault();
						removeItem(index);
					}}
				>
					<Icon src={MinusSm} solid class="h-5 w-5" />
				</button>
			</div>
		</div>
	{/each}
</div>
{#if value.length === 0}
	<div class="tooltip" data-tip={$LL.components.ui.inputList.add()}>
		<button
			class="btn btn-square btn-outline"
			on:click={(e) => {
				e.preventDefault();
				addItem(0);
			}}
		>
			<Icon src={Plus} solid class="h-5 w-5" />
		</button>
	</div>
{/if}
