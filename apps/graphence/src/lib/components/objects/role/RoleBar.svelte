<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
		ChartData
	} from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import { Field } from '@graphace/graphql';
	import RoleAgg from '~/lib/components/objects/role/RoleAgg.svelte';
	import type { Role, RoleConnection, RoleConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: RoleConnection;
	export let fields: Field[] = [];
	export let queryArguments: RoleConnectionQueryArguments = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, autocolors);

	let data: ChartData<'bar', (number | [number, number])[], unknown> = { datasets: [] };
	let getFieldName: (fieldName: string, subFieldName?: string) => string;

	$: if (connection) {
		const nodes = connection.edges?.map((edge) => edge?.node);
		if (nodes) {
			data = {
				labels: nodes?.map((node) =>
					queryArguments.groupBy?.map((column) => node?.[column as keyof Role]).join(' - ')
				),
				datasets: fields.flatMap((field) => {
					if (field.fields && field.fields.length > 0) {
						return field.fields.map((subField) => ({
							label: getFieldName(field.name, subField.name),
							data: nodes?.map((node) => {
								const object = node?.[field.name as keyof Role];
								return object?.[subField.name as keyof typeof object];
							})
						}));
					} else {
						return [
							{
								label: getFieldName(field.name),
								data: nodes?.map((node) => node?.[field.name as keyof Role])
							}
						];
					}
				})
			};
		}
	}
</script>

<RoleAgg
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
	<Bar {data} options={{ responsive: true, maintainAspectRatio: false }} />
</RoleAgg>
