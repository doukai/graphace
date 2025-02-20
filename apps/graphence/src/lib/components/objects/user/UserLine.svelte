<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		type ChartData,
		type Point
	} from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import { type Field } from '@graphace/graphql';
	import type { User, UserConnection, UserConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: UserConnection;
	export let fields: Field[] = [];
	export let queryArguments: UserConnectionQueryArguments = {};
	export let getFieldName: (fieldName: string, subFieldName?: string) => string;

	Chart.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		autocolors
	);

	let data: ChartData<'line', (number | Point)[], unknown> = { datasets: [] };

	$: if (connection) {
		const nodes = connection?.edges?.map((edge) => edge?.node);
		if (nodes) {
			data = {
				labels: nodes?.map((node) =>
					queryArguments.groupBy?.map((column) => node?.[column as keyof User]).join(' - ')
				),
				datasets: fields.flatMap((field) => {
					if (field.fields && field.fields.length > 0) {
						return field.fields.map((subField) => ({
							label: getFieldName(field.name, subField.name),
							data: nodes?.map((node) => {
								const object = node?.[field.name as keyof User];
								return object?.[subField.name as keyof typeof object];
							})
						}));
					} else {
						return [
							{
								label: getFieldName(field.name),
								data: nodes?.map((node) => node?.[field.name as keyof User])
							}
						];
					}
				})
			};
		}
	}
</script>

<Line {data} options={{ responsive: true, maintainAspectRatio: false }} />