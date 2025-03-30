<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { type Cell, RevoGrid } from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import type { Errors } from '@graphace/commons';
	import { Field, Directive } from '@graphace/graphql';
	import { modal } from '@graphace/ui';
	import { GridToolbar } from '@graphace/ui-graphql';
	import type { Realm, QueryRealmListArgs, MutationRealmListArgs } from '~/lib/types/schema';
	import {
		__schema,
		getGridTheme,
		createEditors,
		fieldsToColumns,
		errorsToGridErrors,
		nodesToSource,
		sourceToMutationList,
		exportToXlsx,
		importFromXlsx
	} from '~/utils';

	export let value: (Realm | null | undefined)[] | null | undefined = undefined;
	export let fields: Field[] = [];
	export let queryFields: Field[] = [];
	export let args: QueryRealmListArgs = {};
	export let errors: Record<number, Errors> = {};
	export let exportLimit: number = 500;
	export let getFieldName: (fieldName: string, subFieldName?: string) => string | undefined;
	export let buildArguments: () => QueryRealmListArgs;
	export let query: () => void;

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
			args: MutationRealmListArgs;
			directives?: Directive[];
		};
		exportQuery: {
			fields: Field[];
			args: QueryRealmListArgs;
			directives?: Directive[];
			then?: (value: (Realm | null | undefined)[] | null | undefined) => void;
		};
	}>();

	let pageSize: number = 10;
	let rowIndex: number | undefined;
	let colIndex: number | undefined;
	let setCellsFocus: (
		cellStart?: Cell,
		cellEnd?: Cell,
		colType?: string,
		rowType?: string
	) => Promise<void>;

	$: theme = getGridTheme($themeStore);
	$: source = nodesToSource<Realm>(typeName, queryFields, value) || [];
	$: gridErrors = errorsToGridErrors<Realm>(typeName, errors, queryFields, value);
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
			modal.open({
				title: $LL.ui_graphql.grid.message.requiredField(),
				description: nonNullFields.join(', '),
				confirm: () => {
					query();
					return true;
				}
			});
			return;
		}

		value = sourceToMutationList(typeName, idFieldName, queryFields, source);
		if (value && value.length > 0) {
			dispatch('mutation', {
				fields: queryFields,
				args: { list: value },
				directives: [new Directive({ name: 'uniqueMerge' })]
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
	on:query={(e) => query()}
	on:mutation={(e) => mutation()}
	on:change={(e) => (source = e.detail.source)}
	on:export={(e) => {
		const args = buildArguments();
		args.offset = 0;
		args.first = exportLimit;
		dispatch('exportQuery', {
			fields,
			args,
			then: (value) => exportToXlsx(typeName, fields, value)
		});
	}}
	on:import={(e) =>
		importFromXlsx(typeName, columns, e.detail.file).then((data) => (source = data))}
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
