<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { RevoGrid, type ColumnRegular, type ColumnGrouping } from '@revolist/svelte-datagrid';
	import { type Field, fieldsDeep } from '@graphace/graphql';
	import UserAgg from '~/lib/components/objects/user/UserAgg.svelte';
	import type { User, UserConnection, UserConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: UserConnection;
	export let fields: Field[] = [];
	export let queryArguments: UserConnectionQueryArguments = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	$: nodes = connection.edges?.map((edge) => edge?.node);
	$: totalCount = connection?.totalCount || 0;
	let getFieldName: (fieldName: string, subFieldName?: string) => string;
	let getGrouByName: (fieldName: string) => string;

	const filterFunc = (cellValue: unknown, extraValue: unknown): boolean => {
		return cellValue === extraValue;
	};
	filterFunc.extra = 'input';

	const filterConfig = {
		include: ['EQ', 'NEQ'],
		customFilters: {
			EQ: {
				columnFilterType: 'Operator',
				name: $LL.uiGraphql.table.th.eq(),
				func: filterFunc
			},
			NEQ: {
				columnFilterType: 'Operator',
				name: $LL.uiGraphql.table.th.neq(),
				func: filterFunc
			}
		}
	};

	$: columns =
		fieldsDeep(fields) === 1
			? ([
					...(queryArguments.groupBy || []).map((fieldName) => ({
						name: getGrouByName(fieldName),
						prop: fieldName,
						autoSize: true,
						readonly: true,
						filter: 'Operator'
					})),
					...fields.map((field) => ({
						name: getFieldName(field.name),
						prop: field.name,
						autoSize: true,
						readonly: true,
						filter: false
					}))
			  ] as ColumnRegular[])
			: ([
					...(queryArguments.groupBy || []).map((fieldName) => ({
						name: '',
						children: [
							{
								name: getGrouByName(fieldName),
								prop: fieldName,
								autoSize: true,
								readonly: true,
								filter: 'Operator'
							}
						]
					})),
					...fields.map((field) => {
						if (field.fields && field.fields.length > 0) {
							return {
								name: getFieldName(field.name),
								children: field.fields.map((subField) => ({
									name: subField.name,
									prop: `${field.name}.${subField.name}`,
									autoSize: true,
									readonly: true,
									filter: false
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
										readonly: true,
										filter: false
									}
								]
							};
						}
					})
			  ] as ColumnGrouping[]);

	$: source = nodes?.map((node) =>
		Object.fromEntries([
			...(queryArguments.groupBy || []).map((fieldName) => [
				fieldName,
				node?.[fieldName as keyof User]
			]),
			...fields.flatMap((field) => {
				if (field.fields && field.fields.length > 0) {
					const object = node?.[field.name as keyof User];
					return field.fields.map((subField) => [
						`${field.name}.${subField.name}`,
						object?.[subField.name as keyof typeof object]
					]);
				} else {
					return [[field.name, node?.[field.name as keyof User]]];
				}
			})
		])
	);
</script>

<UserAgg
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
	<RevoGrid {source} {columns} filter={filterConfig} range={true} autoSizeColumn={true} />
</UserAgg>
