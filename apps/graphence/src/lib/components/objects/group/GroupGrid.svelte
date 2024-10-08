<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { createToolbar, melt } from '@melt-ui/svelte';
	import { RevoGrid } from '@revolist/svelte-datagrid';
	import type { ColumnRegular, ColumnGrouping, DataType } from '@revolist/svelte-datagrid';
	import NumberColumnType from '@revolist/revogrid-column-numeral';
	import SelectColumnType from '@revolist/revogrid-column-select';
	import { type Field, fieldsDeep } from '@graphace/graphql';
	import GroupQuery from '~/lib/components/objects/group/Group.svelte';
	import type { Group, GroupConnection, GroupConnectionQueryArguments } from '~/lib/types/schema';
	import { getGridType, getGridTheme, editors, typeFieldTypeHasList } from '~/utils';

	export let connection: GroupConnection;
	export let fields: Field[] = [];
	export let queryArguments: GroupConnectionQueryArguments = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const typeName = 'Group';
	const themeStore = getContext('theme') as Writable<string | undefined>;

	const columnTypes = {
		numeric: new NumberColumnType(),
		select: new SelectColumnType()
	};

	const {
		elements: { root, button, link, separator },
		builders: { createToolbarGroup }
	} = createToolbar();

	let queryFields: Field[] = [];
	let getFieldName: (fieldName: string, subFieldName?: string) => string;
	let source: DataType[] = [];

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
				const array = node?.[join.name as keyof Group];
				if (Array.isArray(array)) {
					return array
						.map((item) => {
							if (join.fields && join.fields.length > 0) {
								return join.fields.map((subField) => [
									`${join.name}.${subField.name}`,
									item?.[subField.name as keyof typeof item]
								]);
							} else {
								return [[join.name, node?.[join.name as keyof Group]]];
							}
						})
						.map((item) =>
							Object.fromEntries([
								...item,
								...queryFields
									.filter((field) => field.name !== join.name)
									.flatMap((field) => {
										if (field.fields && field.fields.length > 0) {
											const object = node?.[field.name as keyof Group];
											return field.fields.map((subField) => [
												`${field.name}.${subField.name}`,
												object?.[subField.name as keyof typeof object]
											]);
										} else {
											return [[field.name, node?.[field.name as keyof Group]]];
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
							const object = node?.[field.name as keyof Group];
							return field.fields.map((subField) => [
								`${field.name}.${subField.name}`,
								object?.[subField.name as keyof typeof object]
							]);
						} else {
							return [[field.name, node?.[field.name as keyof Group]]];
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

<GroupQuery
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
	<div use:melt={$root} class="flex p-1 bg-base-300 rounded">
		<button class="btn btn-sm btn-neutral" use:melt={$button} on:click={(e) => mutation()}>
			{$LL.graphence.components.grid.captions.save()}
		</button>
		<div class="divider divider-horizontal m-0" use:melt={$separator} />
	</div>
	<RevoGrid
		{source}
		{columns}
		{filter}
		range={true}
		resize={true}
		autoSizeColumn={true}
		{columnTypes}
		{theme}
		{editors}
	/>
</GroupQuery>
