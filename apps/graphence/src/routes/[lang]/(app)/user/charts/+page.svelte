<script lang="ts">
	import { Card, Combobox, Group, Pagination, type Option } from '@graphace/ui';
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal } from '@steeze-ui/heroicons';
	import type { UserConnectionQueryArguments } from '~/lib/types/schema';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, autocolors);

	// export let data: PageData;
	export let data = {};

	const selectOptions = [
		{
			value: '',
			label: '姓名',
			options: [
				{ value: 'nameCount', label: '姓名数量' },
				{ value: 'nameMax', label: '姓名最大值' },
				{ value: 'nameMin', label: '姓名最小值' }
			]
		},
		{
			value: '',
			label: '姓氏',
			options: [
				{ value: 'lastNameCount', label: '姓氏数量' },
				{ value: 'lastNameMax', label: '姓氏最大值' },
				{ value: 'lastNameMin', label: '姓氏最小值' }
			]
		},
		{
			value: 'rolesAggregate',
			label: '角色',
			options: [
				{ value: 'nameCount', label: '姓名数量' },
				{ value: 'nameMax', label: '姓名最大值' },
				{ value: 'nameMin', label: '姓名最小值' }
			]
		}
	];

	const groupByOptions = [
		{ value: 'name', label: '姓名' },
		{ value: 'lastName', label: '姓氏' }
	];

	// $: orderByOptions = [
	// 	...selectColumns,
	// 	...groupByColumns.map((option) => ({
	// 		...option,
	// 		group: { value: '', label: option.label }
	// 	}))
	// ]
	// 	.reduce((groups, option) => {
	// 		if (
	// 			groups.some(
	// 				(group) => group.value === option.group?.value && group.label === option.group?.label
	// 			)
	// 		) {
	// 			groups
	// 				.find(
	// 					(group) => group.value === option.group?.value && group.label === option.group?.label
	// 				)
	// 				?.options?.push(option);
	// 		} else {
	// 			groups.push({
	// 				value: option.group?.value,
	// 				label: option.group?.label,
	// 				options: [option]
	// 			});
	// 		}
	// 		return groups;
	// 	}, <Group[]>[])
	// 	.map((group) => ({
	// 		value: group.value,
	// 		label: group.label,
	// 		options: group.options?.flatMap((option) => [
	// 			{ value: option.value, label: option.label + '正序', node: 'ASC' },
	// 			{ value: option.value, label: option.label + '倒序', node: 'DESC' }
	// 		])
	// 	}));

	let queryArguments: UserConnectionQueryArguments = {};
	let selectColumns: Option[] = [];
	let groupByColumns: Option[] = [];
	let orderByColumns: Option[] = [];

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});

	const search = () => {
		if (selectColumns.length > 0) {
			let query = `query Query_userConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $files: FileExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $fileUserRelation: FileUserRelationExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $orderBy: UserOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  userConnection(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email files: $files phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId fileUserRelation: $fileUserRelation userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
    totalCount
    edges {
      node {
		${[...selectColumns, ...(queryArguments.groupBy || [])].join('\r\n')}
      }
    }
  }
}`;

			fetch('/graphql', {
				method: 'POST',
				body: JSON.stringify({
					query: query,
					variables: queryArguments
				})
			}).then((response) => {
				if (response.ok) {
					response.json().then((json) => {
						if (queryArguments.groupBy) {
							const nodes = json.data.userConnection.edges.map((edge: { node: any }) => edge.node);
							data = {
								labels: nodes.map((node: { [x: string]: any }) =>
									queryArguments.groupBy?.map((column) => node[column]).join(' - ')
								),
								datasets: selectColumns.map((column) => ({
									label: column,
									data: nodes.map((node: { [x: string]: any }) => node[column.value])
								}))
							};
						}
					});
				}
			});
		}
	};
</script>

<Card>
	<div class="flex space-x-1">
		<Combobox
			title="字段"
			multiple={true}
			groups={selectOptions}
			rootClassName="w-full"
			bind:value={selectColumns}
			on:change={(e) => {
				// if (Array.isArray(e.detail.value)) {
				// 	orderByColumns = orderByColumns.filter(
				// 		(orderColumn) =>
				// 			Array.isArray(e.detail.value) &&
				// 			e.detail.value.some((selectColumn) => selectColumn.value === orderColumn.value)
				// 	);
				// }
				// search();
			}}
		/>
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
						title="分组"
						multiple={true}
						options={groupByOptions}
						rootClassName="w-full"
						className="md:input-xs"
						containerClassName="md:textarea-sm md:min-h-1 max-w-xs"
						tagClassName="md:badge-sm"
						groupClassName="md:input-group-sm"
						labelClassName="md:btn-sm"
						bind:value={groupByColumns}
						on:change={(e) => {
							// if (Array.isArray(e.detail.value)) {
							// 	// orderByColumns = orderByColumns.filter(
							// 	// 	(orderColumn) =>
							// 	// 		Array.isArray(e.detail.value) &&
							// 	// 		e.detail.value.some((groupColumn) => groupColumn.value === orderColumn.value)
							// 	// );
							// 	// queryArguments.groupBy = e.detail.value.map((option) => option.value);
							// }
						}}
					/>
					<Combobox
						title="排序"
						multiple={true}
						rootClassName="w-full"
						className="md:input-xs"
						containerClassName="md:textarea-sm md:min-h-1 max-w-xs"
						tagClassName="md:badge-sm"
						groupClassName="md:input-group-sm"
						labelClassName="md:btn-sm"
						value={orderByColumns}
						on:change={(e) => {
							// if (Array.isArray(e.detail.value)) {
							// 	queryArguments.orderBy = Object.fromEntries(
							// 		e.detail.value.map((option) => [option.group?.value, option.value])
							// 	);
							// }
						}}
					/>
				</div>
			</div>
		{/if}
		<UserFilter name="filter" bind:expression={queryArguments} />
	</div>
	<div class="divider" />
	<div class="card-body overflow-auto">
		<Bar {data} options={{ responsive: true, maintainAspectRatio: false }} />
	</div>
	<div class="divider" />
	<Pagination />
</Card>
