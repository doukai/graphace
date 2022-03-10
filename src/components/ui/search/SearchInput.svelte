<script lang="ts">
	export let value: string;
	export let name: string = '';
	export let placeholder: string = 'Search';
	export let borderColor: string = 'indigo';
	export let color: string = 'gray';
</script>

<div class="mt-3 sm:mt-0 sm:ml-4">
	<div class="flex rounded-md shadow-sm">
		<div class="relative flex-grow focus-within:z-10">
			<input
				type="text"
				{name}
				class="focus:ring-{borderColor}-500 focus:border-{borderColor}-500 w-full rounded-none rounded-l-md sm:block sm:text-sm border-{color}-300"
				{placeholder}
				bind:value
				on:click
			/>
		</div>
		<button
			type="button"
			class="-ml-px relative inline-flex items-center px-4 py-2 border border-{color}-300 text-sm font-medium rounded-r-md text-{color}-700 bg-{color}-50 hover:bg-{color}-100 focus:outline-none focus:ring-1 focus:ring-{borderColor}-500 focus:border-{borderColor}-500"
		>
			<!-- Heroicon name: solid/search -->
			<svg
				class="h-5 w-5 text-{color}-400"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</div>
