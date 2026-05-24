import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import { type Option, stringFromRecord, numberFromRecord, floatFromRecord, dateTimeFromRecord, dateFromRecord, booleanFromRecord, enumFromRecord, stringListFromRecord, numberListFromRecord, floatListFromRecord, booleanListFromRecord, enumListFromRecord, objectFromRecord, objectListFromRecord, stringToString, numberToString, floatToString, booleanToString, enumToString, stringListToString, numberListToString, floatListToString, booleanListToString, enumListToString, objectToRecord, objectListToRecord, createValidators, createConverters, type ScalarFieldProps, type EnumFieldProps, type ObjectFieldProps } from '@graphace/ui-graphql';
import { userFields, type UserFields } from '~/lib/components/objects/user/UserOption';
import { roleFields, type RoleFields } from '~/lib/components/objects/role/RoleOption';
import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
import type {
	GroupInput,
	QueryGroupArgs,
	QueryGroupListArgs,
	UserInput,
	RoleInput,
	RealmInput
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const groupInit: ((value?: GroupInput | null | undefined) => GroupInput | null | undefined) | undefined = undefined;

export const groupTabs: (($LL: TranslationFunctions, args?: QueryGroupListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const groupTab: ((args?: QueryGroupListArgs | undefined) => string | undefined) | undefined = undefined;

export const groupTabChange = async (tab: string, args: QueryGroupListArgs, value?: (GroupInput | null | undefined)[] | null | undefined): Promise<QueryGroupListArgs> => {
	return args;
};

export const groupFormTabs: (($LL: TranslationFunctions, args?: QueryGroupArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const groupFormTab: ((args?: QueryGroupArgs | undefined) => string | undefined) | undefined = undefined;

export const groupFormTabChange = async (tab: string, args: QueryGroupArgs, value?: GroupInput | null | undefined): Promise<QueryGroupArgs> => {
	return args;
};

export type GroupFieldsArgs = {
	name?: {} | undefined;
	description?: {} | undefined;
	path?: {} | undefined;
	deep?: {} | undefined;
	parentId?: {} | undefined;
	parent?: {} | undefined;
	subGroups?: {} | undefined;
	users?: {} | undefined;
	roles?: {} | undefined;
	realm?: {} | undefined;
};

export type GroupFieldsProps = {
	name?: ScalarFieldProps | undefined;
	description?: ScalarFieldProps | undefined;
	path?: ScalarFieldProps | undefined;
	deep?: ScalarFieldProps | undefined;
	parentId?: ScalarFieldProps | undefined;
	parent?: ObjectFieldProps | undefined;
	subGroups?: ObjectFieldProps | undefined;
	users?: ObjectFieldProps | undefined;
	roles?: ObjectFieldProps | undefined;
	realm?: ObjectFieldProps | undefined;
};

export type GroupFields = {
	name?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, string | null | undefined, GroupFieldsArgs['name'], GroupFieldsProps['name'], {}> | undefined;
	description?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, string | null | undefined, GroupFieldsArgs['description'], GroupFieldsProps['description'], {}> | undefined;
	path?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, string | null | undefined, GroupFieldsArgs['path'], GroupFieldsProps['path'], {}> | undefined;
	deep?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, number | null | undefined, GroupFieldsArgs['deep'], GroupFieldsProps['deep'], {}> | undefined;
	parentId?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, string | null | undefined, GroupFieldsArgs['parentId'], GroupFieldsProps['parentId'], {}> | undefined;
	parent?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, GroupInput | null | undefined, GroupFieldsArgs['parent'], GroupFieldsProps['parent'], GroupFields> | undefined;
	subGroups?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, (GroupInput | null | undefined)[] | null | undefined, GroupFieldsArgs['subGroups'], GroupFieldsProps['subGroups'], GroupFields> | undefined;
	users?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, (UserInput | null | undefined)[] | null | undefined, GroupFieldsArgs['users'], GroupFieldsProps['users'], UserFields> | undefined;
	roles?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, (RoleInput | null | undefined)[] | null | undefined, GroupFieldsArgs['roles'], GroupFieldsProps['roles'], RoleFields> | undefined;
	realm?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, RealmInput | null | undefined, GroupFieldsArgs['realm'], GroupFieldsProps['realm'], RealmFields> | undefined;
};

export const groupFields: GroupFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Group::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::name::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::name::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::name::READ');
		},
		required: (value) => {
			return true;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.name.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'name');
		}
	},
	description: {
		readonly: (value, fieldArg) => {
			return !auth('Group::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::description::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::description::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::description::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.description.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'description');
		}
	},
	path: {
		readonly: (value, fieldArg) => {
			return !auth('Group::path::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::path::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::path::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::path::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::path::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.path.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'path');
		}
	},
	deep: {
		readonly: (value, fieldArg) => {
			return !auth('Group::deep::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::deep::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::deep::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::deep::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::deep::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.deep.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return numberFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return numberToString(value, 'deep');
		}
	},
	parentId: {
		readonly: (value, fieldArg) => {
			return !auth('Group::parentId::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::parentId::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::parentId::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::parentId::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::parentId::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.parentId.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'parentId');
		}
	},
	parent: {
		readonly: (value, fieldArg) => {
			return !auth('Group::parent::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::parent::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::parent::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::parent::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::parent::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.parent.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return objectFromRecord($LL, fields, title, record, fieldArg);
		},
		toFields: (fieldArg) => {
			const { name } = groupFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			return objectToRecord($LL, fields, title, value, 'parent', fieldArg);
		},
		fields: (value, fieldArg) => groupFields
	},
	subGroups: {
		readonly: (value, fieldArg) => {
			return !auth('Group::subGroups::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::subGroups::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::subGroups::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::subGroups::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::subGroups::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.subGroups.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return objectListFromRecord($LL, fields, title, record, fieldArg);
		},
		toFields: (fieldArg) => {
			const { name } = groupFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			return objectListToRecord($LL, fields, title, value, 'subGroups', fieldArg);
		},
		fields: (value, fieldArg) => groupFields
	},
	users: {
		readonly: (value, fieldArg) => {
			return !auth('Group::users::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::users::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::users::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::users::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::users::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.users.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return objectListFromRecord($LL, fields, title, record, fieldArg);
		},
		toFields: (fieldArg) => {
			const { name } = userFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			return objectListToRecord($LL, fields, title, value, 'users', fieldArg);
		},
		fields: (value, fieldArg) => userFields
	},
	roles: {
		readonly: (value, fieldArg) => {
			return !auth('Group::roles::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::roles::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::roles::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::roles::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::roles::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.roles.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return objectListFromRecord($LL, fields, title, record, fieldArg);
		},
		toFields: (fieldArg) => {
			const { name } = roleFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			return objectListToRecord($LL, fields, title, value, 'roles', fieldArg);
		},
		fields: (value, fieldArg) => roleFields
	},
	realm: {
		readonly: (value, fieldArg) => {
			return !auth('Group::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::realm::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Group::realm::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Group::realm::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Group::realm::READ');
		},
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return value;
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Group.fields.realm.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return objectFromRecord($LL, fields, title, record, fieldArg);
		},
		toFields: (fieldArg) => {
			const { name } = realmFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			return objectToRecord($LL, fields, title, value, 'realm', fieldArg);
		},
		fields: (value, fieldArg) => realmFields
	}
};

export const { validateRequired, validateErrors, validate, validateAll } = createValidators<GroupInput, GroupFields>(groupFields);

export const { toRecords, toErrors, fromRecords } = createConverters<GroupInput, GroupFields, GroupFieldsArgs>(groupFields);
