<script lang="ts">
	import { RevoGrid, type ColumnRegular } from '@revolist/svelte-datagrid';
	import { Field } from '@graphace/graphql';
	import UserAgg from '~/lib/components/objects/user/UserAgg.svelte';
	import type { UserConnection, UserConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: UserConnection;
	export let fields: Field[] = [];
	export let queryArguments: UserConnectionQueryArguments = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	$: nodes = connection.edges?.map((edge) => edge?.node);
	$: totalCount = connection?.totalCount || 0;

	const source = [
		{
			name: '1',
			details: 'Item 1'
		},
		{
			name: '2',
			details: 'Item 2'
		}
	];
	const columns: ColumnRegular[] = [
		{
			prop: 'name',
			name: 'First',
			cellTemplate(h, { value }) {
				return h('span', { style: { background: 'red' } }, value);
			}
		},
		{
			prop: 'details',
			name: 'Second'
		}
	];
</script>

<UserAgg
	bind:fields
	bind:queryArguments
	{isFetching}
	{showHeader}
	{showFooter}
	{showOptionButton}
	{showFilterButton}
	{showBookmarkButton}
	{totalCount}
	on:query
	on:bookmark
	let:getFieldName
	let:getGrouByName
>
	<RevoGrid {source} {columns} />
</UserAgg>
