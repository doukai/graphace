<script lang="ts">
	import type { __Field } from '$lib/TypeManager';

	export let fields: __Field[];
</script>

<thead class="bg-gray-50">
	<tr>
		{#each fields as field}
			<th
				scope="col"
				class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
			>
				{field.name}
			</th>
		{/each}
		<th scope="col" class="relative px-6 py-3">
			<span class="sr-only">Edit</span>
		</th>
	</tr>
</thead>
