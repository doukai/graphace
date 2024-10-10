<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { createToolbar, melt } from '@melt-ui/svelte';
	import { RevoGrid } from '@revolist/svelte-datagrid';
	import type {
		ColumnRegular,
		ColumnGrouping,
		DataType,
		Cell,
		DimensionRows
	} from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import SelectColumnType from '@revolist/revogrid-column-select';
	import { type Field, fieldsDeep, type GraphQLError } from '@graphace/graphql';
	import RoleQuery from '~/lib/components/objects/role/Role.svelte';
	import type {
		Role,
		RoleConnection,
		RoleConnectionQueryArguments,
		RoleListMutationArguments
	} from '~/lib/types/schema';
	import { getGridType, getGridTheme, editors, typeFieldTypeHasList } from '~/utils';

	export let connection: RoleConnection;
	export let fields: Field[] = [];
	export let queryArguments: RoleConnectionQueryArguments = {};
	export let mutationArguments: RoleListMutationArguments = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const typeName = 'Role';
	const themeStore = getContext('theme') as Writable<string | undefined>;

	const columnTypes = {
		numeric: new NumberColumnType(),
		select: new SelectColumnType()
	};

	const dispatch = createEventDispatcher<{
		mutation: {
			fields: Field[];
			mutationArguments: RoleListMutationArguments;
			then: (list: Role[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
	}>();

	const {
		elements: { root, button, link, separator },
		builders: { createToolbarGroup }
	} = createToolbar();

	let queryFields: Field[] = [];
	let getFieldName: (fieldName: string, subFieldName?: string) => string;
	let source: DataType[] = [];
	let pageSize: number = 10;
	let rowIndex: number | undefined = undefined;
	let colIndex: number | undefined = undefined;
	let setCellsFocus: (
		cellStart?: Cell,
		cellEnd?: Cell,
		colType?: string,
		rowType?: string
	) => Promise<void>;
	let refresh: (type?: DimensionRows | 'all') => Promise<void>;
	let getSource: (type?: DimensionRows) => Promise<DataType[]>;
	let queryPage: (toPageNumber?: number | undefined) => void;

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

	$: columns =
		fieldsDeep(fields) === 1
			? (fields.map((field) => ({
					name: getFieldName(field.name),
					prop: field.name,
					autoSize: true,
					filter: true,
					sortable: true,
					editable: true,
					...getGridType(typeName, field.name)
			  })) as ColumnRegular[])
			: (fields.map((field) => {
					if (field.fields && field.fields.length > 0) {
						return {
							name: getFieldName(field.name),
							children: field.fields.map((subField) => ({
								name: getFieldName(field.name, subField.name),
								prop: `${field.name}.${subField.name}`,
								autoSize: true,
								filter: true,
								sortable: true,
								editable: true,
								...getGridType(typeName, field.name, subField.name)
							}))
						};
					} else {
						return {
							name: '',
							children: [
								{
									name: getFieldName(field.name),
									prop: field.name,
									autoSize: true,
									filter: true,
									sortable: true,
									editable: true,
									...getGridType(typeName, field.name)
								}
							]
						};
					}
			  }) as ColumnGrouping[]);

	$: if (nodes) {
		const join = queryFields.find((field) => typeFieldTypeHasList(typeName, field.name));
		source = nodes?.flatMap((node) => {
			if (join) {
				const array = node?.[join.name as keyof Role];
				if (Array.isArray(array)) {
					return array
						.map((item) => {
							if (join.fields && join.fields.length > 0) {
								return join.fields.map((subField) => [
									`${join.name}.${subField.name}`,
									item?.[subField.name as keyof typeof item]
								]);
							} else {
								return [[join.name, node?.[join.name as keyof Role]]];
							}
						})
						.map((item) =>
							Object.fromEntries([
								...item,
								...queryFields
									.filter((field) => field.name !== join.name)
									.flatMap((field) => {
										if (field.fields && field.fields.length > 0) {
											const object = node?.[field.name as keyof Role];
											return field.fields.map((subField) => [
												`${field.name}.${subField.name}`,
												object?.[subField.name as keyof typeof object]
											]);
										} else {
											return [[field.name, node?.[field.name as keyof Role]]];
										}
									})
							])
						);
				}
			}
			return [
				Object.fromEntries(
					queryFields.flatMap((field) => {
						if (field.fields && field.fields.length > 0) {
							const object = node?.[field.name as keyof Role];
							return field.fields.map((subField) => [
								`${field.name}.${subField.name}`,
								object?.[subField.name as keyof typeof object]
							]);
						} else {
							return [[field.name, node?.[field.name as keyof Role]]];
						}
					})
				)
			];
		});
	}

	const mutation = () => {
		let list = [];
		const join = queryFields.find((field) => typeFieldTypeHasList(typeName, field.name));
		if (join) {
			list = source?.reduce((nodes: DataType[], row) => {
				const object = Object.fromEntries(
					join!.fields?.map((subField) => [
						subField.name,
						row?.[`${join.name}.${subField.name}`]
					]) || []
				);
				if (
					Object.values(object).filter((value) => value).length > 0 &&
					row['id'] &&
					nodes.some((node: DataType) => node['id'] === row['id'])
				) {
					nodes
						.find((node: DataType) => node['id'] === row['id'])
						?.[join.name].push(
							Object.fromEntries(
								join!.fields?.map((subField) => [
									subField.name,
									row?.[`${join.name}.${subField.name}`]
								]) || []
							)
						);
				} else if (
					Object.values(object).filter((value) => value).length > 0 &&
					nodes.some((node: DataType) =>
						queryFields
							.filter((field) => field.name !== join.name)
							.filter((field) => !field.fields)
							.every((field) => node[field.name] === row[field.name])
					)
				) {
					nodes
						.find((node: DataType) =>
							queryFields
								.filter((field) => field.name !== join.name)
								.filter((field) => !field.fields)
								.every((field) => node[field.name] === row[field.name])
						)
						?.[join.name].push(
							Object.fromEntries(
								join!.fields?.map((subField) => [
									subField.name,
									row?.[`${join.name}.${subField.name}`]
								]) || []
							)
						);
				} else {
					nodes.push(
						Object.fromEntries(
							queryFields.map((field) => {
								if (field.fields && field.fields.length > 0) {
									const object = Object.fromEntries(
										field.fields.map((subField) => [
											subField.name,
											row?.[`${field.name}.${subField.name}`]
										])
									);
									if (Object.values(object).filter((value) => value).length > 0) {
										return [field.name, field.name === join.name ? [object] : object];
									}
									return [field.name, field.name === join.name ? [] : null];
								} else {
									return [
										field.name,
										field.name === join.name ? [row?.[field.name]] : row?.[field.name]
									];
								}
							})
						)
					);
				}
				return nodes;
			}, []);
		} else {
			list = source?.map((row) =>
				Object.fromEntries(
					queryFields.map((field) => {
						if (field.fields && field.fields.length > 0) {
							const object = Object.fromEntries(
								field.fields.map((subField) => [
									subField.name,
									row?.[`${field.name}.${subField.name}`]
								])
							);
							if (Object.values(object).filter((value) => value).length > 0) {
								return [field.name, object];
							}
							return [field.name, null];
						} else {
							return [field.name, row?.[field.name]];
						}
					})
				)
			);
		}
		console.log(JSON.stringify(list));
	};
</script>

<RoleQuery
	bind:fields
	bind:queryFields
	bind:queryArguments
	bind:pageSize
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
	<div use:melt={$root} class="flex p-1 bg-base-300 rounded space-x-1">
		<button class="btn btn-xs" use:melt={$button} on:click={(e) => queryPage()}>
			{$LL.graphence.components.grid.buttons.refresh()}
		</button>
		<button class="btn btn-xs btn-secondary" use:melt={$button} on:click={(e) => mutation()}>
			{$LL.graphence.components.grid.buttons.save()}
		</button>
		<div class="divider divider-horizontal m-0" use:melt={$separator} />
		<button
			class="btn btn-xs btn-primary"
			use:melt={$button}
			disabled={fields.length === 0}
			on:click={(e) => {
				source = [...Array(pageSize).map(() => ({}))];
			}}
		>
			{$LL.graphence.components.grid.buttons.new()}
		</button>
		<button
			class="btn btn-xs btn-primary"
			use:melt={$button}
			disabled={!rowIndex}
			on:click={(e) => {
				if (rowIndex) {
					source.splice(rowIndex, 0, {});
					source = [...source];
					setCellsFocus(
						{ x: colIndex || 0, y: rowIndex || 0 },
						{ x: colIndex || 0, y: rowIndex || 0 }
					);
				}
			}}
		>
			{$LL.graphence.components.grid.buttons.InsertAbove()}
		</button>
		<button
			class="btn btn-xs btn-primary"
			use:melt={$button}
			disabled={!rowIndex}
			on:click={(e) => {
				if (rowIndex) {
					source.splice(rowIndex + 1, 0, {});
					source = [...source];
					setCellsFocus(
						{ x: colIndex || 0, y: rowIndex + 1 || 0 },
						{ x: colIndex || 0, y: rowIndex + 1 || 0 }
					);
				}
			}}
		>
			{$LL.graphence.components.grid.buttons.InsertBelow()}
		</button>
		<button
			class="btn btn-xs btn-primary"
			use:melt={$button}
			disabled={fields.length === 0}
			on:click={(e) => {
				if (rowIndex) {
					source = [...source, {}];
				}
			}}
		>
			{$LL.graphence.components.grid.buttons.append()}
		</button>
		<div class="divider divider-horizontal m-0" use:melt={$separator} />
		<button class="btn btn-xs btn-error" use:melt={$button}>
			{$LL.graphence.components.grid.buttons.remove()}
		</button>
	</div>
	<RevoGrid
		bind:source
		{columns}
		{filter}
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
		bind:refresh
		bind:getSource
	/>
</RoleQuery>
