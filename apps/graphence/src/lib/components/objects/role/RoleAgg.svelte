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
	import { permissions } from '~/utils';
	import type { QueryRoleListArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let fields: Field[] = [];
	export let args: QueryRoleListArgs = {};
	export let selectColumns: Option[] = [];
	export let groupByColumns: Option[] = [];
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
	const { auth } = permissions;

	const dispatch = createEventDispatcher<{
		query: {
			fields: Field[];
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
			label: $LL.graphql.objects.Role.fields.name.name(),
			options: [
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Role.fields.nameCount.name()
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Role.fields.nameMax.name()
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Role.fields.nameMin.name()
				}
			],
			hidden: !auth('Role::name::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.Role.fields.description.name(),
			options: [
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Role.fields.descriptionCount.name()
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Role.fields.descriptionMax.name()
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Role.fields.descriptionMin.name()
				}
			],
			hidden: !auth('Role::description::READ')
		},
		{
			value: 'realm',
			label: $LL.graphql.objects.Role.fields.realm.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.idCount.name(),
					hidden: !auth('Realm::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.idMax.name(),
					hidden: !auth('Realm::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.idMin.name(),
					hidden: !auth('Realm::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameCount.name(),
					hidden: !auth('Realm::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameMax.name(),
					hidden: !auth('Realm::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameMin.name(),
					hidden: !auth('Realm::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionCount.name(),
					hidden: !auth('Realm::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionMax.name(),
					hidden: !auth('Realm::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Role.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionMin.name(),
					hidden: !auth('Realm::description::READ')
				}
			],
			hidden: !auth('Role::realm::READ')
		},
		{
			value: 'usersAggregate',
			label: $LL.graphql.objects.Role.fields.users.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.idCount.name(),
					hidden: !auth('User::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.idMax.name(),
					hidden: !auth('User::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.idMin.name(),
					hidden: !auth('User::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.nameCount.name(),
					hidden: !auth('User::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.nameMax.name(),
					hidden: !auth('User::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.nameMin.name(),
					hidden: !auth('User::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.descriptionCount.name(),
					hidden: !auth('User::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.descriptionMax.name(),
					hidden: !auth('User::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.descriptionMin.name(),
					hidden: !auth('User::description::READ')
				},
				{
					value: 'lastNameCount',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.lastNameCount.name(),
					hidden: !auth('User::lastName::READ')
				},
				{
					value: 'lastNameMax',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.lastNameMax.name(),
					hidden: !auth('User::lastName::READ')
				},
				{
					value: 'lastNameMin',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.lastNameMin.name(),
					hidden: !auth('User::lastName::READ')
				},
				{
					value: 'loginCount',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.loginCount.name(),
					hidden: !auth('User::login::READ')
				},
				{
					value: 'loginMax',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.loginMax.name(),
					hidden: !auth('User::login::READ')
				},
				{
					value: 'loginMin',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.loginMin.name(),
					hidden: !auth('User::login::READ')
				},
				{
					value: 'saltCount',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.saltCount.name(),
					hidden: !auth('User::salt::READ')
				},
				{
					value: 'saltMax',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.saltMax.name(),
					hidden: !auth('User::salt::READ')
				},
				{
					value: 'saltMin',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.saltMin.name(),
					hidden: !auth('User::salt::READ')
				},
				{
					value: 'hashCount',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.hashCount.name(),
					hidden: !auth('User::hash::READ')
				},
				{
					value: 'hashMax',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.hashMax.name(),
					hidden: !auth('User::hash::READ')
				},
				{
					value: 'hashMin',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.hashMin.name(),
					hidden: !auth('User::hash::READ')
				},
				{
					value: 'emailCount',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.emailCount.name(),
					hidden: !auth('User::email::READ')
				},
				{
					value: 'emailMax',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.emailMax.name(),
					hidden: !auth('User::email::READ')
				},
				{
					value: 'emailMin',
					label: $LL.graphql.objects.Role.fields.users.name() + $LL.graphql.objects.User.fields.emailMin.name(),
					hidden: !auth('User::email::READ')
				}
			],
			hidden: !auth('Role::users::READ')
		},
		{
			value: 'groupsAggregate',
			label: $LL.graphql.objects.Role.fields.groups.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.idCount.name(),
					hidden: !auth('Group::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.idMax.name(),
					hidden: !auth('Group::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.idMin.name(),
					hidden: !auth('Group::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.nameCount.name(),
					hidden: !auth('Group::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.nameMax.name(),
					hidden: !auth('Group::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.nameMin.name(),
					hidden: !auth('Group::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.descriptionCount.name(),
					hidden: !auth('Group::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.descriptionMax.name(),
					hidden: !auth('Group::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.descriptionMin.name(),
					hidden: !auth('Group::description::READ')
				},
				{
					value: 'pathCount',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.pathCount.name(),
					hidden: !auth('Group::path::READ')
				},
				{
					value: 'pathMax',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.pathMax.name(),
					hidden: !auth('Group::path::READ')
				},
				{
					value: 'pathMin',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.pathMin.name(),
					hidden: !auth('Group::path::READ')
				},
				{
					value: 'parentIdCount',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.parentIdCount.name(),
					hidden: !auth('Group::parentId::READ')
				},
				{
					value: 'parentIdMax',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.parentIdMax.name(),
					hidden: !auth('Group::parentId::READ')
				},
				{
					value: 'parentIdMin',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.parentIdMin.name(),
					hidden: !auth('Group::parentId::READ')
				},
				{
					value: 'deepCount',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.deepCount.name(),
					hidden: !auth('Group::deep::READ')
				},
				{
					value: 'deepSum',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.deepSum.name(),
					hidden: !auth('Group::deep::READ')
				},
				{
					value: 'deepAvg',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.deepAvg.name(),
					hidden: !auth('Group::deep::READ')
				},
				{
					value: 'deepMax',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.deepMax.name(),
					hidden: !auth('Group::deep::READ')
				},
				{
					value: 'deepMin',
					label: $LL.graphql.objects.Role.fields.groups.name() + $LL.graphql.objects.Group.fields.deepMin.name(),
					hidden: !auth('Group::deep::READ')
				}
			],
			hidden: !auth('Role::groups::READ')
		},
		{
			value: 'compositesAggregate',
			label: $LL.graphql.objects.Role.fields.composites.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.idCount.name(),
					hidden: !auth('Role::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.idMax.name(),
					hidden: !auth('Role::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.idMin.name(),
					hidden: !auth('Role::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.nameCount.name(),
					hidden: !auth('Role::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.nameMax.name(),
					hidden: !auth('Role::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.nameMin.name(),
					hidden: !auth('Role::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.descriptionCount.name(),
					hidden: !auth('Role::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.descriptionMax.name(),
					hidden: !auth('Role::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Role.fields.composites.name() + $LL.graphql.objects.Role.fields.descriptionMin.name(),
					hidden: !auth('Role::description::READ')
				}
			],
			hidden: !auth('Role::composites::READ')
		},
		{
			value: 'permissionsAggregate',
			label: $LL.graphql.objects.Role.fields.permissions.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.idCount.name(),
					hidden: !auth('Permission::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.idMax.name(),
					hidden: !auth('Permission::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.idMin.name(),
					hidden: !auth('Permission::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.nameCount.name(),
					hidden: !auth('Permission::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.nameMax.name(),
					hidden: !auth('Permission::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.nameMin.name(),
					hidden: !auth('Permission::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.descriptionCount.name(),
					hidden: !auth('Permission::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.descriptionMax.name(),
					hidden: !auth('Permission::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.descriptionMin.name(),
					hidden: !auth('Permission::description::READ')
				},
				{
					value: 'fieldCount',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.fieldCount.name(),
					hidden: !auth('Permission::field::READ')
				},
				{
					value: 'fieldMax',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.fieldMax.name(),
					hidden: !auth('Permission::field::READ')
				},
				{
					value: 'fieldMin',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.fieldMin.name(),
					hidden: !auth('Permission::field::READ')
				},
				{
					value: 'typeCount',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.typeCount.name(),
					hidden: !auth('Permission::type::READ')
				},
				{
					value: 'typeMax',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.typeMax.name(),
					hidden: !auth('Permission::type::READ')
				},
				{
					value: 'typeMin',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.typeMin.name(),
					hidden: !auth('Permission::type::READ')
				},
				{
					value: 'permissionTypeCount',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.permissionTypeCount.name(),
					hidden: !auth('Permission::permissionType::READ')
				},
				{
					value: 'permissionTypeMax',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.permissionTypeMax.name(),
					hidden: !auth('Permission::permissionType::READ')
				},
				{
					value: 'permissionTypeMin',
					label: $LL.graphql.objects.Role.fields.permissions.name() + $LL.graphql.objects.Permission.fields.permissionTypeMin.name(),
					hidden: !auth('Permission::permissionType::READ')
				}
			],
			hidden: !auth('Role::permissions::READ')
		}
	];

	let filteredSelectOptions = selectOptions;

	$: groupByOptions = [
		{
			value: 'name',
			label: $LL.graphql.objects.Role.fields.name.name(),
			hidden: !auth('Role::name::READ')
		},
		{
			value: 'description',
			label: $LL.graphql.objects.Role.fields.description.name(),
			hidden: !auth('Role::description::READ')
		},
	];

	let filteredGroupByOptions = groupByOptions;

	$: if (fields && fields.length > 0) {
		selectColumns = fields.flatMap((field) => {
			if (field.fields && field.fields.length > 0) {
				return selectOptions
					.filter((group) => group.value === field.name)
					.flatMap((group) =>
						field.fields!.flatMap((subField) =>
							group.options
								.filter((option) => option.value === subField.name)
								.map((option) => ({
									...option,
									parent: { value: group.value, label: group.label }
								}))
						)
					);
			} else {
				return selectOptions
					.filter((group) => !group.value)
					.flatMap((group) =>
						group.options
							.filter((option) => option.value === field.name)
							.map((option) => ({ ...option, parent: { value: group.value, label: group.label } }))
					);
			}
		});
	}

	$: if (args.groupBy && args.groupBy.length > 0) {
		groupByColumns = groupByOptions.filter((option) =>
			args.groupBy?.some((column) => option.value === column)
		);
	}

	$: orderByOptions = [
		...selectColumns,
		...groupByColumns.map((option) => ({
			...option,
			parent: { value: '', label: option.label }
		}))
	]
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
						.map((option) => ({ ...option, parent: group }))
				);
			} else {
				return Object.entries(entry[1] || {}).flatMap((subEntry) =>
					orderByOptions
						.filter((group) => group.value === entry[0])
						.flatMap((group) =>
							(group.options || [])
								.filter((option) => option.value === subEntry[0] && option.node === subEntry[1])
								.map((option) => ({ ...option, parent: group }))
						)
				);
			}
		});
	}

	const optionsToFields = (): Field[] => {
		return selectColumns.reduce((fields, option) => {
			if (option.parent?.value) {
				if (fields.some((field) => field.name === option.parent?.value)) {
					fields
						.find((field) => field.name === option.parent?.value)
						?.fields?.push(new Field({ name: option.value! }));
				} else {
					fields.push(
						new Field({ name: option.parent.value, fields: [new Field({ name: option.value! })] })
					);
				}
			} else {
				fields.push(new Field({ name: option.value! }));
			}
			return fields;
		}, <Field[]>[]);
	};

	const buildArguments = (): QueryRoleListArgs => {
		if (groupByColumns.length > 0) {
			args.groupBy = groupByColumns.map((option) => option.value!);
		} else {
			args.groupBy = undefined;
		}

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
			return selectOptions
				.find((option) => option.value === fieldName)
				?.options?.find((option) => option.value === subFieldName)?.label;
		} else {
			return (
				selectOptions.find((option) => option.value === fieldName)?.label ||
				selectOptions.flatMap((option) =>
					option.options?.filter((option) => option.value === fieldName)
				)?.[0]?.label
			);
		}
	};

	export const getGrouByName = (fieldName: string): string | undefined => {
		return groupByOptions.find((group) => group.value === fieldName)?.label;
	};

	export const query = () => {
		dispatch('query', { fields, args });
	};

	query();
</script>

{#if showHeader}
	<div class="flex space-x-1">
		<div class="w-full">
			<Combobox
				multiple
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
			<div class="tooltip" data-tip={$LL.graphence.components.agg.option()}>
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
							<Label {id} text={$LL.graphence.components.agg.groupBy()} />
							<Combobox
								multiple
								options={filteredGroupByOptions}
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
									args = buildArguments();
									query();
								}}
							/>
						</FormControl>
						<FormControl let:id>
							<Label {id} text={$LL.graphence.components.agg.orderBy()} />
							<Combobox
								multiple
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
				<div class="tooltip" data-tip={$LL.graphence.components.agg.filter()}>
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
		<slot
			{fields}
			{args}
			{selectOptions}
			{groupByOptions}
			{getFieldName}
			{getGrouByName}
			{query}
			{buildArguments}
		/>
	{/if}
</div>