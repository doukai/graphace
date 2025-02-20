<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { type Cell, RevoGrid } from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import type { Errors } from '@graphace/commons';
	import { Field, Directive, type GraphQLError } from '@graphace/graphql';
	import { messageBoxs, notifications } from '@graphace/ui';
	import { GridToolbar } from '@graphace/ui-graphql';
	import type { Realm, RealmConnection, RealmConnectionQueryArguments, RealmListMutationArguments } from '~/lib/types/schema';
	import {
		__schema,
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
	export let queryFields: Field[] = [];
	export let errors: Record<number, Errors> = {};
	export let exportLimit: number = 500;
	export let getFieldName: (fieldName: string, subFieldName?: string) => string;
	export let buildArguments: (toPageNumber?: number | undefined, limit?: number | undefined) => RealmConnectionQueryArguments;
	export let queryPage: (toPageNumber?: number | undefined) => void;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const themeStore = getContext<Writable<string | undefined>>('theme');
	const typeName = 'Realm';
	const idFieldName = 'id';

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
			directives?: Directive[];
			then?: (connection: RealmConnection | null | undefined) => void;
			catch?: (errors: GraphQLError[]) => void;
		};
	}>();

	let pageSize: number = 10;
	let rowIndex: number | undefined = undefined;
	let colIndex: number | undefined = undefined;
	let setCellsFocus: (
		cellStart?: Cell,
		cellEnd?: Cell,
		colType?: string,
		rowType?: string
	) => Promise<void>;

	$: theme = getGridTheme($themeStore);
	$: nodes = connection?.edges?.map((edge) => edge?.node);
	$: source = nodesToSource<Realm>(typeName, queryFields, nodes) || [];
	$: gridErrors = errorsToGridErrors<Realm>(typeName, errors, queryFields, nodes);
	$: columns = fieldsToColumns(typeName, fields, source, gridErrors, getFieldName);

	const editors = createEditors(() => gridErrors);

	const mutation = () => {
		const nonNullFields = [
			...(__schema
				.getType(typeName)
				?.getFields()
				?.filter((__field) => __field.getType().isNonNull())
				?.filter((__field) => !queryFields?.some((subField) => subField.name === __field.getName()))
				?.map((__field) => getFieldName(__field.getName()!)) || []),
			...queryFields
				.filter((field) => field.fields && field.fields.length > 0)
				.filter((field) =>
					__schema
						.getType(
							__schema.getType(typeName)?.getField(field.name)?.getType().getNamedType()?.getName()!
						)
						?.getFields()
						?.filter((__field) => __field.getType().isNonNull())
						.some(
							(__field) => !field.fields?.some((subField) => subField.name === __field.getName())
						)
				)
				.flatMap((field) =>
					__schema
						.getType(
							__schema.getType(typeName)?.getField(field.name)?.getType().getNamedType()?.getName()!
						)
						?.getFields()
						?.filter((__field) => __field.getType().isNonNull())
						?.filter(
							(__field) => !field.fields?.some((subField) => subField.name === __field.getName())
						)
						?.map((__field) => getFieldName(field.name, __field.getName()!))
				)
		];

		if (nonNullFields && nonNullFields.length > 0) {
			messageBoxs.open({
				title: $LL.ui_graphql.grid.message.requiredField(),
				content: nonNullFields.join(', '),
				buttonName: $LL.ui.button.back(),
				buttonType: 'neutral',
				confirm: () => {
					queryPage(1);
					return true;
				}
			});
			return;
		}
		
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

<GridToolbar
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
	on:import={(e) => importFromXlsx(typeName, columns, e.detail.file).then((data) => (source = data))}
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
