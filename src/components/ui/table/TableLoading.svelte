<table class="min-w-full divide-y divide-gray-200">
	<tbody class="animate-pulse">
		{#each { length: 10 } as _}
			<tr>
				{#each { length: 8 } as _}
					<td class="px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
						<div class="px-4 py-4 bg-slate-200" />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
