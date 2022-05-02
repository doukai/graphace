<script context="module" lang="ts">
	export type Checkbox = {
		name: string;
		description?: string;
		value: any;
	};
</script>

<script lang="ts">
	export let checkboxs: Checkbox[];
	export let value: string[];
	if (!value) {
		value = [];
	}
</script>

<div class="mt-4 sm:mt-0 sm:col-span-2">
	<div class="max-w-lg space-y-4">
		{#each checkboxs as checkbox}
			<div class="relative flex items-start">
				<div class="flex items-center h-5">
					<input
						type="checkbox"
						id={checkbox.name}
						bind:group={value}
						class="checkbox"
						value={checkbox.value}
					/>
				</div>
				<div class="ml-3 text-sm">
					<label for={checkbox.name} class="font-medium text-gray-700">{checkbox.name}</label>
					{#if checkbox.description}
						<p class="text-gray-500">{checkbox.description}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
