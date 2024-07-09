<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPagination, melt } from '@melt-ui/svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	export let pageSizeOptions: number[] = [10, 20, 30];
	export let pageSize: number = 10;
	export let pageNumber: number = 1;
	export let totalCount: number = 0;
	export let siblingCount: number = 1;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const dispatch = createEventDispatcher<{
		pageChange: {};
		sizeChange: {};
	}>();

	$: pageCount =
		totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, range },
		options: { perPage, count }
	} = createPagination({
		count: totalCount,
		perPage: pageSize,
		defaultPage: pageNumber,
		siblingCount: siblingCount,
		onPageChange: (args) => {
			pageNumber = args.next;
			dispatch('pageChange');
			return args.next;
		}
	});

	$: $count = totalCount;
	$: $perPage = pageSize;
</script>

<div class="hidden md:flex justify-between">
	<div class="join">
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
	<div class="flex items-center">
		<span class="text-sm text-center font-semibold">
			{$LL.ui.pagination.total({ total: totalCount })}
		</span>
	</div>
	<div class="join" use:melt={$root}>
		<button
			use:melt={$prevButton}
			class="join-item btn data-[selected]:btn-active disabled:btn-disabled"
		>
			«
		</button>
		{#each $pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<button class="join-item btn btn-disabled">...</button>
			{:else}
				<button class="join-item btn data-[selected]:btn-active" use:melt={$pageTrigger(page)}>
					{page.value}
				</button>
			{/if}
		{/each}
		<button
			use:melt={$nextButton}
			class="join-item btn data-[selected]:btn-active disabled:btn-disabled"
		>
			»
		</button>
	</div>
</div>
<div class="flex justify-center md:hidden join">
	<button
		class="join-item btn {pageNumber - 1 ? '' : 'btn-disabled'}"
		on:click={() => {
			pageNumber = pageNumber - 1;
			dispatch('pageChange');
		}}
	>
		«
	</button>
	<button class="join-item btn">
		{$LL.ui.pagination.current({ current: pageNumber })}
	</button>
	<button
		class="join-item btn {pageNumber + 1 <= pageCount ? '' : 'btn-disabled'}"
		on:click={() => {
			pageNumber = pageNumber + 1;
			dispatch('pageChange');
		}}
	>
		»
	</button>
</div>
