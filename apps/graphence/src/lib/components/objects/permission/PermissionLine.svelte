<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import {
		type ChartData,
		type Point,
		Chart,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import { type Field } from '@graphace/graphql';
	import type { Permission, QueryPermissionListArgs } from '~/lib/types/schema';

	export let value: (Permission | null | undefined)[] | null | undefined = undefined;
	export let fields: Field[] = [];
	export let args: QueryPermissionListArgs = {};
	export let separator: string = '-';
	export let getFieldName: (fieldName: string, subFieldName?: string) => string | undefined;
	let className: string | undefined = 'w-full h-full';
	export { className as class };

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

	$: data = {
		labels: value?.map((node) =>
			args.groupBy?.map((column) => node?.[column as keyof Permission]).join(separator) || ''
		) || [],
		datasets: fields.flatMap((field) => {
			if (field.fields && field.fields.length > 0) {
				return field.fields.map((subField) => ({
					label: getFieldName(field.name, subField.name),
					data: value?.map((node) => {
						const object = node?.[field.name as keyof Permission];
						return object?.[subField.name as keyof typeof object];
					}) || []
				}));
			} else {
				return [
					{
						label: getFieldName(field.name),
						data: value?.map((node) => node?.[field.name as keyof Permission]) || []
					}
				];
			}
		})
	} as ChartData<'line', (number | Point)[], unknown>;
</script>

<div class={className}>
	<Line {data} options={{ responsive: true, maintainAspectRatio: false }} />
</div>