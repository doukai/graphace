<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPagination, melt } from '@melt-ui/svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { PaginationSizer, PaginationCounter } from '.';

	export let pageSize: number = 10;
	export let pageNumber: number = 1;
	export let totalCount: number = 0;
	export let siblingCount: number = 1;
	export let pageSizeOptions: number[] = [10, 20, 30];
	let className: string = '';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const contextClass = getContext<string>('ui.pagination') || '';
	const dispatch = createEventDispatcher<{
		pageChange: { pageNumber: number };
	}>();

	$: pageCount =
		totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages },
		options: { perPage, count }
	} = createPagination({
		count: totalCount,
		perPage: pageSize,
		defaultPage: pageNumber,
		siblingCount: siblingCount,
		onPageChange: (args) => {
			pageNumber = args.next;
			dispatch('pageChange', { pageNumber });
			return args.next;
		}
	});

	$: $count = totalCount;
	$: $perPage = pageSize;
</script>

<div class="hidden md:flex md:justify-between">
	<slot {pageSize} {totalCount}>
		<PaginationSizer bind:pageSize {pageSizeOptions} on:sizeChange />
		<PaginationCounter {totalCount} />
	</slot>
	<div class="join" use:melt={$root}>
		<button
			use:melt={$prevButton}
			class="join-item btn {className} {contextClass} data-[selected]:btn-active disabled:btn-disabled"
		>
			«
		</button>
		{#each $pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<button class="join-item btn {className} {contextClass} btn-disabled">...</button>
			{:else}
				<button
					class="join-item btn {className} {contextClass} data-[selected]:btn-active"
					use:melt={$pageTrigger(page)}
				>
					{page.value}
				</button>
			{/if}
		{/each}
		<button
			use:melt={$nextButton}
			class="join-item btn {className} {contextClass} data-[selected]:btn-active disabled:btn-disabled"
		>
			»
		</button>
	</div>
</div>
<div class="flex justify-center join md:hidden">
	<button
		class="join-item btn {className} {contextClass} {pageNumber - 1 ? '' : 'btn-disabled'}"
		on:click={() => {
			pageNumber = pageNumber - 1;
			dispatch('pageChange', { pageNumber });
		}}
	>
		«
	</button>
	<button class="join-item btn {className} {contextClass}">
		{$LL.ui.pagination.current({ current: pageNumber })}
	</button>
	<button
		class="join-item btn {className} {contextClass} {pageNumber + 1 <= pageCount
			? ''
			: 'btn-disabled'}"
		on:click={() => {
			pageNumber = pageNumber + 1;
			dispatch('pageChange', { pageNumber });
		}}
	>
		»
	</button>
</div>
