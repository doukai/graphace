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
	let className: string | undefined = '';
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

<div data-element="pagination" data-part="root" class="{className} {contextClass}">
	<div data-part="md" class="flex justify-between max-sm:hidden">
		<slot {pageSize} {totalCount}>
			<PaginationSizer bind:pageSize {pageSizeOptions} on:sizeChange />
			<PaginationCounter {totalCount} />
		</slot>
		<div class="join" use:melt={$root}>
			<button
				data-part="btn-prev"
				use:melt={$prevButton}
				class="join-item btn data-[selected]:btn-active disabled:btn-disabled"
			>
				«
			</button>
			{#each $pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<button data-part="btn-page" class="join-item btn btn-disabled"> ... </button>
				{:else}
					<button
						data-part="btn-selected"
						class="join-item btn data-[selected]:btn-active"
						use:melt={$pageTrigger(page)}
					>
						{page.value}
					</button>
				{/if}
			{/each}
			<button
				data-part="btn-next"
				use:melt={$nextButton}
				class="join-item btn data-[selected]:btn-active disabled:btn-disabled"
			>
				»
			</button>
		</div>
	</div>
	<div data-part="sm" class="flex justify-center join md:hidden">
		<button
			data-part="btn-prev"
			class="join-item btn {pageNumber - 1 ? '' : 'btn-disabled'}"
			on:click={() => {
				pageNumber = pageNumber - 1;
				dispatch('pageChange', { pageNumber });
			}}
		>
			«
		</button>
		<button data-part="btn-page" class="join-item btn">
			{$LL.ui.pagination.current({ current: pageNumber })}
		</button>
		<button
			data-part="btn-next"
			class="join-item btn {pageNumber + 1 <= pageCount ? '' : 'btn-disabled'}"
			on:click={() => {
				pageNumber = pageNumber + 1;
				dispatch('pageChange', { pageNumber });
			}}
		>
			»
		</button>
	</div>
</div>
