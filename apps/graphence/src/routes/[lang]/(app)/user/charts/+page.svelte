<script lang="ts">
	import { Card, Combobox, Pagination } from '@graphace/ui';
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

	const selectOptions = [
		{
			value: 'name',
			label: '姓名',
			options: [
				{ value: 'Count', label: '姓名数量' },
				{ value: 'Sum', label: '姓名合计' },
				{ value: 'Max', label: '姓名最大值' },
				{ value: 'Min', label: '姓名最小值' },
				{ value: 'Avg', label: '姓名平均值' }
			]
		},
		{
			value: 'lastName',
			label: '姓氏',
			options: [
				{ value: 'Count', label: '姓氏数量' },
				{ value: 'Sum', label: '姓氏合计' },
				{ value: 'Max', label: '姓氏最大值' },
				{ value: 'Min', label: '姓氏最小值' },
				{ value: 'Avg', label: '姓氏平均值' }
			]
		}
	];

	const groupByOptions = [
		{ value: 'name', label: '姓名' },
		{ value: 'lastName', label: '姓氏' }
	];

	const orderByOptions = [
		{
			value: 'name',
			label: '姓名',
			options: [
				{ value: 'ASC', label: '姓名正序' },
				{ value: 'DESC', label: '姓名倒序' }
			]
		},
		{
			value: 'lastName',
			label: '姓氏',
			options: [
				{ value: 'ASC', label: '姓氏正序' },
				{ value: 'DESC', label: '姓氏倒序' }
			]
		}
	];
</script>

<Card>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1">
		<Combobox multiple={true} groups={selectOptions} rootClassName="w-full" />
		<Combobox multiple={true} options={groupByOptions} rootClassName="w-full" />
		<Combobox multiple={true} groups={orderByOptions} rootClassName="w-full" />
		<input type="text" class="input input-bordered w-full" />
	</div>
	<div class="divider" />
	<div class="card-body overflow-auto">
		<Bar {data} options={{ responsive: true }} />
	</div>
	<div class="divider" />
	<Pagination />
</Card>
