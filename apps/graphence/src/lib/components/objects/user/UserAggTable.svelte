<script lang="ts">
	import { type Field } from '@graphace/graphql';
	import { Table, Empty } from '@graphace/ui';
	import { FieldThs, FieldTds } from '@graphace/ui-graphql';
	import type { User, QueryUserListArgs } from '~/lib/types/schema';

	export let value: (User | null | undefined)[] | null | undefined = undefined;
	export let fields: Field[] = [];
	export let args: QueryUserListArgs = {};
	export let nullString: string = '-';
	export let getFieldName: (fieldName: string, subFieldName?: string) => string | undefined;
	export let getGrouByName: (fieldName: string) => string | undefined;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<Table {zIndex} class={className}>
	<thead>
		<FieldThs class="border" {fields} {getFieldName} let:deep>
			{#each args.groupBy || [] as field}
				<td class="border" rowspan={deep}>{getGrouByName(field)}</td>
			{/each}
		</FieldThs>
	</thead>
	<tbody>
		{#if value && value.length > 0}
			{#each value || [] as node}
				<tr class="hover">
					{#each args.groupBy || [] as field}
						{#if value?.[field] == null}
							<td class="border">{nullString}</td>
						{:else}
							<td class="border">{value?.[field]}</td>
						{/if}
					{/each}
					<FieldTds class="border" {fields} {node} />
				</tr>
			{/each}
		{:else}
			<tr>
				<td colspan="999">
					<Empty class="badge-lg" />
				</td>
			</tr>
		{/if}
	</tbody>
</Table>