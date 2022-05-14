<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LL from '$i18n/i18n-svelte';
	export let pageSizeOptions: number[] = [10, 20, 30];
	export let pageSize: number = 10;
	export let pageNumber: number = 1;
	export let totalCount: number = 0;
	const dispatch = createEventDispatcher<{
		pageChange: { selectedPageSize: number; selectedPageNumber: number };
		sizeChange: { selectedPageSize: number };
	}>();

	const onPageChange = (pageSize: number, pageNumber: number): void => {
		dispatch('pageChange', {
			selectedPageSize: pageSize,
			selectedPageNumber: pageNumber
		});
	};

	let pageCount: number =
		totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
	<div class="navbar-start">
		<div class="hidden sm:form-control">
			<label class="input-group input-group-lg">
				<span>{$LL.components.ui.pagination.size()}</span>
				<select
					class="select select-bordered"
					bind:value={pageSize}
					on:change={() => {
						dispatch('sizeChange', {
							selectedPageSize: pageSize
						});
					}}
				>
					{#each pageSizeOptions as pageSizeOption}
						<option value={pageSizeOption}>{pageSizeOption}</option>
					{/each}
				</select>
			</label>
		</div>
	</div>

	<div class="navbar-center">
		<div class="btn-group sm:hidden">
			<button
				class="btn {pageNumber - 1 ? '' : 'btn-disabled'}"
				on:click={() => {
					onPageChange(pageSize, pageNumber - 1);
				}}
			>
				«
			</button>
			<button class="btn">{$LL.components.ui.pagination.current({ current: pageNumber })}</button>
			<button
				class="btn {pageNumber + 1 <= pageCount ? '' : 'btn-disabled'}"
				on:click={() => {
					onPageChange(pageSize, pageNumber + 1);
				}}
			>
				»
			</button>
		</div>
	</div>

	<div class="navbar-end">
		<p class="mr-4 hidden md:flex">{$LL.components.ui.pagination.total({ total: totalCount })}</p>
		<div class="hidden sm:btn-group">
			<button
				class="btn {pageNumber - 1 ? '' : 'btn-disabled'}"
				on:click={() => {
					onPageChange(pageSize, pageNumber - 1);
				}}
			>
				«
			</button>
			{#if pageNumber - 2 > 0}
				<button
					class="btn"
					on:click={() => {
						onPageChange(pageSize, pageNumber - 2);
					}}
				>
					{pageNumber - 2}
				</button>
			{/if}
			{#if pageNumber - 1 > 0}
				<button
					class="btn"
					on:click={() => {
						onPageChange(pageSize, pageNumber - 1);
					}}
				>
					{pageNumber - 1}
				</button>
			{/if}
			{#if totalCount > 0}
				<button class="btn btn-active">{pageNumber}</button>
			{/if}
			{#if pageNumber + 1 <= pageCount}
				<button
					class="btn"
					on:click={() => {
						onPageChange(pageSize, pageNumber + 1);
					}}
				>
					{pageNumber + 1}
				</button>
			{/if}
			{#if pageNumber + 2 <= pageCount}
				<button
					class="btn"
					on:click={() => {
						onPageChange(pageSize, pageNumber + 2);
					}}
				>
					{pageNumber + 2}
				</button>
			{/if}
			<button
				class="btn {pageNumber + 1 <= pageCount ? '' : 'btn-disabled'}"
				on:click={() => {
					onPageChange(pageSize, pageNumber + 1);
				}}
			>
				»
			</button>
		</div>
	</div>
</div>
