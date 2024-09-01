<script lang="ts">
	import { Card, Combobox } from '@graphace/ui';
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	// export let data: PageData;
	export const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
			{
				label: '% of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 134,159,0.4)',
					'rgba(98,  182, 239,0.4)',
					'rgba(255, 218, 128,0.4)',
					'rgba(113, 205, 205,0.4)',
					'rgba(170, 128, 252,0.4)',
					'rgba(255, 177, 101,0.4)'
				],
				borderWidth: 2,
				borderColor: [
					'rgba(255, 134, 159, 1)',
					'rgba(98,  182, 239, 1)',
					'rgba(255, 218, 128, 1)',
					'rgba(113, 205, 205, 1)',
					'rgba(170, 128, 252, 1)',
					'rgba(255, 177, 101, 1)'
				]
			}
		]
	};
</script>

<Card>
	<div class="flex justify-between">
		<Combobox multiple={true} />
		<Combobox multiple={true} />
		<Combobox multiple={true} />
	</div>
	<div class="divider" />
	<div class="card-body max-h-[calc(100vh-14rem)]">
		<Bar {data} options={{ responsive: true }} />
	</div>
</Card>
