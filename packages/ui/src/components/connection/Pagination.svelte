<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LL from '~/i18n/i18n-svelte';
	export let pageSizeOptions: number[] = [10, 20, 30];
	export let pageSize: number = 10;
	export let pageNumber: number = 1;
	export let totalCount: number = 0;
	const dispatch = createEventDispatcher<{
		pageChange: {};
		sizeChange: {};
	}>();

	$: pageCount =
		totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;
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
	<div class="join">
		<button
			class="join-item btn {pageNumber - 1 ? '' : 'btn-disabled'}"
			on:click={() => {
				pageNumber = pageNumber - 1;
				dispatch('pageChange');
			}}
		>
			«
		</button>
		{#if pageNumber - 2 > 0}
			<button
				class="join-item btn"
				on:click={() => {
					pageNumber = pageNumber - 2;
					dispatch('pageChange');
				}}
			>
				{pageNumber - 2}
			</button>
		{/if}
		{#if pageNumber - 1 > 0}
			<button
				class="join-item btn"
				on:click={() => {
					pageNumber = pageNumber - 1;
					dispatch('pageChange');
				}}
			>
				{pageNumber - 1}
			</button>
		{/if}
		{#if totalCount > 0}
			<button class="join-item btn btn-active">{pageNumber}</button>
		{/if}
		{#if pageNumber + 1 <= pageCount}
			<button
				class="join-item btn"
				on:click={() => {
					pageNumber = pageNumber + 1;
					dispatch('pageChange');
				}}
			>
				{pageNumber + 1}
			</button>
		{/if}
		{#if pageNumber + 2 <= pageCount}
			<button
				class="join-item btn"
				on:click={() => {
					pageNumber = pageNumber + 2;
					dispatch('pageChange');
				}}
			>
				{pageNumber + 2}
			</button>
		{/if}
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
