<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPagination, melt } from '@melt-ui/svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

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
		sizeChange: { pageSize: number };
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

<div data-element="pagination" data-part="root" class="{contextClass} {className}">
	<div data-part="pagination" class="flex justify-between max-sm:hidden">
		<slot {pageSize} {totalCount}>
			<div data-part="pagination-sizer" class="form-control {contextClass} {className}">
				<label class="input-group">
					<span data-part="text-size">{$LL.ui.pagination.size()}</span>
					<select
						data-part="select-size"
						class="select select-bordered"
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
			<span data-part="pagination-counter" class="text-sm self-center font-semibold">
				{$LL.ui.pagination.total({ total: totalCount })}
			</span>
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
					<button data-part="btn-number" class="join-item btn btn-disabled"> ... </button>
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
	<div data-part="pagination-sm" class="flex justify-center join md:hidden">
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
		<button data-part="btn-number" class="join-item btn">
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
