<script lang="ts">
	import { Pie } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, ArcElement, CategoryScale, ChartData } from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import { Field } from '@graphace/graphql';
	import GroupAgg from '~/lib/components/objects/group/GroupAgg.svelte';
	import type { Group, GroupConnection, GroupConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: GroupConnection;
	export let fields: Field[] = [];
	export let queryArguments: GroupConnectionQueryArguments = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale, CategoryScale, autocolors);

	let data: ChartData<'pie', number[], unknown> = { datasets: [] };
	let getFieldName: (fieldName: string, subFieldName?: string) => string;

	$: if (connection) {
		const nodes = connection.edges?.map((edge) => edge?.node);
		if (nodes) {
			data = {
				labels: nodes?.map((node) =>
					queryArguments.groupBy?.map((column) => node?.[column as keyof Group]).join(' - ')
				),
				datasets: fields.flatMap((field) => {
					if (field.fields && field.fields.length > 0) {
						return field.fields.map((subField) => ({
							label: getFieldName(field.name, subField.name),
							data: nodes?.map((node) => {
								const object = node?.[field.name as keyof Group];
								return object?.[subField.name as keyof typeof object];
							})
						}));
					} else {
						return [
							{
								label: getFieldName(field.name),
								data: nodes?.map((node) => node?.[field.name as keyof Group])
							}
						];
					}
				})
			};
		}
	}
</script>

<GroupAgg
	bind:fields
	bind:queryArguments
	{isFetching}
	{showHeader}
	{showFooter}
	{showOptionButton}
	{showFilterButton}
	{showBookmarkButton}
	on:query
	on:bookmark
	bind:getFieldName
>
	<Pie
		{data}
		options={{
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				autocolors: {
					mode: 'data'
				}
			}
		}}
	/>
</GroupAgg>
