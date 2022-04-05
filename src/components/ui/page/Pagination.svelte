<script lang="ts">
	export let pageSizeOptions: number[] = [10, 20, 30];
	export let onPrevious: Function;
	export let onNext: Function;
	export let onSizeChange: Function;
	export let hasNextPage: boolean = false;
	export let hasPreviousPage: boolean = false;
	export let startCursor: string;
	export let endCursor: string;

	let pageSize: number = 10;
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
	<div class="navbar-start">
		<div class="form-control">
			<label class="input-group input-group-lg">
				<span>size</span>
				<select
					class="select select-bordered"
					bind:value={pageSize}
					on:change={() => {
						onSizeChange(pageSize);
					}}
				>
					{#each pageSizeOptions as pageSize}
						<option value={pageSize}>{pageSize}</option>
					{/each}
				</select>
			</label>
		</div>
	</div>
	<div class="navbar-end">
		<div class="btn-group grid grid-cols-2">
			<button
				class="btn btn-outline {hasPreviousPage ? '' : 'btn-disabled'}"
				on:click={() => {
					onPrevious(pageSize, startCursor);
				}}
			>
				Previous
			</button>
			<button
				class="btn btn-outline {hasNextPage ? '' : 'btn-disabled'}"
				on:click={() => {
					onNext(pageSize, endCursor);
				}}
			>
				Next
			</button>
		</div>
	</div>
</div>
