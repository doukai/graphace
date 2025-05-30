<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal, Funnel } from '@steeze-ui/heroicons';
	import type { PermissionsStore } from '@graphace/commons';
	import { Field, Directive } from '@graphace/graphql';
	import { type Option, Combobox, Form, FormControl, Label, Loading } from '@graphace/ui';
	import RoleFilter from '~/lib/components/objects/role/RoleFilter.svelte';
	import type { QueryRoleListArgs } from '~/lib/types/schema';
	import { __schema } from '~/utils';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let fields: Field[] = [];
	export let queryFields: Field[] = [];
	export let args: QueryRoleListArgs = {};
	export let selectColumns: Option[] = [];
	export let join: Option | undefined = undefined;
	export let joinColumns: Option[] = [];
	export let orderByColumns: Option[] = [];
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };

	const contextClass = getContext<string>('ui.popover-content') || '';
	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');
	const typeName = 'Role';
	const idFieldName = 'id';

	const dispatch = createEventDispatcher<{
		query: {
			fields: Field[];
			queryFields: Field[];
			args: QueryRoleListArgs;
			directives?: Directive[];
		};
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
					value: 'name',
					label: $LL.graphql.objects.Role.fields.name.name(),
					hidden: !permissions.auth('Role::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.description.name(),
					hidden: !permissions.auth('Role::description::READ')
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
					hidden: !permissions.auth('Realm::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.name.name(),
					hidden: !permissions.auth('Realm::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.description.name(),
					hidden: !permissions.auth('Realm::description::READ')
				},
				{
					value: 'isDeprecated',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.isDeprecated.name(),
					hidden: !permissions.auth('Realm::isDeprecated::READ')
				},
				{
					value: 'version',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.version.name(),
					hidden: !permissions.auth('Realm::version::READ')
				},
				{
					value: 'realmId',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.realmId.name(),
					hidden: !permissions.auth('Realm::realmId::READ')
				},
				{
					value: 'createUserId',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.createUserId.name(),
					hidden: !permissions.auth('Realm::createUserId::READ')
				},
				{
					value: 'createTime',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.createTime.name(),
					hidden: !permissions.auth('Realm::createTime::READ')
				},
				{
					value: 'updateUserId',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.updateUserId.name(),
					hidden: !permissions.auth('Realm::updateUserId::READ')
				},
				{
					value: 'updateTime',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.updateTime.name(),
					hidden: !permissions.auth('Realm::updateTime::READ')
				},
				{
					value: 'createGroupId',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.createGroupId.name(),
					hidden: !permissions.auth('Realm::createGroupId::READ')
				},
			],
			hidden: !permissions.auth('Role::realm::READ')
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
					hidden: !permissions.auth('User::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.name.name(),
					hidden: !permissions.auth('User::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.description.name(),
					hidden: !permissions.auth('User::description::READ')
				},
				{
					value: 'lastName',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.lastName.name(),
					hidden: !permissions.auth('User::lastName::READ')
				},
				{
					value: 'login',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.login.name(),
					hidden: !permissions.auth('User::login::READ')
				},
				{
					value: 'salt',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.salt.name(),
					hidden: !permissions.auth('User::salt::READ')
				},
				{
					value: 'hash',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.hash.name(),
					hidden: !permissions.auth('User::hash::READ')
				},
				{
					value: 'email',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.email.name(),
					hidden: !permissions.auth('User::email::READ')
				},
				{
					value: 'phones',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.phones.name(),
					hidden: !permissions.auth('User::phones::READ')
				},
				{
					value: 'disable',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.disable.name(),
					hidden: !permissions.auth('User::disable::READ')
				},
				{
					value: 'isDeprecated',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.isDeprecated.name(),
					hidden: !permissions.auth('User::isDeprecated::READ')
				},
				{
					value: 'version',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.version.name(),
					hidden: !permissions.auth('User::version::READ')
				},
				{
					value: 'realmId',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.realmId.name(),
					hidden: !permissions.auth('User::realmId::READ')
				},
				{
					value: 'createUserId',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.createUserId.name(),
					hidden: !permissions.auth('User::createUserId::READ')
				},
				{
					value: 'createTime',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.createTime.name(),
					hidden: !permissions.auth('User::createTime::READ')
				},
				{
					value: 'updateUserId',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.updateUserId.name(),
					hidden: !permissions.auth('User::updateUserId::READ')
				},
				{
					value: 'updateTime',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.updateTime.name(),
					hidden: !permissions.auth('User::updateTime::READ')
				},
				{
					value: 'createGroupId',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.createGroupId.name(),
					hidden: !permissions.auth('User::createGroupId::READ')
				},
				{
					value: 'syncUserPolicy',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.syncUserPolicy.name(),
					hidden: !permissions.auth('User::syncUserPolicy::READ')
				}
			],
			hidden: !permissions.auth('Role::users::READ')
		},
		{
			value: 'groups',
			label: $LL.graphql.objects.Role.fields.groups.name(),
			options: [
				{
					value: 'id',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.id.name(),
					hidden: !permissions.auth('Group::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.name.name(),
					hidden: !permissions.auth('Group::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.description.name(),
					hidden: !permissions.auth('Group::description::READ')
				},
				{
					value: 'path',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.path.name(),
					hidden: !permissions.auth('Group::path::READ')
				},
				{
					value: 'deep',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.deep.name(),
					hidden: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'parentId',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.parentId.name(),
					hidden: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'isDeprecated',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.isDeprecated.name(),
					hidden: !permissions.auth('Group::isDeprecated::READ')
				},
				{
					value: 'version',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.version.name(),
					hidden: !permissions.auth('Group::version::READ')
				},
				{
					value: 'realmId',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.realmId.name(),
					hidden: !permissions.auth('Group::realmId::READ')
				},
				{
					value: 'createUserId',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.createUserId.name(),
					hidden: !permissions.auth('Group::createUserId::READ')
				},
				{
					value: 'createTime',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.createTime.name(),
					hidden: !permissions.auth('Group::createTime::READ')
				},
				{
					value: 'updateUserId',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.updateUserId.name(),
					hidden: !permissions.auth('Group::updateUserId::READ')
				},
				{
					value: 'updateTime',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.updateTime.name(),
					hidden: !permissions.auth('Group::updateTime::READ')
				},
				{
					value: 'createGroupId',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.createGroupId.name(),
					hidden: !permissions.auth('Group::createGroupId::READ')
				},
				{
					value: 'syncGroupPolicy',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.syncGroupPolicy.name(),
					hidden: !permissions.auth('Group::syncGroupPolicy::READ')
				}
			],
			hidden: !permissions.auth('Role::groups::READ')
		},
		{
			value: 'composites',
			label: $LL.graphql.objects.Role.fields.composites.name(),
			options: [
				{
					value: 'id',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.id.name(),
					hidden: !permissions.auth('Role::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.name.name(),
					hidden: !permissions.auth('Role::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.description.name(),
					hidden: !permissions.auth('Role::description::READ')
				},
				{
					value: 'isDeprecated',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.isDeprecated.name(),
					hidden: !permissions.auth('Role::isDeprecated::READ')
				},
				{
					value: 'version',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.version.name(),
					hidden: !permissions.auth('Role::version::READ')
				},
				{
					value: 'realmId',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.realmId.name(),
					hidden: !permissions.auth('Role::realmId::READ')
				},
				{
					value: 'createUserId',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.createUserId.name(),
					hidden: !permissions.auth('Role::createUserId::READ')
				},
				{
					value: 'createTime',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.createTime.name(),
					hidden: !permissions.auth('Role::createTime::READ')
				},
				{
					value: 'updateUserId',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.updateUserId.name(),
					hidden: !permissions.auth('Role::updateUserId::READ')
				},
				{
					value: 'updateTime',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.updateTime.name(),
					hidden: !permissions.auth('Role::updateTime::READ')
				},
				{
					value: 'createGroupId',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.createGroupId.name(),
					hidden: !permissions.auth('Role::createGroupId::READ')
				},
				{
					value: 'syncRolePolicy',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.syncRolePolicy.name(),
					hidden: !permissions.auth('Role::syncRolePolicy::READ')
				}
			],
			hidden: !permissions.auth('Role::composites::READ')
		},
		{
			value: 'permissions',
			label: $LL.graphql.objects.Role.fields.permissions.name(),
			options: [
				{
					value: 'name',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.name.name(),
					hidden: !permissions.auth('Permission::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.description.name(),
					hidden: !permissions.auth('Permission::description::READ')
				},
				{
					value: 'field',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.field.name(),
					hidden: !permissions.auth('Permission::field::READ')
				},
				{
					value: 'type',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.type.name(),
					hidden: !permissions.auth('Permission::type::READ')
				},
				{
					value: 'permissionType',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.permissionType.name(),
					hidden: !permissions.auth('Permission::permissionType::READ')
				},
				{
					value: 'isDeprecated',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.isDeprecated.name(),
					hidden: !permissions.auth('Permission::isDeprecated::READ')
				},
				{
					value: 'version',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.version.name(),
					hidden: !permissions.auth('Permission::version::READ')
				},
				{
					value: 'realmId',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.realmId.name(),
					hidden: !permissions.auth('Permission::realmId::READ')
				},
				{
					value: 'createUserId',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.createUserId.name(),
					hidden: !permissions.auth('Permission::createUserId::READ')
				},
				{
					value: 'createTime',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.createTime.name(),
					hidden: !permissions.auth('Permission::createTime::READ')
				},
				{
					value: 'updateUserId',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.updateUserId.name(),
					hidden: !permissions.auth('Permission::updateUserId::READ')
				},
				{
					value: 'updateTime',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.updateTime.name(),
					hidden: !permissions.auth('Permission::updateTime::READ')
				},
				{
					value: 'createGroupId',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.createGroupId.name(),
					hidden: !permissions.auth('Permission::createGroupId::READ')
				},
				{
					value: 'syncPermissionPolicy',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.syncPermissionPolicy.name(),
					hidden: !permissions.auth('Permission::syncPermissionPolicy::READ')
				}
			],
			hidden: !permissions.auth('Role::permissions::READ')
		},
	];

	let filteredJoinOptions =
		joinOptions?.map((option) => ({
			value: option.value,
			label: option.label,
			hidden: option.hidden
		})) || [];

	$: joinColumnOptions = join
		? joinOptions.find((option) => option.value === join?.value)?.options
		: [];

	let filteredJoinColumnOptions = joinColumnOptions;

	$: if (fields && fields.length > 0) {
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

	$: orderByOptions = selectColumns
		.reduce((groups, option) => {
			if (
				groups.some(
					(group) => group.value === option.parent?.value && group.label === option.parent?.label
				)
			) {
				groups
					.find(
						(group) => group.value === option.parent?.value && group.label === option.parent?.label
					)
					?.options?.push(option);
			} else {
				groups.push({
					value: option.parent?.value,
					label: option.parent?.label,
					options: [option]
				});
			}
			return groups;
		}, <Option[]>[])
		.map((group) => {
			return {
				value: group.value,
				label: group.label,
				options: group.options?.flatMap((option) => [
					{ value: option.value, label: option.label + $LL.ui_graphql.table.th.asc(), node: 'ASC' },
					{
						value: option.value,
						label: option.label + $LL.ui_graphql.table.th.desc(),
						node: 'DESC'
					}
				])
			};
		});

	let filteredOrderByOptions = orderByOptions;

	$: if (args.orderBy && Object.keys(args.orderBy).length > 0) {
		orderByColumns = Object.entries(args.orderBy).flatMap((entry) => {
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

	const optionsToFields = (): Field[] => {
		return [
			...selectColumns.reduce((fields, option) => {
				if (option.parent?.value) {
					if (fields.some((field) => field.name === option.parent?.value)) {
						fields
							.find((field) => field.name === option.parent?.value)
							?.fields?.push(new Field({ name: option.value! }));
					} else {
						fields.push(
							new Field({
								name: option.parent.value,
								fields: [new Field({ name: option.value! })]
							})
						);
					}
				} else {
					fields.push(new Field({ name: option.value! }));
				}
				return fields;
			}, <Field[]>[]),
			...(join && joinColumns && joinColumns.length > 0
				? [
						new Field({
							name: join.value!,
							fields: joinColumns?.map((column) => new Field({ name: column.value! }))
						})
				  ]
				: [])
		];
	};

	export const buildArguments = (): QueryRoleListArgs => {
		if (orderByColumns.length > 0) {
			args.orderBy = Object.fromEntries(
				orderByColumns
					.reduce((groups, option) => {
						if (groups.some((group) => group.value === option.parent?.value)) {
							groups
								.find((group) => group.value === option.parent?.value)
								?.sorts?.push({ value: option.value!, sort: option.node });
						} else {
							if (option.parent?.value) {
								groups.push({
									value: option.parent?.value,
									sorts: [{ value: option.value!, sort: option.node }]
								});
							} else {
								groups.push({
									value: option.value!,
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
			args.orderBy = undefined;
		}
		return args;
	};

	export const getFieldName = (fieldName: string, subFieldName?: string): string | undefined => {
		if (subFieldName) {
			return [...selectOptions, ...joinOptions]
				.find((option) => option.value === fieldName)
				?.options?.find((option) => option.value === subFieldName)?.label;
		} else {
			return (
				[...selectOptions, ...joinOptions].find((option) => option.value === fieldName)?.label ||
				[...selectOptions, ...joinOptions].flatMap((option) =>
					option.options?.filter((option) => option.value === fieldName)
				)?.[0]?.label
			);
		}
	};

	export const query = () => {
		queryFields = optionsToFields();
		if (!queryFields.some((subField) => subField.name === idFieldName)) {
			queryFields.push(new Field({ name: idFieldName }));
		}
		queryFields.forEach((field) => {
			if (field.fields) {
				const idFieldName = __schema
					.getType(
						__schema.getType(typeName)?.getField(field.name)?.getType().getNamedType()?.getName()!
					)
					?.getIDField()
					?.getName();
				if (!field.fields.some((subField) => subField.name === idFieldName)) {
					field.fields.push(new Field({ name: idFieldName! }));
				}
			}
		});
		dispatch('query', { fields, queryFields, args });
	};

	query();
</script>

{#if showHeader}
	<div class="flex space-x-1">
		<div class="w-full">
			<Combobox
				multiple={true}
				options={filteredSelectOptions}
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
					fields = optionsToFields();
					query();
				}}
			/>
		</div>
		{#if showOptionButton}
			<div class="tooltip" data-tip={$LL.graphence.components.query.option()}>
				<button class="btn btn-square" use:melt={$trigger}>
					<Icon src={AdjustmentsHorizontal} class="h-5 w-5" />
				</button>
			</div>
			{#if $open}
				<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 7}]" />
				<div class="p-1 z-[{zIndex + 7}] {contextClass}" use:melt={$content}>
					<div use:melt={$arrow} />
					<Form class="max-h-60 overflow-y-auto">
						<FormControl let:id>
							<Label {id} text={$LL.graphence.components.query.join()} />
							<Combobox
								options={filteredJoinOptions}
								bind:value={join}
								on:search={(e) => {
									if (e.detail.searchValue) {
										filteredJoinOptions =
											joinOptions
												?.filter((group) => group.label?.includes(e.detail.searchValue || ''))
												.map((option) => ({
													value: option.value,
													label: option.label,
													hidden: option.hidden
												})) || [];
									} else {
										filteredJoinOptions =
											joinOptions?.map((option) => ({
												value: option.value,
												label: option.label,
												hidden: option.hidden
											})) || [];
									}
								}}
								on:change={(e) => {
									fields = optionsToFields();
									query();
								}}
							/>
						</FormControl>
						<FormControl let:id>
							<Label {id} text={$LL.graphence.components.query.joinColumns()} />
							<Combobox
								multiple={true}
								options={filteredJoinColumnOptions}
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
									fields = optionsToFields();
									query();
								}}
							/>
						</FormControl>
						<FormControl let:id>
							<Label {id} text={$LL.graphence.components.query.orderBy()} />
							<Combobox
								multiple={true}
								options={filteredOrderByOptions}
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
									args = buildArguments();
									query();
								}}
							/>
						</FormControl>
					</Form>
				</div>
			{/if}
		{/if}
		{#if showFilterButton}
			<RoleFilter
				bind:value={args}
				let:trigger
				on:filter={(e) => {
					args = buildArguments();
					query();
				}}
			>
				<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
					<button class="btn btn-square" use:melt={trigger}>
						<Icon src={Funnel} class="h-5 w-5" />
					</button>
				</div>
			</RoleFilter>
		{/if}
	</div>
	<div class="divider" />
{/if}
<div class="overflow-auto {className}">
	{#if isFetching}
		<Loading class="loading-lg" />
	{:else}
		<slot {fields} {queryFields} {args} {selectOptions} {getFieldName} {query} {buildArguments} />
	{/if}
</div>