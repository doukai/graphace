<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { RevoGrid } from '@revolist/svelte-datagrid';
	import type { Cell } from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import type { Field, GraphQLError } from '@graphace/graphql';
	import PermissionQuery from '~/lib/components/objects/permission/Permission.svelte';
	import { GridToolbar } from '~/lib/components/grid';
	import type { Permission, PermissionConnection, PermissionConnectionQueryArguments, PermissionListMutationArguments } from '~/lib/types/schema';
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
	
	export let connection: PermissionConnection;
	export let fields: Field[] = [];
	export let queryArguments: PermissionConnectionQueryArguments = {};
	export let errors: Record<number, Errors> = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const typeName = 'Permission';
	const idFieldName = 'name';
	const themeStore = getContext('theme') as Writable<string | undefined>;

	const columnTypes = {
		numeric: new NumberColumnType()
	};

	const dispatch = createEventDispatcher<{
		mutation: {
			fields: Field[];
			mutationArguments: PermissionListMutationArguments;
			then: (list: Permission[] | null | undefined) => void;
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
	$: nodes = connection?.edges?.map((edge) => edge?.node);
	$: totalCount = connection?.totalCount || 0;
	$: source = nodesToSource<Permission>(typeName, queryFields, nodes) || [];
	$: gridErrors = errorsToGridErrors<Permission>(typeName, errors, queryFields, nodes);
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

<PermissionQuery
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
	className="p-0 h-screen"
	on:query
	on:bookmark
	bind:getFieldName
	bind:queryPage
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
</PermissionQuery>
