<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal, Funnel, Bookmark } from '@steeze-ui/heroicons';
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
	import { PermissionsStore } from '@graphace/commons';
	import { Field } from '@graphace/graphql';
	import { Combobox, Group, Pagination, type Option } from '@graphace/ui';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import type { UserConnection, UserConnectionQueryArguments } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;

	export let data: ChartData<'bar', (number | [number, number])[], unknown> = { datasets: [] };
	export let connecton: UserConnection;
	export let fields: Field[] = [];
	export let queryArguments: UserConnectionQueryArguments = {};
	export let selectColumns: Option[] = [];
	export let groupByColumns: Option[] = [];
	export let orderByColumns: Option[] = [];
	export let totalCount: number = 0;
	export let pageNumber: number = 1;
	export let pageSize: number = 10;
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, autocolors);

	const dispatch = createEventDispatcher<{
		query: { fields: Field[]; queryArguments: UserConnectionQueryArguments };
		bookmark: { fields: string; queryArguments: string };
	}>();

	const selectOptions = [
		{
			value: '',
			label: $LL.graphql.objects.User.fields.name.name(),
			options: [
				{
					value: 'nameCount',
					label: $LL.graphql.objects.User.fields.nameCount.name()
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.User.fields.nameMax.name()
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.User.fields.nameMin.name()
				}
			],
			disabled: !permissions.auth('User::name::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.User.fields.description.name(),
			options: [
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.User.fields.descriptionCount.name()
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.User.fields.descriptionMax.name()
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.User.fields.descriptionMin.name()
				}
			],
			disabled: !permissions.auth('User::description::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.User.fields.lastName.name(),
			options: [
				{
					value: 'lastNameCount',
					label: $LL.graphql.objects.User.fields.lastNameCount.name()
				},
				{
					value: 'lastNameMax',
					label: $LL.graphql.objects.User.fields.lastNameMax.name()
				},
				{
					value: 'lastNameMin',
					label: $LL.graphql.objects.User.fields.lastNameMin.name()
				}
			],
			disabled: !permissions.auth('User::lastName::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.User.fields.login.name(),
			options: [
				{
					value: 'loginCount',
					label: $LL.graphql.objects.User.fields.loginCount.name()
				},
				{
					value: 'loginMax',
					label: $LL.graphql.objects.User.fields.loginMax.name()
				},
				{
					value: 'loginMin',
					label: $LL.graphql.objects.User.fields.loginMin.name()
				}
			],
			disabled: !permissions.auth('User::login::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.User.fields.email.name(),
			options: [
				{
					value: 'emailCount',
					label: $LL.graphql.objects.User.fields.emailCount.name()
				},
				{
					value: 'emailMax',
					label: $LL.graphql.objects.User.fields.emailMax.name()
				},
				{
					value: 'emailMin',
					label: $LL.graphql.objects.User.fields.emailMin.name()
				}
			],
			disabled: !permissions.auth('User::email::READ')
		},
		{
			value: 'groupsAggregate',
			label: $LL.graphql.objects.User.fields.groups.name(),
			options: [
				{
					value: 'idCount',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.idCount.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'idMax',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.idMax.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'idMin',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.idMin.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'nameCount',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.nameCount.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'nameMax',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.nameMax.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'nameMin',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.nameMin.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'descriptionCount',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.descriptionCount.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'descriptionMax',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.descriptionMax.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'descriptionMin',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.descriptionMin.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'pathCount',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.pathCount.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'pathMax',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.pathMax.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'pathMin',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.pathMin.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'parentIdCount',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.parentIdCount.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'parentIdMax',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.parentIdMax.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'parentIdMin',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.parentIdMin.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'deepCount',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.deepCount.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepSum',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.deepSum.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepAvg',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.deepAvg.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepMax',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.deepMax.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepMin',
					label:
						$LL.graphql.objects.User.fields.groups.name() +
						$LL.graphql.objects.Group.fields.deepMin.name(),
					disabled: !permissions.auth('Group::deep::READ')
				}
			],
			disabled: !permissions.auth('User::groups::READ')
		},
		{
			value: 'rolesAggregate',
			label: $LL.graphql.objects.User.fields.roles.name(),
			options: [
				{
					value: 'idCount',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.idCount.name(),
					disabled: !permissions.auth('Role::id::READ')
				},
				{
					value: 'idMax',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.idMax.name(),
					disabled: !permissions.auth('Role::id::READ')
				},
				{
					value: 'idMin',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.idMin.name(),
					disabled: !permissions.auth('Role::id::READ')
				},
				{
					value: 'nameCount',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.nameCount.name(),
					disabled: !permissions.auth('Role::name::READ')
				},
				{
					value: 'nameMax',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.nameMax.name(),
					disabled: !permissions.auth('Role::name::READ')
				},
				{
					value: 'nameMin',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.nameMin.name(),
					disabled: !permissions.auth('Role::name::READ')
				},
				{
					value: 'descriptionCount',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.descriptionCount.name(),
					disabled: !permissions.auth('Role::description::READ')
				},
				{
					value: 'descriptionMax',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.descriptionMax.name(),
					disabled: !permissions.auth('Role::description::READ')
				},
				{
					value: 'descriptionMin',
					label:
						$LL.graphql.objects.User.fields.roles.name() +
						$LL.graphql.objects.Role.fields.descriptionMin.name(),
					disabled: !permissions.auth('Role::description::READ')
				}
			],
			disabled: !permissions.auth('User::roles::READ')
		}
	];

	let filteredSelectOptions = selectOptions;

	const groupByOptions = [
		{
			value: 'name',
			label: $LL.graphql.objects.User.fields.name.name(),
			disabled: !permissions.auth('User::name::READ')
		},
		{
			value: 'description',
			label: $LL.graphql.objects.User.fields.description.name(),
			disabled: !permissions.auth('User::description::READ')
		},
		{
			value: 'lastName',
			label: $LL.graphql.objects.User.fields.lastName.name(),
			disabled: !permissions.auth('User::lastName::READ')
		},
		{
			value: 'login',
			label: $LL.graphql.objects.User.fields.login.name(),
			disabled: !permissions.auth('User::login::READ')
		},
		{
			value: 'email',
			label: $LL.graphql.objects.User.fields.email.name(),
			disabled: !permissions.auth('User::email::READ')
		},
		{
			value: 'disable',
			label: $LL.graphql.objects.User.fields.disable.name(),
			disabled: !permissions.auth('User::disable::READ')
		}
	];

	let filteredGroupByOptions = groupByOptions;

	if (fields && fields.length > 0) {
		selectColumns = fields.flatMap((field) => {
			if (field.fields && field.fields.length > 0) {
				return selectOptions
					.filter((group) => group.value === field.name)
					.flatMap((group) =>
						field.fields!.flatMap((subField) =>
							group.options
								.filter((option) => option.value === subField.name)
								.map((option) => ({ ...option, group: { value: group.value, label: group.label } }))
						)
					);
			} else {
				return selectOptions
					.filter((group) => !group.value)
					.flatMap((group) =>
						group.options
							.filter((option) => option.value === field.name)
							.map((option) => ({ ...option, group: { value: group.value, label: group.label } }))
					);
			}
		});
	}

	if (queryArguments.groupBy && queryArguments.groupBy.length > 0) {
		groupByColumns = groupByOptions.filter((option) =>
			queryArguments.groupBy?.some((column) => option.value === column)
		);
	}

	$: orderByOptions = [
		...selectColumns,
		...groupByColumns.map((option) => ({
			...option,
			group: { value: '', label: option.label }
		}))
	]
		.reduce((groups, option) => {
			if (
				groups.some(
					(group) => group.value === option.group?.value && group.label === option.group?.label
				)
			) {
				groups
					.find(
						(group) => group.value === option.group?.value && group.label === option.group?.label
					)
					?.options?.push(option);
			} else {
				groups.push({
					value: option.group?.value,
					label: option.group?.label,
					options: [option]
				});
			}
			return groups;
		}, <Group[]>[])
		.map((group) => {
			return {
				value: group.value,
				label: group.label,
				options: group.options?.flatMap((option) => [
					{ value: option.value, label: option.label + $LL.uiGraphql.table.th.asc(), node: 'ASC' },
					{ value: option.value, label: option.label + $LL.uiGraphql.table.th.desc(), node: 'DESC' }
				])
			};
		});

	let filteredOrderByOptions = orderByOptions;

	$: if (queryArguments.orderBy && Object.keys(queryArguments.orderBy).length > 0) {
		orderByColumns = Object.entries(queryArguments.orderBy).flatMap((entry) => {
			if (entry[1] === 'ASC' || entry[1] === 'DESC') {
				return orderByOptions.flatMap((group) =>
					(group.options || [])
						.filter((option) => option.value === entry[0] && option.node === entry[1])
						.map((option) => ({ ...option, group: group }))
				);
			} else {
				return Object.entries(entry[1] || {}).flatMap((subEntry) =>
					orderByOptions
						.filter((group) => group.value === entry[0])
						.flatMap((group) =>
							(group.options || [])
								.filter((option) => option.value === subEntry[0] && option.node === subEntry[1])
								.map((option) => ({ ...option, group: group }))
						)
				);
			}
		});
	}

	if (queryArguments.first) {
		pageSize = queryArguments.first;
	}

	if (queryArguments.offset) {
		pageNumber = queryArguments.offset / pageSize + 1;
	}

	$: if (connecton) {
		data = {
			labels: connecton.edges
				?.map((edge: { node: any }) => edge.node)
				.map((node: { [x: string]: any }) =>
					queryArguments.groupBy?.map((column) => node[column]).join(' - ')
				),
			datasets: fields.flatMap((field) => {
				if (field.fields && field.fields.length > 0) {
					return field.fields.map((subField) => ({
						label: selectOptions
							.filter((group) => group.value === field.name)
							?.flatMap((group) =>
								group.options.filter((option) => option.value === subField.name)
							)[0].label,
						data: nodes.map((node: { [x: string]: any }) => node[field.name][subField.name])
					}));
				} else {
					return [
						{
							label: selectOptions
								.filter((group) => !group.value)
								?.flatMap((group) =>
									group.options.filter((option) => option.value === field.name)
								)[0].label,
							data: nodes.map((node: { [x: string]: any }) => node[field.name])
						}
					];
				}
			})
		};
	}

	const buildFields = (): Field[] => {
		return selectColumns.reduce((fields, option) => {
			if (option.group?.value) {
				if (fields.some((field) => field.name === option.group?.value)) {
					fields
						.find((field) => field.name === option.group?.value)
						?.fields?.push({ name: option.value });
				} else {
					fields.push({ name: option.group.value, fields: [{ name: option.value }] });
				}
			} else {
				fields.push({ name: option.value });
			}
			return fields;
		}, <Field[]>[]);
	};

	const buildArguments = (toPageNumber?: number | undefined): UserConnectionQueryArguments => {
		if (!queryArguments) {
			queryArguments = {};
		}

		if (groupByColumns.length > 0) {
			queryArguments.groupBy = groupByColumns.map((option) => option.value);
		} else {
			queryArguments.groupBy = undefined;
		}

		if (orderByColumns.length > 0) {
			queryArguments.orderBy = Object.fromEntries(
				orderByColumns
					.reduce((groups, option) => {
						if (groups.some((group) => group.value === option.group?.value)) {
							groups
								.find((group) => group.value === option.group?.value)
								?.sorts?.push({ value: option.value, sort: option.node });
						} else {
							if (option.group?.value) {
								groups.push({
									value: option.group?.value,
									sorts: [{ value: option.value, sort: option.node }]
								});
							} else {
								groups.push({
									value: option.value,
									sort: option.node
								});
							}
						}
						return groups;
					}, <{ value: string; sort?: string; sorts?: { value: string; sort: string }[] }[]>[])
					.map((sort) => {
						if (sort.sorts) {
							return [
								sort.value,
								Object.fromEntries(sort.sorts?.map((sort) => [sort.value, sort.sort]))
							];
						} else {
							return [sort.value, sort.sort];
						}
					})
			);
		} else {
			queryArguments.orderBy = undefined;
		}

		queryArguments.offset = ((toPageNumber || pageNumber) - 1) * pageSize;
		queryArguments.first = pageSize;
		return queryArguments;
	};

	const queryPage = (toPageNumber?: number | undefined) => {
		dispatch('query', { fields: buildFields(), queryArguments: buildArguments(toPageNumber) });
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

{#if showHeader}
	<div class="flex space-x-1">
		<Combobox
			title={$LL.graphence.components.agg.columns()}
			multiple={true}
			groups={filteredSelectOptions}
			rootClassName="w-full"
			bind:value={selectColumns}
			on:search={(e) => {
				if (e.detail.searchValue) {
					filteredSelectOptions = selectOptions
						.filter(
							(group) =>
								group.label.includes(e.detail.searchValue || '') ||
								group.options.some((option) => option.label.includes(e.detail.searchValue || ''))
						)
						.map((group) => ({
							...group,
							options: group.options.filter((option) =>
								option.label.includes(e.detail.searchValue || '')
							)
						}));
				} else {
					filteredSelectOptions = selectOptions;
				}
			}}
			on:change={(e) => {
				orderByColumns = orderByColumns.filter(
					(orderColumn) =>
						!Array.isArray(e.detail.value) ||
						e.detail.value.some((selectColumn) => selectColumn.value === orderColumn.value)
				);
				queryPage(1);
			}}
		/>
		{#if showOptionButton}
			<div class="tooltip" data-tip={$LL.graphence.components.agg.option()}>
				<button class="btn btn-square" use:melt={$trigger}>
					<Icon src={AdjustmentsHorizontal} class="h-5 w-5" />
				</button>
			</div>
			{#if $open}
				<div use:melt={$overlay} class="fixed inset-0 z-[50]" />
				<div
					class="space-y-2 md:space-y-1 p-1 rounded-xl bg-base-200 shadow z-[50]"
					use:melt={$content}
				>
					<div use:melt={$arrow} />
					<div class="space-y-1" transition:fade={{ duration: 100 }}>
						<Combobox
							title={$LL.graphence.components.agg.groupBy()}
							multiple={true}
							options={filteredGroupByOptions}
							rootClassName="w-full"
							className="md:input-xs"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							groupClassName="md:input-group-sm"
							bind:value={groupByColumns}
							on:search={(e) => {
								if (e.detail.searchValue) {
									filteredGroupByOptions = groupByOptions.filter((option) =>
										option.label.includes(e.detail.searchValue || '')
									);
								} else {
									filteredGroupByOptions = groupByOptions;
								}
							}}
							on:change={(e) => {
								orderByColumns = orderByColumns.filter(
									(orderColumn) =>
										!Array.isArray(e.detail.value) ||
										e.detail.value.some((groupColumn) => groupColumn.value === orderColumn.value)
								);
								queryPage(1);
							}}
						/>
						<Combobox
							title={$LL.graphence.components.agg.orderBy()}
							multiple={true}
							groups={filteredOrderByOptions}
							rootClassName="w-full"
							className="md:input-xs"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							groupClassName="md:input-group-sm"
							bind:value={orderByColumns}
							on:search={(e) => {
								if (e.detail.searchValue) {
									filteredOrderByOptions = orderByOptions
										.filter(
											(group) =>
												group.label?.includes(e.detail.searchValue || '') ||
												group.options?.some((option) =>
													option.label.includes(e.detail.searchValue || '')
												)
										)
										.map((group) => ({
											...group,
											options: group.options?.filter((option) =>
												option.label.includes(e.detail.searchValue || '')
											)
										}));
								} else {
									filteredOrderByOptions = orderByOptions;
								}
							}}
							on:change={(e) => {
								queryPage(1);
							}}
						/>
					</div>
				</div>
			{/if}
		{/if}
		{#if showFilterButton}
			<UserFilter bind:expression={queryArguments} let:trigger on:filter={(e) => queryPage(1)}>
				<div class="tooltip" data-tip={$LL.graphence.components.agg.filter()}>
					<button class="btn btn-square" use:melt={trigger}>
						<Icon src={Funnel} class="h-5 w-5" />
					</button>
				</div>
			</UserFilter>
		{/if}
		{#if showBookmarkButton}
			<div class="tooltip" data-tip={$LL.graphence.components.agg.bookmark()}>
				<button
					class="btn btn-square"
					on:click={(e) =>
						dispatch('bookmark', {
							fields: JSON.stringify(buildFields()),
							queryArguments: JSON.stringify(buildArguments())
						})}
				>
					<Icon src={Bookmark} class="h-5 w-5" />
				</button>
			</div>
		{/if}
	</div>
	<div class="divider" />
{/if}
<div class="card-body overflow-auto">
	{#if isFetching}
		<div class="flex justify-center">
			<span class="loading loading-bars loading-lg" />
		</div>
	{:else}
		<Bar {data} options={{ responsive: true, maintainAspectRatio: false }} />
	{/if}
</div>
{#if showFooter}
	<div class="divider" />
	<Pagination
		bind:pageNumber
		bind:pageSize
		{totalCount}
		on:pageChange={(e) => queryPage()}
		on:sizeChange={(e) => queryPage()}
	/>
{/if}
