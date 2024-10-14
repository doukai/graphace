<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { RevoGrid } from '@revolist/svelte-datagrid';
	import type { Cell } from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import SelectColumnType from '@revolist/revogrid-column-select';
	import type { Field, GraphQLError } from '@graphace/graphql';
	import FileQuery from '~/lib/components/objects/file/File.svelte';
	import { GridToolbar } from '~/lib/components/grid';
	import type { File, FileConnection, FileConnectionQueryArguments, FileListMutationArguments } from '~/lib/types/schema';
	import {
		getGridTheme,
		createEditors,
		buildGraphQLErrors,
		buildGlobalGraphQLErrorMessage,
		fieldsToColumns,
		errorsToGridErrors,
		nodesToSource,
		sourceToMutationList
	} from '~/utils';
	import type { Errors } from '@graphace/commons';
	import { messageBoxs, notifications } from '@graphace/ui';
	
	export let connection: FileConnection;
	export let fields: Field[] = [];
	export let queryArguments: FileConnectionQueryArguments = {};
	export let errors: Record<number, Errors> = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const typeName = 'File';
	const idFieldName = 'id';
	const themeStore = getContext('theme') as Writable<string | undefined>;

	const columnTypes = {
		numeric: new NumberColumnType(),
		select: new SelectColumnType()
	};

	const dispatch = createEventDispatcher<{
		mutation: {
			fields: Field[];
			mutationArguments: FileListMutationArguments;
			then: (list: File[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
	}>();

	let queryFields: Field[] = [];
	let pageSize: number = 10;
	let rowIndex: number | undefined = undefined;
	let colIndex: number | undefined = undefined;
	let getFieldName: (fieldName: string, subFieldName?: string) => string;
	let queryPage: (toPageNumber?: number | undefined) => void;
	let setCellsFocus: (
		cellStart?: Cell,
		cellEnd?: Cell,
		colType?: string,
		rowType?: string
	) => Promise<void>;

	$: theme = getGridTheme($themeStore);
	$: nodes = connection.edges?.map((edge) => edge?.node);
	$: totalCount = connection?.totalCount || 0;
	$: source = nodesToSource<File>(typeName, queryFields, nodes) || [];
	$: gridErrors = errorsToGridErrors<File>(typeName, errors, queryFields, nodes);
	$: columns = fieldsToColumns(typeName, fields, source, gridErrors, getFieldName);
	$: editors = createEditors(gridErrors);

	const mutation = () => {
		dispatch('mutation', {
			fields: queryFields,
			mutationArguments: { list: sourceToMutationList(typeName, idFieldName, queryFields, source) },
			then: (list) => {
				if (list) {
					nodes = list;
				}
				notifications.success($LL.graphence.message.saveSuccess());
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
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
	};
</script>

<FileQuery
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
	className="p-0"
	on:query
	on:bookmark
	bind:getFieldName
>
	<GridToolbar
		slot="toolbar"
		{fields}
		{source}
		{rowIndex}
		{colIndex}
		{pageSize}
		{setCellsFocus}
		on:query={(e) => queryPage()}
		on:mutation={(e) => mutation()}
	/>
	<RevoGrid
		{source}
		{columns}
		range={true}
		resize={true}
		autoSizeColumn={true}
		{columnTypes}
		{theme}
		{editors}
	/>
</FileQuery>
