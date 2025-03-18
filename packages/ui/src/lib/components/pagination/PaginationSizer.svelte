<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let pageSizeOptions: number[] = [10, 20, 30];
	export let pageSize: number = 10;
	let className: string = 'select-bordered';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const contextClass = getContext<string>('ui.pagination-sizer') || '';
	const dispatch = createEventDispatcher<{
		sizeChange: { pageSize: number };
	}>();
</script>

<div class="form-control">
	<label class="input-group">
		<span>{$LL.ui.pagination.size()}</span>
		<select
			class="select {className} {contextClass}"
			bind:value={pageSize}
			on:change={() => {
				dispatch('sizeChange', { pageSize });
			}}
		>
			{#each pageSizeOptions as pageSizeOption}
				<option value={pageSizeOption}>{pageSizeOption}</option>
			{/each}
		</select>
	</label>
</div>
