<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { type Cell, RevoGrid } from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import type { Errors } from '@graphace/commons';
	import { Field, Directive, type GraphQLError } from '@graphace/graphql';
	import { messageBoxs, notifications } from '@graphace/ui';
	import { GridToolbar } from '@graphace/ui-graphql';
	import RealmQuery from '~/lib/components/objects/realm/Realm.svelte';
	import type { Realm, RealmConnection, RealmConnectionQueryArguments, RealmListMutationArguments } from '~/lib/types/schema';
	import {
		getGridTheme,
		createEditors,
		buildGlobalGraphQLErrorMessage,
		fieldsToColumns,
		errorsToGridErrors,
		nodesToSource,
		sourceToMutationList,
		exportToXlsx,
		importFromXlsx
	} from '~/utils';
	
	export let connection: RealmConnection;
	export let fields: Field[] = [];
	export let queryArguments: RealmConnectionQueryArguments = {};
	export let errors: Record<number, Errors> = {};
	export let exportLimit: number = 500;
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const typeName = 'Realm';
	const idFieldName = 'id';
	const themeStore = getContext('theme') as Writable<string | undefined>;

	const columnTypes = {
		numeric: new NumberColumnType()
	};

	const dispatch = createEventDispatcher<{
		mutation: {
			fields: Field[];
			mutationArguments: RealmListMutationArguments;
			directives?: Directive[];
			then: (list: Realm[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		exportQuery: {
			fields: Field[];
			queryArguments: RealmConnectionQueryArguments;
			then?: (connection: RealmConnection | null | undefined) => void;
			catch?: (errors: GraphQLError[]) => void;
		};
	}>();

	let queryFields: Field[] = [];
	let pageSize: number = 10;
	let rowIndex: number | undefined = undefined;
	let colIndex: number | undefined = undefined;
	let getFieldName: (fieldName: string, subFieldName?: string) => string;
	let queryPage: (toPageNumber?: number | undefined) => void;
	let buildArguments: (
		toPageNumber?: number | undefined,
		limit?: number | undefined
	) => RealmConnectionQueryArguments;
	let setCellsFocus: (
		cellStart?: Cell,
		cellEnd?: Cell,
		colType?: string,
		rowType?: string
	) => Promise<void>;

	$: theme = getGridTheme($themeStore);
	$: nodes = connection?.edges?.map((edge) => edge?.node);
	$: totalCount = connection?.totalCount || 0;
	$: source = nodesToSource<Realm>(typeName, queryFields, nodes) || [];
	$: gridErrors = errorsToGridErrors<Realm>(typeName, errors, queryFields, nodes);
	$: columns = fieldsToColumns(typeName, fields, source, gridErrors, getFieldName);

	const editors = createEditors(() => gridErrors);

	const mutation = () => {
		nodes = sourceToMutationList(typeName, idFieldName, queryFields, source);
		if (nodes && nodes.length > 0) {
			dispatch('mutation', {
				fields: queryFields,
				mutationArguments: { list: nodes },
				directives: [new Directive({ name: 'uniqueMerge' })],
				then: (list) => {
					if (list) {
						nodes = list;
					}
					notifications.success($LL.graphence.message.saveSuccess());
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.saveFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								queryPage(1);
								return true;
							}
						});
					}
				}
			});
		}
	};
</script>

<RealmQuery
	bind:fields
	bind:queryFields
	bind:queryArguments
	{isFetching}
	{showHeader}
	{showFooter}
	{showOptionButton}
	{showFilterButton}
	{showBookmarkButton}
	{totalCount}
	className="p-0 md:h-screen"
	on:query
	on:bookmark
	bind:getFieldName
	bind:queryPage
	bind:buildArguments
>
	<GridToolbar
		slot="toolbar"
		{fields}
		{source}
		{idFieldName}
		{rowIndex}
		{colIndex}
		{pageSize}
		{setCellsFocus}
		on:query={(e) => queryPage()}
		on:mutation={(e) => mutation()}
		on:change={(e) => (source = e.detail.source)}
		on:export={(e) =>
			dispatch('exportQuery', {
				fields,
				queryArguments: buildArguments(1, exportLimit),
				then: (connection) =>
					exportToXlsx(
						typeName,
						fields,
						connection?.edges?.map((edge) => edge?.node)
					)
			})
		}
		on:import={(e) => importFromXlsx(columns, e.detail.file).then((data) => (source = data))}
	/>
	<RevoGrid
		{source}
		{columns}
		range={true}
		resize={true}
		autoSizeColumn={true}
		rowHeaders={true}
		{columnTypes}
		{theme}
		{editors}
		on:afterfocus={(e) => {
			rowIndex = e.detail.rowIndex;
			colIndex = e.detail.colIndex;
		}}
		bind:setCellsFocus
	/>
</RealmQuery>
