<script lang='ts'>
	import { getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { RevoGrid } from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import type { Field } from '@graphace/graphql';
	import type { GroupConnection, GroupConnectionQueryArguments } from '~/lib/types/schema';
	import { getGridTheme, fieldsToAggColumns, nodesToAggSource } from '~/utils';

	export let connection: GroupConnection;
	export let fields: Field[] = [];
	export let queryArguments: GroupConnectionQueryArguments = {};
	export let getFieldName: (fieldName: string, subFieldName?: string) => string;
	export let getGrouByName: (fieldName: string) => string;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const themeStore = getContext<Writable<string | undefined>>('theme');
	const typeName = 'Group';

	const columnTypes = {
		numeric: new NumberColumnType()
	};

	$: theme = getGridTheme($themeStore);
	$: nodes = connection?.edges?.map((edge) => edge?.node);

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

	$: columns = fieldsToAggColumns(
		typeName,
		queryArguments.groupBy || [],
		fields,
		getFieldName,
		getGrouByName
	);
	$: source = nodesToAggSource(typeName, queryArguments.groupBy || [], fields, nodes);
</script>

<RevoGrid
	{source}
	{columns}
	{filter}
	range={true}
	resize={true}
	autoSizeColumn={true}
	rowHeaders={true}
	{columnTypes}
	{theme}
/>
