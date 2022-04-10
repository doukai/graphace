<script lang="ts">
	export let pageSizeOptions: number[] = [10, 20, 30];
	export let pageSize: number = 10;
	export let pageNumber: number = 1;
	export let totalCount: number = 0;
	export let onPageChange: Function;
	export let onSizeChange: Function;

	let pageCount: number =
		totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
	<div class="navbar-start">
		<div class="form-control">
			<label class="input-group input-group-lg">
				<span>size</span>
				<select
					class="select select-bordered"
					bind:value={pageSize}
					on:change={() => onSizeChange(pageSize)}
				>
					{#each pageSizeOptions as pageSizeOption}
						<option value={pageSizeOption}>{pageSizeOption}</option>
					{/each}
				</select>
			</label>
		</div>
	</div>
	<div class="navbar-center" />

	<div class="navbar-end lg:hidden">
		<div class="btn-group">
			<button
				class="btn {pageNumber - 1 ? '' : 'btn-disabled'}"
				on:click={() => {
					onPageChange(pageSize, pageNumber - 1);
				}}
			>
				«
			</button>
			<button class="btn">Page {pageNumber}</button>
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

	<div class="navbar-end hidden lg:flex">
		<p class="mr-4 hidden xl:flex">{totalCount} results</p>
		<div class="btn-group">
			<button
				class="btn {pageNumber - 1 ? '' : 'btn-disabled'}"
				on:click={() => {
					onPageChange(pageSize, pageNumber - 1);
				}}
			>
				«
			</button>
			{#if totalCount >= 5 && pageNumber === pageCount}
				<button
					class="btn"
					on:click={() => {
						onPageChange(pageSize, pageNumber - 4);
					}}
				>
					{pageNumber - 4}
				</button>
			{/if}
			{#if totalCount >= 4 && pageNumber >= pageCount - 1}
				<button
					class="btn"
					on:click={() => {
						onPageChange(pageSize, pageNumber - 3);
					}}
				>
					{pageNumber - 3}
				</button>
			{/if}
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
			{#if totalCount >= 4 && pageNumber <= 2}
				<button
					class="btn"
					on:click={() => {
						onPageChange(pageSize, pageNumber + 3);
					}}
				>
					{pageNumber + 3}
				</button>
			{/if}
			{#if totalCount >= 5 && pageNumber === 1}
				<button
					class="btn"
					on:click={() => {
						onPageChange(pageSize, pageNumber + 4);
					}}
				>
					{pageNumber + 4}
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
