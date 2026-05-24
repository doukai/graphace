import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import { type Option, stringFromRecord, numberFromRecord, floatFromRecord, dateTimeFromRecord, dateFromRecord, booleanFromRecord, enumFromRecord, stringListFromRecord, numberListFromRecord, floatListFromRecord, booleanListFromRecord, enumListFromRecord, objectFromRecord, objectListFromRecord, stringToString, numberToString, floatToString, booleanToString, enumToString, stringListToString, numberListToString, floatListToString, booleanListToString, enumListToString, objectToRecord, objectListToRecord, createValidators, createConverters, type ScalarFieldProps, type EnumFieldProps, type ObjectFieldProps } from '@graphace/ui-graphql';
import type {
	FileInput,
	QueryFileArgs,
	QueryFileListArgs
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const fileInit: ((value?: FileInput | null | undefined) => FileInput | null | undefined) | undefined = undefined;

export const fileTabs: (($LL: TranslationFunctions, args?: QueryFileListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const fileTab: ((args?: QueryFileListArgs | undefined) => string | undefined) | undefined = undefined;

export const fileTabChange = async (tab: string, args: QueryFileListArgs, value?: (FileInput | null | undefined)[] | null | undefined): Promise<QueryFileListArgs> => {
	return args;
};

export const fileFormTabs: (($LL: TranslationFunctions, args?: QueryFileArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const fileFormTab: ((args?: QueryFileArgs | undefined) => string | undefined) | undefined = undefined;

export const fileFormTabChange = async (tab: string, args: QueryFileArgs, value?: FileInput | null | undefined): Promise<QueryFileArgs> => {
	return args;
};

export type FileFieldsArgs = {
	name?: {} | undefined;
	contentType?: {} | undefined;
	contentLength?: {} | undefined;
	content?: {} | undefined;
	url?: {} | undefined;
};

export type FileFieldsProps = {
	name?: ScalarFieldProps | undefined;
	contentType?: ScalarFieldProps | undefined;
	contentLength?: ScalarFieldProps | undefined;
	content?: ScalarFieldProps | undefined;
	url?: ScalarFieldProps | undefined;
};

export type FileFields = {
	name?: Option<TranslationFunctions, FileInput, QueryFileListArgs, string | null | undefined, FileFieldsArgs['name'], FileFieldsProps['name'], {}> | undefined;
	contentType?: Option<TranslationFunctions, FileInput, QueryFileListArgs, string | null | undefined, FileFieldsArgs['contentType'], FileFieldsProps['contentType'], {}> | undefined;
	contentLength?: Option<TranslationFunctions, FileInput, QueryFileListArgs, number | null | undefined, FileFieldsArgs['contentLength'], FileFieldsProps['contentLength'], {}> | undefined;
	content?: Option<TranslationFunctions, FileInput, QueryFileListArgs, string | null | undefined, FileFieldsArgs['content'], FileFieldsProps['content'], {}> | undefined;
	url?: Option<TranslationFunctions, FileInput, QueryFileListArgs, string | null | undefined, FileFieldsArgs['url'], FileFieldsProps['url'], {}> | undefined;
};

export const fileFields: FileFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('File::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('File::name::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('File::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('File::name::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('File::name::READ');
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
			return $LL.graphql.objects.File.fields.name.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'name');
		}
	},
	contentType: {
		readonly: (value, fieldArg) => {
			return !auth('File::contentType::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('File::contentType::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('File::contentType::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('File::contentType::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('File::contentType::READ');
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
			return $LL.graphql.objects.File.fields.contentType.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'contentType');
		}
	},
	contentLength: {
		readonly: (value, fieldArg) => {
			return !auth('File::contentLength::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('File::contentLength::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('File::contentLength::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('File::contentLength::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('File::contentLength::READ');
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
			return $LL.graphql.objects.File.fields.contentLength.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return numberFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return numberToString(value, 'contentLength');
		}
	},
	content: {
		readonly: (value, fieldArg) => {
			return !auth('File::content::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('File::content::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('File::content::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('File::content::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('File::content::READ');
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
			return $LL.graphql.objects.File.fields.content.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'content');
		}
	},
	url: {
		readonly: (value, fieldArg) => {
			return !auth('File::url::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('File::url::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('File::url::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('File::url::READ');
		},
		hiddenFilter: (args, fieldArg) => {
			return !auth('File::url::READ');
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
			return $LL.graphql.objects.File.fields.url.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			return stringFromRecord(record, title);
		},
		toString: ($LL, value, fieldArg) => {
			return stringToString(value, 'url');
		}
	}
};

export const { validateRequired, validateErrors, validate, validateAll } = createValidators<FileInput, FileFields>(fileFields);

export const { toRecords, toErrors, fromRecords } = createConverters<FileInput, FileFields, FileFieldsArgs>(fileFields);
