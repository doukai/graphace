import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import { type Option, stringFromRecord, numberFromRecord, floatFromRecord, dateTimeFromRecord, dateFromRecord, booleanFromRecord, enumFromRecord, stringListFromRecord, numberListFromRecord, floatListFromRecord, booleanListFromRecord, enumListFromRecord, objectFromRecord, objectListFromRecord, stringToString, numberToString, floatToString, booleanToString, enumToString, stringListToString, numberListToString, floatListToString, booleanListToString, enumListToString, objectToRecord, objectListToRecord, createValidators, createConverters, type ScalarFieldProps, type EnumFieldProps, type ObjectFieldProps } from '@graphace/ui-graphql';
import { userFields, type UserFields } from '~/lib/components/objects/user/UserOption';
import { groupFields, type GroupFields } from '~/lib/components/objects/group/GroupOption';
import { permissionFields, type PermissionFields } from '~/lib/components/objects/permission/PermissionOption';
import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
import type {
	RoleInput,
	QueryRoleArgs,
	QueryRoleListArgs,
	UserInput,
	GroupInput,
	PermissionInput,
	RealmInput
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const roleInit: ((value?: RoleInput | null | undefined) => RoleInput | null | undefined) | undefined = undefined;

export const roleTabs: (($LL: TranslationFunctions, args?: QueryRoleListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const roleTab: ((args?: QueryRoleListArgs | undefined) => string | undefined) | undefined = undefined;

export const roleTabChange = async (tab: string, args: QueryRoleListArgs, value?: (RoleInput | null | undefined)[] | null | undefined): Promise<QueryRoleListArgs> => {
	return args;
};

export const roleFormTabs: (($LL: TranslationFunctions, args?: QueryRoleArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const roleFormTab: ((args?: QueryRoleArgs | undefined) => string | undefined) | undefined = undefined;

export const roleFormTabChange = async (tab: string, args: QueryRoleArgs, value?: RoleInput | null | undefined): Promise<QueryRoleArgs> => {
	return args;
};

export type RoleFieldsArgs = {
	name?: {} | undefined;
	description?: {} | undefined;
	users?: {} | undefined;
	groups?: {} | undefined;
	composites?: {} | undefined;
	permissions?: {} | undefined;
	realm?: {} | undefined;
};

export type RoleFieldsProps = {
	name?: ScalarFieldProps | undefined;
	description?: ScalarFieldProps | undefined;
	users?: ObjectFieldProps | undefined;
	groups?: ObjectFieldProps | undefined;
	composites?: ObjectFieldProps | undefined;
	permissions?: ObjectFieldProps | undefined;
	realm?: ObjectFieldProps | undefined;
};

export type RoleFields = {
	name?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, string | null | undefined, RoleFieldsArgs['name'], RoleFieldsProps['name'], {}> | undefined;
	description?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, string | null | undefined, RoleFieldsArgs['description'], RoleFieldsProps['description'], {}> | undefined;
	users?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, (UserInput | null | undefined)[] | null | undefined, RoleFieldsArgs['users'], RoleFieldsProps['users'], UserFields> | undefined;
	groups?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, (GroupInput | null | undefined)[] | null | undefined, RoleFieldsArgs['groups'], RoleFieldsProps['groups'], GroupFields> | undefined;
	composites?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, (RoleInput | null | undefined)[] | null | undefined, RoleFieldsArgs['composites'], RoleFieldsProps['composites'], RoleFields> | undefined;
	permissions?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, (PermissionInput | null | undefined)[] | null | undefined, RoleFieldsArgs['permissions'], RoleFieldsProps['permissions'], PermissionFields> | undefined;
	realm?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, RealmInput | null | undefined, RoleFieldsArgs['realm'], RoleFieldsProps['realm'], RealmFields> | undefined;
};

export const roleFields: RoleFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Role::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::name::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Role::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Role::name::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Role::name::READ');
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
			return $LL.graphql.objects.Role.fields.name.name();
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
			return !auth('Role::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::description::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Role::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Role::description::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Role::description::READ');
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
			return $LL.graphql.objects.Role.fields.description.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'description');
		}
	},
	users: {
		readonly: (value, fieldArg) => {
			return !auth('Role::users::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::users::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Role::users::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Role::users::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Role::users::READ');
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
			return $LL.graphql.objects.Role.fields.users.name();
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
	groups: {
		readonly: (value, fieldArg) => {
			return !auth('Role::groups::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::groups::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Role::groups::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Role::groups::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Role::groups::READ');
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
			return $LL.graphql.objects.Role.fields.groups.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return objectListFromRecord($LL, fields, title, record, fieldArg);
		},
		toFields: (fieldArg) => {
			const { name } = groupFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			return objectListToRecord($LL, fields, title, value, 'groups', fieldArg);
		},
		fields: (value, fieldArg) => groupFields
	},
	composites: {
		readonly: (value, fieldArg) => {
			return !auth('Role::composites::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::composites::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Role::composites::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Role::composites::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Role::composites::READ');
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
			return $LL.graphql.objects.Role.fields.composites.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return objectListFromRecord($LL, fields, title, record, fieldArg);
		},
		toFields: (fieldArg) => {
			const { name } = roleFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			return objectListToRecord($LL, fields, title, value, 'composites', fieldArg);
		},
		fields: (value, fieldArg) => roleFields
	},
	permissions: {
		readonly: (value, fieldArg) => {
			return !auth('Role::permissions::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::permissions::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Role::permissions::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Role::permissions::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Role::permissions::READ');
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
			return $LL.graphql.objects.Role.fields.permissions.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return objectListFromRecord($LL, fields, title, record, fieldArg);
		},
		toFields: (fieldArg) => {
			return {};
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			return objectListToRecord($LL, fields, title, value, 'permissions', fieldArg);
		},
		fields: (value, fieldArg) => permissionFields
	},
	realm: {
		readonly: (value, fieldArg) => {
			return !auth('Role::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::realm::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Role::realm::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Role::realm::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Role::realm::READ');
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
			return $LL.graphql.objects.Role.fields.realm.name();
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

export const { validateRequired, validateErrors, validate, validateAll } = createValidators<RoleInput, RoleFields>(roleFields);

export const { toRecords, toErrors, fromRecords } = createConverters<RoleInput, RoleFields, RoleFieldsArgs>(roleFields);
