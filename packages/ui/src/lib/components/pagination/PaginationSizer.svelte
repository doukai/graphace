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

<div data-part="pagination-size" class="form-control {className} {contextClass}">
	<label class="input-group">
		<span data-part="text-size">{$LL.ui.pagination.size()}</span>
		<select
			data-part="select-size"
			class="select"
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
