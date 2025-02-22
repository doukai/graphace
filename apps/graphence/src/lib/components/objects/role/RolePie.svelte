<script lang="ts">
	import { Pie } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, ArcElement, CategoryScale, type ChartData } from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import { type Field } from '@graphace/graphql';
	import type { Role, RoleConnection, RoleConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: RoleConnection;
	export let fields: Field[] = [];
	export let queryArguments: RoleConnectionQueryArguments = {};
	export let getFieldName: (fieldName: string, subFieldName?: string) => string;

	Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale, CategoryScale, autocolors);

	let data: ChartData<'pie', number[], unknown> = { datasets: [] };

	$: if (connection) {
		const nodes = connection?.edges?.map((edge) => edge?.node);
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