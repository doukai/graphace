<script lang="ts">
	export let rows: number;
	export let cols: number;
</script>

<tbody class="animate-pulse">
	{#each { length: rows } as _}
		<tr>
			{#each { length: cols } as _}
				<td>
					<div class="py-2" />
				</td>
			{/each}
		</tr>
	{/each}
</tbody>
