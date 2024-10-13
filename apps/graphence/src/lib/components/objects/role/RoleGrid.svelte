<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { createToolbar, melt } from '@melt-ui/svelte';
	import { RevoGrid } from '@revolist/svelte-datagrid';
	import type { ColumnRegular, ColumnGrouping, DataType, Cell } from '@revolist/svelte-datagrid';
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
	import {
		getGridType,
		getGridTheme,
		createEditors,
		typeFieldTypeHasList,
		buildGraphQLErrors,
		buildGlobalGraphQLErrorMessage
	} from '~/utils';
	import type { Errors } from '@graphace/commons';
	import { messageBoxs, notifications } from '@graphace/ui';

	export let connection: RoleConnection;
	export let fields: Field[] = [];
	export let queryArguments: RoleConnectionQueryArguments = {};
	export let isFetching: boolean = false;
	export let errors: Record<number, Errors> = {};
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const typeName = 'Role';
	const idFieldName = 'id';
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
	let source: DataType[] = [];
	let pageSize: number = 10;
	let gridErrors: Record<string, Errors>[] | undefined = [];
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
	$: editors = createEditors(gridErrors);

	$: columns =
		fieldsDeep(fields) === 1
			? (fields.map((field) => ({
					name: getFieldName(field.name),
					prop: field.name,
					autoSize: true,
					editable: true,
					...getGridType(typeName, field.name),
					cellProperties: ({ rowIndex }) => {
						if (gridErrors?.[rowIndex]?.[field.name]) {
							return {
								class: 'bg-error'
							};
						} else if (source[rowIndex]?.isDeprecated && source[rowIndex]?.isDeprecated === true) {
							return {
								class: 'bg-neutral-content'
							};
						}
						return {};
					}
			  })) as ColumnRegular[])
			: (fields.map((field) => {
					if (field.fields && field.fields.length > 0) {
						return {
							name: getFieldName(field.name),
							children: field.fields.map((subField) => ({
								name: getFieldName(field.name, subField.name),
								prop: `${field.name}.${subField.name}`,
								autoSize: true,
								editable: true,
								...getGridType(typeName, field.name, subField.name),
								cellProperties: ({ rowIndex }) => {
									if (gridErrors?.[rowIndex]?.[`${field.name}.${subField.name}`]) {
										return {
											class: 'bg-error'
										};
									} else if (
										source[rowIndex]?.isDeprecated &&
										source[rowIndex]?.isDeprecated === true
									) {
										return {
											class: 'bg-neutral-content'
										};
									}
									return {};
								}
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
									editable: true,
									...getGridType(typeName, field.name),
									cellProperties: ({ rowIndex }) => {
										if (gridErrors?.[rowIndex]?.[field.name]) {
											return {
												class: 'bg-error'
											};
										} else if (
											source[rowIndex]?.isDeprecated &&
											source[rowIndex]?.isDeprecated === true
										) {
											return {
												class: 'bg-neutral-content'
											};
										}
										return {};
									}
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

	$: if (errors && Object.keys(errors).length) {
		const join = queryFields.find((field) => typeFieldTypeHasList(typeName, field.name));
		gridErrors = nodes?.flatMap((node, nodeIndex) => {
			if (join) {
				const array = node?.[join.name as keyof Role];
				if (Array.isArray(array)) {
					return array
						.map((_, index) => {
							if (join.fields && join.fields.length > 0) {
								return join.fields.map((subField) => [
									`${join.name}.${subField.name}`,
									errors[nodeIndex]?.iterms?.[join.name]?.iterms?.[index]?.iterms?.[subField.name]
								]);
							} else {
								return [[join.name, errors[nodeIndex]?.iterms?.[join.name]]];
							}
						})
						.map((item) =>
							Object.fromEntries([
								...item,
								...queryFields
									.filter((field) => field.name !== join.name)
									.flatMap((field) => {
										if (field.fields && field.fields.length > 0) {
											return field.fields.map((subField) => [
												`${field.name}.${subField.name}`,
												errors[nodeIndex]?.iterms?.[field.name]?.iterms?.[subField.name]
											]);
										} else {
											return [[field.name, errors[nodeIndex]?.iterms?.[field.name]]];
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
							return field.fields.map((subField) => [
								`${field.name}.${subField.name}`,
								errors[nodeIndex]?.iterms?.[field.name]?.iterms?.[subField.name]
							]);
						} else {
							return [[field.name, errors[nodeIndex]?.iterms?.[field.name]]];
						}
					})
				)
			];
		});
	} else {
		gridErrors = [];
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
					row[idFieldName] &&
					nodes.some((node: DataType) => node[idFieldName] === row[idFieldName])
				) {
					nodes
						.find((node: DataType) => node[idFieldName] === row[idFieldName])
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
							[...queryFields, { name: 'isDeprecated' }].map((field) => {
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
					[...queryFields, { name: 'isDeprecated' }].map((field) => {
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

		dispatch('mutation', {
			fields: queryFields,
			mutationArguments: { list: list },
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
			class="btn btn-xs btn-primary pt-0"
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
			disabled={rowIndex === undefined}
			on:click={(e) => {
				if (rowIndex !== undefined) {
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
			disabled={rowIndex === undefined}
			on:click={(e) => {
				if (rowIndex !== undefined) {
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
				source = [...source, {}];
			}}
		>
			{$LL.graphence.components.grid.buttons.append()}
		</button>
		<div class="divider divider-horizontal m-0" use:melt={$separator} />
		<button
			disabled={rowIndex === undefined || source[rowIndex]?.isDeprecated === true}
			on:click={(e) => {
				if (rowIndex !== undefined) {
					source[rowIndex].isDeprecated = true;
					setCellsFocus(
						{ x: colIndex || 0, y: rowIndex || 0 },
						{ x: colIndex || 0, y: rowIndex || 0 }
					);
				}
			}}
			class="btn btn-xs btn-error"
			use:melt={$button}
		>
			{$LL.graphence.components.grid.buttons.remove()}
		</button>
		<button
			disabled={rowIndex === undefined || !source[rowIndex]?.isDeprecated}
			on:click={(e) => {
				if (rowIndex !== undefined) {
					source[rowIndex].isDeprecated = undefined;
					setCellsFocus(
						{ x: colIndex || 0, y: rowIndex || 0 },
						{ x: colIndex || 0, y: rowIndex || 0 }
					);
				}
			}}
			class="btn btn-xs btn-success"
			use:melt={$button}
		>
			{$LL.graphence.components.grid.buttons.canel()}
		</button>
	</div>
	<RevoGrid
		bind:source
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
</RoleQuery>
