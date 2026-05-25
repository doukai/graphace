import type { TabInfo } from '@graphace/ui';
import { type Option, stringFromRecord, numberFromRecord, floatFromRecord, dateTimeFromRecord, dateFromRecord, booleanFromRecord, enumFromRecord, stringListFromRecord, numberListFromRecord, floatListFromRecord, booleanListFromRecord, enumListFromRecord, objectFromRecord, objectListFromRecord, stringToString, numberToString, floatToString, booleanToString, enumToString, stringListToString, numberListToString, floatListToString, booleanListToString, enumListToString, objectToRecord, objectListToRecord, createValidators, createConverters } from '@graphace/ui-graphql';
import { groupFields, type GroupFields } from '~/lib/components/objects/group/GroupOption';
import { roleFields, type RoleFields } from '~/lib/components/objects/role/RoleOption';
import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
import type {
	UserInput,
	QueryUserArgs,
	QueryUserListArgs,
	GroupInput,
	RoleInput,
	RealmInput
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const userInit: ((value?: UserInput | null | undefined) => UserInput | null | undefined) | undefined = undefined;

export const userTabs: (($LL: TranslationFunctions, args?: QueryUserListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const userTab: ((args?: QueryUserListArgs | undefined) => string | undefined) | undefined = undefined;

export const userTabChange = async (tab: string, args: QueryUserListArgs, value?: (UserInput | null | undefined)[] | null | undefined): Promise<QueryUserListArgs> => {
	return args;
};

export const userFormTabs: (($LL: TranslationFunctions, args?: QueryUserArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const userFormTab: ((args?: QueryUserArgs | undefined) => string | undefined) | undefined = undefined;

export const userFormTabChange = async (tab: string, args: QueryUserArgs, value?: UserInput | null | undefined): Promise<QueryUserArgs> => {
	return args;
};

export type UserFieldsArgs = {
	name?: {} | undefined;
	description?: {} | undefined;
	lastName?: {} | undefined;
	login?: {} | undefined;
	email?: {} | undefined;
	phones?: {} | undefined;
	disable?: {} | undefined;
	groups?: {} | undefined;
	roles?: {} | undefined;
	realm?: {} | undefined;
};

export type UserFieldsProps = {
	name?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	description?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	lastName?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	login?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	email?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	phones?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	disable?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	groups?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'table'?: {} | undefined;
		'form'?: {} | undefined;
		'combobox'?: {} | undefined;
		'dialog'?: {} | undefined;
		'link'?: {} | undefined;
	} | undefined;
	roles?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'table'?: {} | undefined;
		'form'?: {} | undefined;
		'combobox'?: {} | undefined;
		'dialog'?: {} | undefined;
		'link'?: {} | undefined;
	} | undefined;
	realm?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'table'?: {} | undefined;
		'form'?: {} | undefined;
		'combobox'?: {} | undefined;
		'dialog'?: {} | undefined;
		'link'?: {} | undefined;
	} | undefined;
};

export type UserFields = {
	name?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['name'], UserFieldsProps['name'], {}> | undefined;
	description?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['description'], UserFieldsProps['description'], {}> | undefined;
	lastName?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['lastName'], UserFieldsProps['lastName'], {}> | undefined;
	login?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['login'], UserFieldsProps['login'], {}> | undefined;
	email?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['email'], UserFieldsProps['email'], {}> | undefined;
	phones?: Option<TranslationFunctions, UserInput, QueryUserListArgs, (string | null | undefined)[] | null | undefined, UserFieldsArgs['phones'], UserFieldsProps['phones'], {}> | undefined;
	disable?: Option<TranslationFunctions, UserInput, QueryUserListArgs, boolean | null | undefined, UserFieldsArgs['disable'], UserFieldsProps['disable'], {}> | undefined;
	groups?: Option<TranslationFunctions, UserInput, QueryUserListArgs, (GroupInput | null | undefined)[] | null | undefined, UserFieldsArgs['groups'], UserFieldsProps['groups'], GroupFields> | undefined;
	roles?: Option<TranslationFunctions, UserInput, QueryUserListArgs, (RoleInput | null | undefined)[] | null | undefined, UserFieldsArgs['roles'], UserFieldsProps['roles'], RoleFields> | undefined;
	realm?: Option<TranslationFunctions, UserInput, QueryUserListArgs, RealmInput | null | undefined, UserFieldsArgs['realm'], UserFieldsProps['realm'], RealmFields> | undefined;
};

export const userFields: UserFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('User::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::name::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::name::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::name::READ');
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
			return $LL.graphql.objects.User.fields.name.name();
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
			return !auth('User::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::description::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::description::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::description::READ');
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
			return $LL.graphql.objects.User.fields.description.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'description');
		}
	},
	lastName: {
		readonly: (value, fieldArg) => {
			return !auth('User::lastName::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::lastName::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::lastName::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::lastName::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::lastName::READ');
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
			return $LL.graphql.objects.User.fields.lastName.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'lastName');
		}
	},
	login: {
		readonly: (value, fieldArg) => {
			return !auth('User::login::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::login::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::login::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::login::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::login::READ');
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
			return $LL.graphql.objects.User.fields.login.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'login');
		}
	},
	email: {
		readonly: (value, fieldArg) => {
			return !auth('User::email::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::email::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::email::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::email::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::email::READ');
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
			return $LL.graphql.objects.User.fields.email.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'email');
		}
	},
	phones: {
		readonly: (value, fieldArg) => {
			return !auth('User::phones::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::phones::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::phones::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::phones::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::phones::READ');
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
			return $LL.graphql.objects.User.fields.phones.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringListFromRecord(record, title, '/');
		},
		toString: ($LL, value, fieldArg) => {
			return stringListToString(value, 'phones', '/');
		}
	},
	disable: {
		readonly: (value, fieldArg) => {
			return !auth('User::disable::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::disable::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::disable::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::disable::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::disable::READ');
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
			return $LL.graphql.objects.User.fields.disable.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return booleanFromRecord(record, title, $LL.graphence.components.label.true());
		},
		toString: ($LL, value, fieldArg) => {
			return booleanToString(value, 'disable', $LL.graphence.components.label.true(), $LL.graphence.components.label.false());
		}
	},
	groups: {
		readonly: (value, fieldArg) => {
			return !auth('User::groups::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::groups::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::groups::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::groups::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::groups::READ');
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
			return $LL.graphql.objects.User.fields.groups.name();
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
	roles: {
		readonly: (value, fieldArg) => {
			return !auth('User::roles::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::roles::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::roles::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::roles::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::roles::READ');
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
			return $LL.graphql.objects.User.fields.roles.name();
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
			return !auth('User::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::realm::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('User::realm::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('User::realm::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('User::realm::READ');
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
			return $LL.graphql.objects.User.fields.realm.name();
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

export const { validateRequired, validateErrors, validate, validateAll } = createValidators<UserInput, UserFields>(userFields);

export const { toRecords, toErrors, fromRecords } = createConverters<UserInput, UserFields, UserFieldsArgs>(userFields);
