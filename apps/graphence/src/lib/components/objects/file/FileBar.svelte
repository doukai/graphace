<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import {
		type ChartData,
		Chart,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	} from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import type { Field } from '@graphace/graphql';
	import type { File, QueryFileListArgs } from '~/lib/types/schema';

	export let value: (File | null | undefined)[] | null | undefined = undefined;
	export let fields: Field[] = [];
	export let args: QueryFileListArgs = {};
	export let separator: string = '-';
	export let getFieldName: (fieldName: string, subFieldName?: string) => string | undefined;
	let className: string | undefined = 'w-full h-full';
	export { className as class };

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, autocolors);

	$: data = {
		labels: value?.map((node) =>
			args.groupBy?.map((column) => node?.[column as keyof File]).join(separator) || ''
		) || [],
		datasets: fields?.flatMap((field) => {
			if (field.fields && field.fields.length > 0) {
				return field.fields.map((subField) => ({
					label: getFieldName(field.name, subField.name),
					data: value?.map((node) => {
						const object = node?.[field.name as keyof File];
						return object?.[subField.name as keyof typeof object];
					}) || []
				}));
			} else {
				return [
					{
						label: getFieldName(field.name),
						data: value?.map((node) => node?.[field.name as keyof File]) || []
					}
				];
			}
		})
	} as ChartData<'bar', (number | [number, number])[], unknown>;
</script>

<div class={className}>
	<Bar {data} options={{ responsive: true, maintainAspectRatio: false }} />
</div>