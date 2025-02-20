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
		type ChartData
	} from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import { type Field } from '@graphace/graphql';
	import type { Group, GroupConnection, GroupConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: GroupConnection;
	export let fields: Field[] = [];
	export let queryArguments: GroupConnectionQueryArguments = {};
	export let getFieldName: (fieldName: string, subFieldName?: string) => string;

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, autocolors);

	let data: ChartData<'bar', (number | [number, number])[], unknown> = { datasets: [] };

	$: if (connection) {
		const nodes = connection?.edges?.map((edge) => edge?.node);
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

<Bar {data} options={{ responsive: true, maintainAspectRatio: false }} />
