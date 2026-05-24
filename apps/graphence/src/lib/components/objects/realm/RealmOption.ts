import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import { type Option, stringFromRecord, numberFromRecord, floatFromRecord, dateTimeFromRecord, dateFromRecord, booleanFromRecord, enumFromRecord, stringListFromRecord, numberListFromRecord, floatListFromRecord, booleanListFromRecord, enumListFromRecord, objectFromRecord, objectListFromRecord, stringToString, numberToString, floatToString, booleanToString, enumToString, stringListToString, numberListToString, floatListToString, booleanListToString, enumListToString, objectToRecord, objectListToRecord, createValidators, createConverters, type ScalarFieldProps, type EnumFieldProps, type ObjectFieldProps } from '@graphace/ui-graphql';
import type {
	RealmInput,
	QueryRealmArgs,
	QueryRealmListArgs
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const realmInit: ((value?: RealmInput | null | undefined) => RealmInput | null | undefined) | undefined = undefined;

export const realmTabs: (($LL: TranslationFunctions, args?: QueryRealmListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const realmTab: ((args?: QueryRealmListArgs | undefined) => string | undefined) | undefined = undefined;

export const realmTabChange = async (tab: string, args: QueryRealmListArgs, value?: (RealmInput | null | undefined)[] | null | undefined): Promise<QueryRealmListArgs> => {
	return args;
};

export const realmFormTabs: (($LL: TranslationFunctions, args?: QueryRealmArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const realmFormTab: ((args?: QueryRealmArgs | undefined) => string | undefined) | undefined = undefined;

export const realmFormTabChange = async (tab: string, args: QueryRealmArgs, value?: RealmInput | null | undefined): Promise<QueryRealmArgs> => {
	return args;
};

export type RealmFieldsArgs = {
	name?: {} | undefined;
	description?: {} | undefined;
};

export type RealmFieldsProps = {
	name?: ScalarFieldProps | undefined;
	description?: ScalarFieldProps | undefined;
};

export type RealmFields = {
	name?: Option<TranslationFunctions, RealmInput, QueryRealmListArgs, string | null | undefined, RealmFieldsArgs['name'], RealmFieldsProps['name'], {}> | undefined;
	description?: Option<TranslationFunctions, RealmInput, QueryRealmListArgs, string | null | undefined, RealmFieldsArgs['description'], RealmFieldsProps['description'], {}> | undefined;
};

export const realmFields: RealmFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Realm::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Realm::name::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Realm::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Realm::name::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Realm::name::READ');
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
			return $LL.graphql.objects.Realm.fields.name.name();
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
			return !auth('Realm::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Realm::description::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Realm::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Realm::description::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('Realm::description::READ');
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
			return $LL.graphql.objects.Realm.fields.description.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'description');
		}
	}
};

export const { validateRequired, validateErrors, validate, validateAll } = createValidators<RealmInput, RealmFields>(realmFields);

export const { toRecords, toErrors, fromRecords } = createConverters<RealmInput, RealmFields, RealmFieldsArgs>(realmFields);
