<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { RevoGrid } from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import SelectColumnType from '@revolist/revogrid-column-select';
	import type { Field } from '@graphace/graphql';
	import PermissionAgg from '~/lib/components/objects/permission/PermissionAgg.svelte';
	import type { PermissionConnection, PermissionConnectionQueryArguments } from '~/lib/types/schema';
	import { getGridTheme, fieldsToAggColumns, nodesToAggSource } from '~/utils';

	export let connection: PermissionConnection;
	export let fields: Field[] = [];
	export let queryArguments: PermissionConnectionQueryArguments = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const typeName = 'Permission';
	const themeStore = getContext('theme') as Writable<string | undefined>;
	
	const columnTypes = {
		numeric: new NumberColumnType(),
		select: new SelectColumnType()
	};

	let getFieldName: (fieldName: string, subFieldName?: string) => string;
	let getGrouByName: (fieldName: string) => string;

	$: theme = getGridTheme($themeStore);
	$: nodes = connection.edges?.map((edge) => edge?.node);
	$: totalCount = connection?.totalCount || 0;

	$: filter = {
		localization: {
			captions: {
				title: $LL.graphence.components.grid.captions.title(),
				save: $LL.graphence.components.grid.captions.save(),
				reset: $LL.graphence.components.grid.captions.reset(),
				ok: $LL.graphence.components.grid.captions.ok(),
				cancel: $LL.graphence.components.grid.captions.cancel(),
				add: $LL.graphence.components.grid.captions.add(),
				placeholder: $LL.graphence.components.grid.captions.placeholder(),
				and: $LL.graphence.components.grid.captions.and(),
				or: $LL.graphence.components.grid.captions.or()
			},
			filterNames: {
				none: $LL.graphence.components.grid.filterNames.none(),
				empty: $LL.graphence.components.grid.filterNames.empty(),
				notEmpty: $LL.graphence.components.grid.filterNames.notEmpty(),
				eq: $LL.graphence.components.grid.filterNames.eq(),
				notEq: $LL.graphence.components.grid.filterNames.notEq(),
				begins: $LL.graphence.components.grid.filterNames.begins(),
				contains: $LL.graphence.components.grid.filterNames.contains(),
				notContains: $LL.graphence.components.grid.filterNames.notContains(),
				eqN: $LL.graphence.components.grid.filterNames.eqN(),
				neqN: $LL.graphence.components.grid.filterNames.neqN(),
				gt: $LL.graphence.components.grid.filterNames.gt(),
				gte: $LL.graphence.components.grid.filterNames.gte(),
				lt: $LL.graphence.components.grid.filterNames.lt(),
				lte: $LL.graphence.components.grid.filterNames.lte()
			}
		}
	};

	$: columns = fieldsToAggColumns(typeName, fields, getFieldName);
	$: source = nodesToAggSource(queryArguments.groupBy || [], fields, nodes);
</script>

<PermissionAgg
	bind:fields
	bind:queryArguments
	{isFetching}
	{showHeader}
	{showFooter}
	{showOptionButton}
	{showFilterButton}
	{showBookmarkButton}
	{totalCount}
	className="p-0"
	on:query
	on:bookmark
	bind:getFieldName
	bind:getGrouByName
>
	<RevoGrid
		{source}
		{columns}
		{filter}
		range={true}
		resize={true}
		autoSizeColumn={true}
		{columnTypes}
		{theme}
	/>
</PermissionAgg>
