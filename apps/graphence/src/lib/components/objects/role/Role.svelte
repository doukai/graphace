<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal, Funnel, Bookmark } from '@steeze-ui/heroicons';
	import type { PermissionsStore } from '@graphace/commons';
	import type { Field } from '@graphace/graphql';
	import { Combobox, type Group as G, Pagination, type Option } from '@graphace/ui';
	import RoleFilter from '~/lib/components/objects/role/RoleFilter.svelte';
	import type { RoleConnectionQueryArguments } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { getIdFieldName } from '~/utils';
	
	export let fields: Field[] = [];
	export let queryFields: Field[] = [];
	export let queryArguments: RoleConnectionQueryArguments = {};
	export let selectColumns: Option[] = [];
	export let join: Option | undefined = undefined;
	export let joinColumns: Option[] = [];
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
	const typeName = 'Role';
	const idFieldName = 'id';
	
	const dispatch = createEventDispatcher<{
		query: { fields: Field[]; queryArguments: RoleConnectionQueryArguments };
		bookmark: { fields: string; queryArguments: string };
	}>();

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});

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
			],
			disabled: !permissions.auth('Role::realm::READ')
		},
	];

	let filteredSelectOptions = selectOptions;

	$: joinOptions = [
		{
			value: 'users',
			label: $LL.graphql.objects.Role.fields.users.name(),
			options: [
				{
					value: 'id',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.id.name(),
					disabled: !permissions.auth('User::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.name.name(),
					disabled: !permissions.auth('User::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.description.name(),
					disabled: !permissions.auth('User::description::READ')
				},
				{
					value: 'lastName',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.lastName.name(),
					disabled: !permissions.auth('User::lastName::READ')
				},
				{
					value: 'login',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.login.name(),
					disabled: !permissions.auth('User::login::READ')
				},
				{
					value: 'salt',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.salt.name(),
					disabled: !permissions.auth('User::salt::READ')
				},
				{
					value: 'hash',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.hash.name(),
					disabled: !permissions.auth('User::hash::READ')
				},
				{
					value: 'email',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.email.name(),
					disabled: !permissions.auth('User::email::READ')
				},
				{
					value: 'phones',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.phones.name(),
					disabled: !permissions.auth('User::phones::READ')
				},
				{
					value: 'disable',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.disable.name(),
					disabled: !permissions.auth('User::disable::READ')
				},
				{
					value: 'syncUserPolicy',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.syncUserPolicy.name(),
					disabled: !permissions.auth('User::syncUserPolicy::READ')
				},
			],
			disabled: !permissions.auth('Role::users::READ')
		},
		{
			value: 'groups',
			label: $LL.graphql.objects.Role.fields.groups.name(),
			options: [
				{
					value: 'id',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.id.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.name.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.description.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'path',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.path.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'deep',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.deep.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'parentId',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.parentId.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'syncGroupPolicy',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.syncGroupPolicy.name(),
					disabled: !permissions.auth('Group::syncGroupPolicy::READ')
				},
			],
			disabled: !permissions.auth('Role::groups::READ')
		},
		{
			value: 'composites',
			label: $LL.graphql.objects.Role.fields.composites.name(),
			options: [
				{
					value: 'id',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.id.name(),
					disabled: !permissions.auth('Role::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.name.name(),
					disabled: !permissions.auth('Role::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.description.name(),
					disabled: !permissions.auth('Role::description::READ')
				},
			],
			disabled: !permissions.auth('Role::composites::READ')
		},
		{
			value: 'permissions',
			label: $LL.graphql.objects.Role.fields.permissions.name(),
			options: [
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.name.name(),
					disabled: !permissions.auth('Permission::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.description.name(),
					disabled: !permissions.auth('Permission::description::READ')
				},
				{
					value: 'field',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.field.name(),
					disabled: !permissions.auth('Permission::field::READ')
				},
				{
					value: 'type',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.type.name(),
					disabled: !permissions.auth('Permission::type::READ')
				},
				{
					value: 'permissionType',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.permissionType.name(),
					disabled: !permissions.auth('Permission::permissionType::READ')
				},
				{
					value: 'syncPermissionPolicy',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.syncPermissionPolicy.name(),
					disabled: !permissions.auth('Permission::syncPermissionPolicy::READ')
				},
			],
			disabled: !permissions.auth('Role::permissions::READ')
		},
	];

	let filteredJoinOptions =
		joinOptions?.map((option) => ({
			value: option.value,
			label: option.label,
			disabled: option.disabled
		})) || [];

	$: joinColumnOptions = join
		? joinOptions.find((option) => option.value === join?.value)?.options
		: [];

	let filteredJoinColumnOptions = joinColumnOptions;

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
					{ value: option.value, label: option.label + $LL.ui_graphql.table.th.asc(), node: 'ASC' },
					{ value: option.value, label: option.label + $LL.ui_graphql.table.th.desc(), node: 'DESC' }
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

	const optionsToFields = (): Field[] => {
		return [
			...selectColumns.reduce((fields, option) => {
				if (option.group?.value) {
					if (fields.some((field) => field.name === option.group?.value)) {
						fields
							.find((field) => field.name === option.group?.value)
							?.fields?.push({ name: option.value });
					} else {
						fields.push({
							name: option.group.value,
							fields: [{ name: option.value }]
						});
					}
				} else {
					fields.push({ name: option.value });
				}
				return fields;
			}, <Field[]>[]),
			...(join && joinColumns && joinColumns.length > 0
				? [{ name: join.value, fields: joinColumns?.map((column) => ({ name: column.value })) }]
				: [])
		];
	};

	const buildFields = (): Field[] => {
		fields = optionsToFields();
		return fields;
	};

	const buildQueryFields = (): Field[] => {
		queryFields = optionsToFields().map((field) => {
			if (field.fields) {
				const idFieldName = getIdFieldName(typeName, field.name);
				if (!field.fields.some((subField) => subField.name === idFieldName)) {
					field.fields.push({ name: idFieldName! });
				}
			}
			return field;
		});

		if (!queryFields.some((subField) => subField.name === idFieldName)) {
			queryFields.push({ name: idFieldName });
		}

		return queryFields;
	};

	export const buildArguments = (toPageNumber?: number | undefined, limit?: number | undefined): RoleConnectionQueryArguments => {
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

		queryArguments.offset = ((toPageNumber || pageNumber) - 1) * (limit || pageSize);
		queryArguments.first = limit || pageSize;
		return queryArguments;
	};

	export const getFieldName = (fieldName: string, subFieldName?: string): string => {
		if (subFieldName) {
			return [...selectOptions, ...joinOptions]
				.filter((group) => group.value === fieldName)
				?.flatMap((group) => group.options.filter((option) => option.value === subFieldName))[0]
				.label;
		} else {
			return (
				[...selectOptions, ...joinOptions]
					.filter((group) => !group.value)
					?.flatMap((group) => group.options.filter((option) => option.value === fieldName))?.[0] ||
				[...selectOptions, ...joinOptions].find((group) => group.value === fieldName)
			).label;
		}
	};

	export const queryPage = (toPageNumber?: number | undefined) => {
		buildFields();
		dispatch('query', { fields: buildQueryFields(), queryArguments: buildArguments(toPageNumber) });
	};

	queryPage();
</script>

{#if showHeader}
	<div class="flex space-x-1">
		<Combobox
			title={$LL.graphence.components.query.columns()}
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
			<div class="tooltip" data-tip={$LL.graphence.components.query.option()}>
				<button class="btn btn-square" use:melt={$trigger}>
					<Icon src={AdjustmentsHorizontal} class="h-5 w-5" />
				</button>
			</div>
			{#if $open}
				<div use:melt={$overlay} class="fixed inset-0 z-[100]" />
				<div
					class="p-1 rounded-xl bg-base-200 shadow z-[100]"
					use:melt={$content}
				>
					<div use:melt={$arrow} />
					<div class="space-y-1" transition:fade={{ duration: 100 }}>
						<Combobox
							title={$LL.graphence.components.query.join()}
							options={filteredJoinOptions}
							rootClassName="w-full"
							className="md:input-xs"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							groupClassName="md:input-group-sm"
							bind:value={join}
							on:search={(e) => {
								if (e.detail.searchValue) {
									filteredJoinOptions =
										joinOptions
											?.filter((group) => group.label?.includes(e.detail.searchValue || ''))
											.map((option) => ({
												value: option.value,
												label: option.label,
												disabled: option.disabled
											})) || [];
								} else {
									filteredJoinOptions =
										joinOptions?.map((option) => ({
											value: option.value,
											label: option.label,
											disabled: option.disabled
										})) || [];
								}
							}}
							on:change={(e) => {
								queryPage(1);
							}}
						/>
						<Combobox
							title={$LL.graphence.components.query.joinColumns()}
							multiple={true}
							options={filteredJoinColumnOptions}
							rootClassName="w-full"
							className="md:input-xs"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							groupClassName="md:input-group-sm"
							bind:value={joinColumns}
							on:search={(e) => {
								if (e.detail.searchValue) {
									filteredJoinColumnOptions = joinColumnOptions?.filter((option) =>
										option.label?.includes(e.detail.searchValue || '')
									);
								} else {
									filteredJoinColumnOptions = joinColumnOptions;
								}
							}}
							on:change={(e) => {
								queryPage(1);
							}}
						/>
						<Combobox
							title={$LL.graphence.components.query.orderBy()}
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
				<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
					<button class="btn btn-square" use:melt={trigger}>
						<Icon src={Funnel} class="h-5 w-5" />
					</button>
				</div>
			</RoleFilter>
		{/if}
		{#if showBookmarkButton}
			<div class="tooltip" data-tip={$LL.graphence.components.query.bookmark()}>
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
	<slot name="toolbar" />
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
