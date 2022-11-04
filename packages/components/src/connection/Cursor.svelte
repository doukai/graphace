<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LL from '../i18n/i18n-svelte';
	export let pageSizeOptions: number[] = [10, 20, 30];
	export let pageSize: number = 10;
	export let hasNextPage: boolean = false;
	export let hasPreviousPage: boolean = false;
	export let startCursor: string;
	export let endCursor: string;
	const dispatch = createEventDispatcher<{
		previous: { selectedPageSize: number; before: string };
		next: { selectedPageSize: number; after: string };
		sizeChange: { selectedPageSize: number };
	}>();
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
	<div class="navbar-start">
		<div class="hidden sm:form-control">
			<label class="input-group input-group-lg">
				<span>{$LL.components.ui.cursor.size()}</span>
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
	<div class="hidden sm:navbar-center" />
	<div class="navbar-center sm:navbar-end">
		<div class="btn-group grid grid-cols-2">
			<button
				class="btn btn-outline {hasPreviousPage ? '' : 'btn-disabled'}"
				on:click={() => {
					dispatch('previous', {
						selectedPageSize: pageSize,
						before: startCursor
					});
				}}
			>
				{$LL.components.ui.cursor.previous()}
			</button>
			<button
				class="btn btn-outline {hasNextPage ? '' : 'btn-disabled'}"
				on:click={() => {
					dispatch('next', {
						selectedPageSize: pageSize,
						after: endCursor
					});
				}}
			>
				{$LL.components.ui.cursor.next()}
			</button>
		</div>
	</div>
	<div class="navbar-end sm:hidden" />
</div>
