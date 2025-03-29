<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal, Funnel, Bookmark } from '@steeze-ui/heroicons';
	import type { PermissionsStore } from '@graphace/commons';
	import { Field, Directive } from '@graphace/graphql';
	import { type Option, Combobox, Form, FormControl, Label, Loading } from '@graphace/ui';
	import GroupFilter from '~/lib/components/objects/group/GroupFilter.svelte';
	import type { QueryGroupListArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let fields: Field[] = [];
	export let args: QueryGroupListArgs = {};
	export let selectColumns: Option[] = [];
	export let groupByColumns: Option[] = [];
	export let orderByColumns: Option[] = [];
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };

	const contextClass = getContext<string>('ui.popover-content') || '';
	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

	const dispatch = createEventDispatcher<{
		query: {
			fields: Field[];
			args: QueryGroupListArgs;
			directives?: Directive[];
		};
		bookmark: { fields: string; args: string; directives?: Directive[] };
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
			label: $LL.graphql.objects.Group.fields.name.name(),
			options: [
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Group.fields.nameCount.name()
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Group.fields.nameMax.name()
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Group.fields.nameMin.name()
				}
			],
			disabled: !permissions.auth('Group::name::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.Group.fields.description.name(),
			options: [
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Group.fields.descriptionCount.name()
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Group.fields.descriptionMax.name()
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Group.fields.descriptionMin.name()
				}
			],
			disabled: !permissions.auth('Group::description::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.Group.fields.path.name(),
			options: [
				{
					value: 'pathCount',
					label: $LL.graphql.objects.Group.fields.pathCount.name()
				},
				{
					value: 'pathMax',
					label: $LL.graphql.objects.Group.fields.pathMax.name()
				},
				{
					value: 'pathMin',
					label: $LL.graphql.objects.Group.fields.pathMin.name()
				}
			],
			disabled: !permissions.auth('Group::path::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.Group.fields.deep.name(),
			options: [
				{
					value: 'deepCount',
					label: $LL.graphql.objects.Group.fields.deepCount.name()
				},
				{
					value: 'deepSum',
					label: $LL.graphql.objects.Group.fields.deepSum.name()
				},
				{
					value: 'deepAvg',
					label: $LL.graphql.objects.Group.fields.deepAvg.name()
				},
				{
					value: 'deepMax',
					label: $LL.graphql.objects.Group.fields.deepMax.name()
				},
				{
					value: 'deepMin',
					label: $LL.graphql.objects.Group.fields.deepMin.name()
				}
			],
			disabled: !permissions.auth('Group::deep::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.Group.fields.parentId.name(),
			options: [
				{
					value: 'parentIdCount',
					label: $LL.graphql.objects.Group.fields.parentIdCount.name()
				},
				{
					value: 'parentIdMax',
					label: $LL.graphql.objects.Group.fields.parentIdMax.name()
				},
				{
					value: 'parentIdMin',
					label: $LL.graphql.objects.Group.fields.parentIdMin.name()
				}
			],
			disabled: !permissions.auth('Group::parentId::READ')
		},
		{
			value: 'parent',
			label: $LL.graphql.objects.Group.fields.parent.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.idCount.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.idMax.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.idMin.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.nameCount.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.nameMax.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.nameMin.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.descriptionCount.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.descriptionMax.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.descriptionMin.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'pathCount',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.pathCount.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'pathMax',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.pathMax.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'pathMin',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.pathMin.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'parentIdCount',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.parentIdCount.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'parentIdMax',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.parentIdMax.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'parentIdMin',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.parentIdMin.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'deepCount',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.deepCount.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepSum',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.deepSum.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepAvg',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.deepAvg.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepMax',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.deepMax.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepMin',
					label: $LL.graphql.objects.Group.fields.parent.name() + $LL.graphql.objects.Group.fields.deepMin.name(),
					disabled: !permissions.auth('Group::deep::READ')
				}
			],
			disabled: !permissions.auth('Group::parent::READ')
		},
		{
			value: 'realm',
			label: $LL.graphql.objects.Group.fields.realm.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.idCount.name(),
					disabled: !permissions.auth('Realm::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.idMax.name(),
					disabled: !permissions.auth('Realm::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.idMin.name(),
					disabled: !permissions.auth('Realm::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameCount.name(),
					disabled: !permissions.auth('Realm::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameMax.name(),
					disabled: !permissions.auth('Realm::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.nameMin.name(),
					disabled: !permissions.auth('Realm::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionCount.name(),
					disabled: !permissions.auth('Realm::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionMax.name(),
					disabled: !permissions.auth('Realm::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Group.fields.realm.name() + $LL.graphql.objects.Realm.fields.descriptionMin.name(),
					disabled: !permissions.auth('Realm::description::READ')
				}
			],
			disabled: !permissions.auth('Group::realm::READ')
		},
		{
			value: 'subGroupsAggregate',
			label: $LL.graphql.objects.Group.fields.subGroups.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.idCount.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.idMax.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.idMin.name(),
					disabled: !permissions.auth('Group::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.nameCount.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.nameMax.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.nameMin.name(),
					disabled: !permissions.auth('Group::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.descriptionCount.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.descriptionMax.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.descriptionMin.name(),
					disabled: !permissions.auth('Group::description::READ')
				},
				{
					value: 'pathCount',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.pathCount.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'pathMax',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.pathMax.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'pathMin',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.pathMin.name(),
					disabled: !permissions.auth('Group::path::READ')
				},
				{
					value: 'parentIdCount',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.parentIdCount.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'parentIdMax',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.parentIdMax.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'parentIdMin',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.parentIdMin.name(),
					disabled: !permissions.auth('Group::parentId::READ')
				},
				{
					value: 'deepCount',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.deepCount.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepSum',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.deepSum.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepAvg',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.deepAvg.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepMax',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.deepMax.name(),
					disabled: !permissions.auth('Group::deep::READ')
				},
				{
					value: 'deepMin',
					label: $LL.graphql.objects.Group.fields.subGroups.name() + $LL.graphql.objects.Group.fields.deepMin.name(),
					disabled: !permissions.auth('Group::deep::READ')
				}
			],
			disabled: !permissions.auth('Group::subGroups::READ')
		},
		{
			value: 'usersAggregate',
			label: $LL.graphql.objects.Group.fields.users.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.idCount.name(),
					disabled: !permissions.auth('User::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.idMax.name(),
					disabled: !permissions.auth('User::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.idMin.name(),
					disabled: !permissions.auth('User::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.nameCount.name(),
					disabled: !permissions.auth('User::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.nameMax.name(),
					disabled: !permissions.auth('User::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.nameMin.name(),
					disabled: !permissions.auth('User::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.descriptionCount.name(),
					disabled: !permissions.auth('User::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.descriptionMax.name(),
					disabled: !permissions.auth('User::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.descriptionMin.name(),
					disabled: !permissions.auth('User::description::READ')
				},
				{
					value: 'lastNameCount',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.lastNameCount.name(),
					disabled: !permissions.auth('User::lastName::READ')
				},
				{
					value: 'lastNameMax',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.lastNameMax.name(),
					disabled: !permissions.auth('User::lastName::READ')
				},
				{
					value: 'lastNameMin',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.lastNameMin.name(),
					disabled: !permissions.auth('User::lastName::READ')
				},
				{
					value: 'loginCount',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.loginCount.name(),
					disabled: !permissions.auth('User::login::READ')
				},
				{
					value: 'loginMax',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.loginMax.name(),
					disabled: !permissions.auth('User::login::READ')
				},
				{
					value: 'loginMin',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.loginMin.name(),
					disabled: !permissions.auth('User::login::READ')
				},
				{
					value: 'saltCount',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.saltCount.name(),
					disabled: !permissions.auth('User::salt::READ')
				},
				{
					value: 'saltMax',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.saltMax.name(),
					disabled: !permissions.auth('User::salt::READ')
				},
				{
					value: 'saltMin',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.saltMin.name(),
					disabled: !permissions.auth('User::salt::READ')
				},
				{
					value: 'hashCount',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.hashCount.name(),
					disabled: !permissions.auth('User::hash::READ')
				},
				{
					value: 'hashMax',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.hashMax.name(),
					disabled: !permissions.auth('User::hash::READ')
				},
				{
					value: 'hashMin',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.hashMin.name(),
					disabled: !permissions.auth('User::hash::READ')
				},
				{
					value: 'emailCount',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.emailCount.name(),
					disabled: !permissions.auth('User::email::READ')
				},
				{
					value: 'emailMax',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.emailMax.name(),
					disabled: !permissions.auth('User::email::READ')
				},
				{
					value: 'emailMin',
					label: $LL.graphql.objects.Group.fields.users.name() + $LL.graphql.objects.User.fields.emailMin.name(),
					disabled: !permissions.auth('User::email::READ')
				}
			],
			disabled: !permissions.auth('Group::users::READ')
		},
		{
			value: 'rolesAggregate',
			label: $LL.graphql.objects.Group.fields.roles.name(),
			options: [
				{
					value: 'idCount',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.idCount.name(),
					disabled: !permissions.auth('Role::id::READ')
				},
				{
					value: 'idMax',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.idMax.name(),
					disabled: !permissions.auth('Role::id::READ')
				},
				{
					value: 'idMin',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.idMin.name(),
					disabled: !permissions.auth('Role::id::READ')
				},
				{
					value: 'nameCount',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.nameCount.name(),
					disabled: !permissions.auth('Role::name::READ')
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.nameMax.name(),
					disabled: !permissions.auth('Role::name::READ')
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.nameMin.name(),
					disabled: !permissions.auth('Role::name::READ')
				},
				{
					value: 'descriptionCount',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.descriptionCount.name(),
					disabled: !permissions.auth('Role::description::READ')
				},
				{
					value: 'descriptionMax',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.descriptionMax.name(),
					disabled: !permissions.auth('Role::description::READ')
				},
				{
					value: 'descriptionMin',
					label: $LL.graphql.objects.Group.fields.roles.name() + $LL.graphql.objects.Role.fields.descriptionMin.name(),
					disabled: !permissions.auth('Role::description::READ')
				}
			],
			disabled: !permissions.auth('Group::roles::READ')
		}
	];

	let filteredSelectOptions = selectOptions;

	$: groupByOptions = [
		{
			value: 'name',
			label: $LL.graphql.objects.Group.fields.name.name(),
			disabled: !permissions.auth('Group::name::READ')
		},
		{
			value: 'description',
			label: $LL.graphql.objects.Group.fields.description.name(),
			disabled: !permissions.auth('Group::description::READ')
		},
		{
			value: 'path',
			label: $LL.graphql.objects.Group.fields.path.name(),
			disabled: !permissions.auth('Group::path::READ')
		},
		{
			value: 'deep',
			label: $LL.graphql.objects.Group.fields.deep.name(),
			disabled: !permissions.auth('Group::deep::READ')
		},
		{
			value: 'parentId',
			label: $LL.graphql.objects.Group.fields.parentId.name(),
			disabled: !permissions.auth('Group::parentId::READ')
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

	const buildArguments = (): QueryGroupListArgs => {
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
								multiple={true}
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
			<GroupFilter
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
			</GroupFilter>
		{/if}
		{#if showBookmarkButton}
			<div class="tooltip" data-tip={$LL.graphence.components.agg.bookmark()}>
				<button
					class="btn btn-square"
					on:click={(e) =>
						dispatch('bookmark', {
							fields: JSON.stringify(fields),
							args: JSON.stringify(args)
						})}
				>
					<Icon src={Bookmark} class="h-5 w-5" />
				</button>
			</div>
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