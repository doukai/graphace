<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal, Funnel, Bookmark } from '@steeze-ui/heroicons';
	import { type PermissionsStore } from '@graphace/commons';
	import { type Field } from '@graphace/graphql';
	import { Combobox, type Group as G, Pagination, type Option } from '@graphace/ui';
	import RoleFilter from '~/lib/components/objects/role/RoleFilter.svelte';
	import type { RoleConnectionQueryArguments } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let fields: Field[] = [];
	export let queryArguments: RoleConnectionQueryArguments = {};
	export let selectColumns: Option[] = [];
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
	export let className: string = '';

	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	
	const dispatch = createEventDispatcher<{
		query: { fields: Field[]; queryArguments: RoleConnectionQueryArguments };
		bookmark: { fields: string; queryArguments: string };
	}>();

	$: selectOptions = [
		{
			value: '',
			label: $LL.graphql.objects.Role.name(),
			options: [
				{
					value: 'id',
					label: $LL.graphql.objects.Role.fields.id.name(),
					disabled: !permissions.auth('Role::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.name.name(),
					disabled: !permissions.auth('Role::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.description.name(),
					disabled: !permissions.auth('Role::description::READ')
				},
			]
		},
		{
			value: 'realm',
			label: $LL.graphql.objects.Role.fields.realm.name(),
			options: [
				{
					value: 'id',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.id.name(),
					disabled: !permissions.auth('Realm::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.name.name(),
					disabled: !permissions.auth('Realm::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.description.name(),
					disabled: !permissions.auth('Realm::description::READ')
				},
				{
					value: 'isDeprecated',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.isDeprecated.name(),
					disabled: !permissions.auth('Realm::isDeprecated::READ')
				},
				{
					value: 'version',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.version.name(),
					disabled: !permissions.auth('Realm::version::READ')
				},
				{
					value: 'realmId',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.realmId.name(),
					disabled: !permissions.auth('Realm::realmId::READ')
				},
				{
					value: 'createUserId',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.createUserId.name(),
					disabled: !permissions.auth('Realm::createUserId::READ')
				},
				{
					value: 'createTime',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.createTime.name(),
					disabled: !permissions.auth('Realm::createTime::READ')
				},
				{
					value: 'updateUserId',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.updateUserId.name(),
					disabled: !permissions.auth('Realm::updateUserId::READ')
				},
				{
					value: 'updateTime',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.updateTime.name(),
					disabled: !permissions.auth('Realm::updateTime::READ')
				},
				{
					value: 'createGroupId',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.createGroupId.name(),
					disabled: !permissions.auth('Realm::createGroupId::READ')
				},
				{
					value: 'idCount',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.idCount.name(),
					disabled: !permissions.auth('Realm::idCount::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.idMax.name(),
					disabled: !permissions.auth('Realm::idMax::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.idMin.name(),
					disabled: !permissions.auth('Realm::idMin::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameCount.name(),
					disabled: !permissions.auth('Realm::nameCount::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameMax.name(),
					disabled: !permissions.auth('Realm::nameMax::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameMin.name(),
					disabled: !permissions.auth('Realm::nameMin::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionCount.name(),
					disabled: !permissions.auth('Realm::descriptionCount::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionMax.name(),
					disabled: !permissions.auth('Realm::descriptionMax::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionMin.name(),
					disabled: !permissions.auth('Realm::descriptionMin::READ')
				},
			],
			disabled: !permissions.auth('Role::realm::READ')
		},
	];

	let filteredSelectOptions = selectOptions;

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

	$: selectColumns.reduce((groups, option) => {
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
		}, <G[]>[])
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

	$: orderByOptions = selectColumns.reduce((groups, option) => {
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
		}, <G[]>[])
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

	const buildFields = (): Field[] => {
		fields = selectColumns.reduce((fields, option) => {
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

		return fields;
	};

	const buildArguments = (toPageNumber?: number | undefined): RoleConnectionQueryArguments => {
		if (!queryArguments) {
			queryArguments = {};
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

	export const getFieldName = (fieldName: string, subFieldName?: string): string => {
		if (subFieldName) {
			return selectOptions
				.filter((group) => group.value === fieldName)
				?.flatMap((group) => group.options.filter((option) => option.value === subFieldName))[0]
				.label;
		} else {
			return (
				selectOptions
					.filter((group) => !group.value)
					?.flatMap((group) => group.options.filter((option) => option.value === fieldName))?.[0] ||
				selectOptions.find((group) => group.value === fieldName)
			).label;
		}
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
			<RoleFilter bind:expression={queryArguments} let:trigger on:filter={(e) => queryPage(1)}>
				<div class="tooltip" data-tip={$LL.graphence.components.agg.filter()}>
					<button class="btn btn-square" use:melt={trigger}>
						<Icon src={Funnel} class="h-5 w-5" />
					</button>
				</div>
			</RoleFilter>
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
<div class="card-body overflow-auto {className}">
	{#if isFetching}
		<div class="flex justify-center">
			<span class="loading loading-bars loading-lg" />
		</div>
	{:else}
		<slot {getFieldName} />
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
