<table class="min-w-full divide-y divide-gray-200">
	<thead class="animate-pulse bg-gray-50">
		<tr>
			{#each { length: 8 } as _}
				<th
					scope="col"
					class="px-3 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
				>
					<div class="px-3 py-2 bg-slate-200 rounded" />
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class="animate-pulse">
		{#each { length: 10 } as _, rowIndex}
			<tr class={rowIndex % 2 ? 'bg-gray-50' : 'bg-white'}>
				{#each { length: 8 } as _}
					<td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
						<div class="px-3 py-2 bg-slate-200 rounded" />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
