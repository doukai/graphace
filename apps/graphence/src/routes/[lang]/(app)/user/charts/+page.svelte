<script lang="ts">
	import { Card, Combobox, Pagination } from '@graphace/ui';
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal, Funnel } from '@steeze-ui/heroicons';

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

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

<Card>
	<div class="flex space-x-1">
		<Combobox multiple={true} groups={selectOptions} rootClassName="w-full" />
		<button class="btn btn-square" use:melt={$trigger}>
			<Icon src={AdjustmentsHorizontal} class="h-5 w-5" />
		</button>
		{#if $open}
			<div use:melt={$overlay} class="fixed inset-0 z-[50]" />
			<div
				class="space-y-2 md:space-y-1 p-1 rounded-xl bg-base-200 shadow z-[50]"
				use:melt={$content}
			>
				<div use:melt={$arrow} />
				<div class="space-y-1" transition:fade={{ duration: 100 }}>
					<Combobox
						multiple={true}
						options={groupByOptions}
						rootClassName="w-full"
						className="md:input-sm"
						containerClassName="max-w-xs"
						tagClassName="md:badge-sm"
					/>
					<Combobox
						multiple={true}
						groups={orderByOptions}
						rootClassName="w-full"
						className="md:input-sm"
						containerClassName="max-w-xs"
						tagClassName="md:badge-sm"
					/>
				</div>
			</div>
		{/if}
		<UserFilter />
	</div>
	<div class="divider" />
	<div class="card-body overflow-auto">
		<Bar {data} options={{ responsive: true }} />
	</div>
	<div class="divider" />
	<Pagination />
</Card>
