import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import { type Option, stringFromRecord, numberFromRecord, floatFromRecord, dateTimeFromRecord, dateFromRecord, booleanFromRecord, enumFromRecord, stringListFromRecord, numberListFromRecord, floatListFromRecord, booleanListFromRecord, enumListFromRecord, objectFromRecord, objectListFromRecord, stringToString, numberToString, floatToString, booleanToString, enumToString, stringListToString, numberListToString, floatListToString, booleanListToString, enumListToString, objectToRecord, objectListToRecord, createValidators, createConverters, type ScalarFieldProps, type EnumFieldProps, type ObjectFieldProps } from '@graphace/ui-graphql';
import { roleFields, type RoleFields } from '~/lib/components/objects/role/RoleOption';
import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
import type {
	PermissionInput,
	QueryPermissionArgs,
	QueryPermissionListArgs,
	RoleInput,
	RealmInput,
	PermissionType
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const permissionInit: ((value?: PermissionInput | null | undefined) => PermissionInput | null | undefined) | undefined = undefined;

export const permissionTabs: (($LL: TranslationFunctions, args?: QueryPermissionListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const permissionTab: ((args?: QueryPermissionListArgs | undefined) => string | undefined) | undefined = undefined;

export const permissionTabChange = async (tab: string, args: QueryPermissionListArgs, value?: (PermissionInput | null | undefined)[] | null | undefined): Promise<QueryPermissionListArgs> => {
	return args;
};

export const permissionFormTabs: (($LL: TranslationFunctions, args?: QueryPermissionArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const permissionFormTab: ((args?: QueryPermissionArgs | undefined) => string | undefined) | undefined = undefined;

export const permissionFormTabChange = async (tab: string, args: QueryPermissionArgs, value?: PermissionInput | null | undefined): Promise<QueryPermissionArgs> => {
	return args;
};

export type PermissionFieldsArgs = {
	name?: {} | undefined;
	description?: {} | undefined;
	field?: {} | undefined;
	type?: {} | undefined;
	permissionType?: {} | undefined;
	roles?: {} | undefined;
	realm?: {} | undefined;
};

export type PermissionFieldsProps = {
	name?: ScalarFieldProps | undefined;
	description?: ScalarFieldProps | undefined;
	field?: ScalarFieldProps | undefined;
	type?: ScalarFieldProps | undefined;
	permissionType?: EnumFieldProps | undefined;
	roles?: ObjectFieldProps | undefined;
	realm?: ObjectFieldProps | undefined;
};

export type PermissionFields = {
	name?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['name'], PermissionFieldsProps['name'], {}> | undefined;
	description?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['description'], PermissionFieldsProps['description'], {}> | undefined;
	field?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['field'], PermissionFieldsProps['field'], {}> | undefined;
	type?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['type'], PermissionFieldsProps['type'], {}> | undefined;
	permissionType?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, PermissionType | null | undefined, PermissionFieldsArgs['permissionType'], PermissionFieldsProps['permissionType'], {}> | undefined;
	roles?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, (RoleInput | null | undefined)[] | null | undefined, PermissionFieldsArgs['roles'], PermissionFieldsProps['roles'], RoleFields> | undefined;
	realm?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, RealmInput | null | undefined, PermissionFieldsArgs['realm'], PermissionFieldsProps['realm'], RealmFields> | undefined;
};

export const permissionFields: PermissionFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::name::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::name::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Permission::name::READ');
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
			return $LL.graphql.objects.Permission.fields.name.name();
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
			return !auth('Permission::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::description::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::description::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Permission::description::READ');
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
			return $LL.graphql.objects.Permission.fields.description.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'description');
		}
	},
	field: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::field::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::field::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::field::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::field::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Permission::field::READ');
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
			return $LL.graphql.objects.Permission.fields.field.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'field');
		}
	},
	type: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::type::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::type::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::type::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::type::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Permission::type::READ');
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
			return $LL.graphql.objects.Permission.fields.type.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'type');
		}
	},
	permissionType: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::permissionType::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::permissionType::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::permissionType::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::permissionType::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Permission::permissionType::READ');
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
			return $LL.graphql.objects.Permission.fields.permissionType.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return enumFromRecord(record, title, $LL.graphql.enums.PermissionType.values);
		},
		toString: ($LL, value, fieldArg) => {
			return enumToString(value, 'permissionType', $LL.graphql.enums.PermissionType.values);
		}
	},
	roles: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::roles::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::roles::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::roles::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::roles::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Permission::roles::READ');
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
			return $LL.graphql.objects.Permission.fields.roles.name();
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
			return !auth('Permission::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::realm::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::realm::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::realm::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Permission::realm::READ');
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
			return $LL.graphql.objects.Permission.fields.realm.name();
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

export const { validateRequired, validateErrors, validate, validateAll } = createValidators<PermissionInput, PermissionFields>(permissionFields);

export const { toRecords, toErrors, fromRecords } = createConverters<PermissionInput, PermissionFields, PermissionFieldsArgs>(permissionFields);
