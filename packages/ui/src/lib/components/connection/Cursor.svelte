<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	export let pageSizeOptions: number[] = [10, 20, 30];
	export let pageSize: number = 10;
	export let hasNextPage: boolean = false;
	export let hasPreviousPage: boolean = false;
	export let startCursor: string;
	export let endCursor: string;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const dispatch = createEventDispatcher<{
		previous: { selectedPageSize: number; before: string };
		next: { selectedPageSize: number; after: string };
		sizeChange: { selectedPageSize: number };
	}>();
</script>

<div class="flex justify-center md:justify-between">
	<div class="join hidden md:flex">
		<button class="join-item btn">{$LL.ui.pagination.size()}</button>
		<select
			class="join-item select select-bordered"
			bind:value={pageSize}
			on:change={() => {
				dispatch('sizeChange');
			}}
		>
			{#each pageSizeOptions as pageSizeOption}
				<option value={pageSizeOption}>{pageSizeOption}</option>
			{/each}
		</select>
	</div>

	<div class="join grid grid-cols-2">
		<button
			class="btn btn-outline {hasPreviousPage ? '' : 'btn-disabled'} join-item"
			on:click={() => {
				dispatch('previous', {
					selectedPageSize: pageSize,
					before: startCursor
				});
			}}
		>
			{$LL.ui.cursor.previous()}
		</button>
		<button
			class="btn btn-outline {hasNextPage ? '' : 'btn-disabled'} join-item"
			on:click={() => {
				dispatch('next', {
					selectedPageSize: pageSize,
					after: endCursor
				});
			}}
		>
			{$LL.ui.cursor.next()}
		</button>
	</div>
</div>
