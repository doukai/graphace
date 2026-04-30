import { format } from 'date-fns';
import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
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

export const userTabChange = async (tab: string, args: QueryUserListArgs, value?: (UserInput | null | undefined)[] | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryUserListArgs) => void,
			reject: (errors: Record<number, Errors>) => void
		) => {
			resolve(args);
		}
	);
};

export const userFormTabs: (($LL: TranslationFunctions, args?: QueryUserArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const userFormTab: ((args?: QueryUserArgs | undefined) => string | undefined) | undefined = undefined;

export const userFormTabChange = async (tab: string, args: QueryUserArgs, value?: UserInput | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryUserArgs) => void,
			reject: (errors: Record<string, Errors>) => void
		) => {
			resolve(args);
		}
	);
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.name.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.name;
			if (fieldValue != null) {
				return fieldValue.toString();
			}
			return '';
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.description.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.description;
			if (fieldValue != null) {
				return fieldValue.toString();
			}
			return '';
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.lastName.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.lastName;
			if (fieldValue != null) {
				return fieldValue.toString();
			}
			return '';
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.login.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.login;
			if (fieldValue != null) {
				return fieldValue.toString();
			}
			return '';
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.email.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.email;
			if (fieldValue != null) {
				return fieldValue.toString();
			}
			return '';
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.phones.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				if (string.includes('/')) {
					return string.split('/');
				} else {
					return [string];
				}
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.phones;
			if (fieldValue != null) {
				return fieldValue.map(item => item != null ? item.toString() : '').join('/');
			}
			return '';
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.disable.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return string === $LL.graphence.components.label.true() ? true : false;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.disable;
			if (fieldValue != null) {
				return fieldValue ? $LL.graphence.components.label.true() : $LL.graphence.components.label.false();
			}
			return '';
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.groups.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			if (fields) {
				const fieldStringArray = Object.fromEntries(
					Object.entries(fields)
						.flatMap(([fieldName, option]) => {
							const string = record?.[title + '-' + (option?.title?.($LL, fieldArg) || fieldName)];
							if (string?.includes('|')) {
								return [[fieldName, string?.split('|')]];
							} else if (string) {
								return [[fieldName, [string]]];
							}
							return [];
						})
				);

				const fieldRecords = Array.from({ length: Object.values(fieldStringArray)[0]?.length || 0 })
					.map((_, row) =>
						Object.fromEntries(
							Object.entries(fieldStringArray)
								.map(([fieldName, stringArray]) =>
									[fieldName, stringArray[row]]
								)
						)
					);

				const value = fieldRecords.map(fieldRecord =>
					Object.fromEntries(
						Object.entries(fields)
							.flatMap(([fieldName, option]) => {
								const fields = option.toFields?.();
								const value = option.fromRecord?.($LL, fields, fieldName, fieldRecord);
								if (value) {
									return [[fieldName, value]];
								}
								return [];
							})
					) as GroupInput | null | undefined
				);

				if (value.length) {
					return value;
				}
			}
			return undefined;
		},
		toFields: (fieldArg) => {
			const { name } = groupFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			const fieldValue = value?.groups;
			return Object.fromEntries(
				Object.entries(fields)
					.map(([fieldName, option]) =>
						[
							[title + '-' + (option?.title?.($LL, fieldArg) || fieldName)],
							fieldValue?.map(item => option?.toString?.($LL, item, fieldArg) || '').join('|') || ''
						]
					)
			);
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.roles.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			if (fields) {
				const fieldStringArray = Object.fromEntries(
					Object.entries(fields)
						.flatMap(([fieldName, option]) => {
							const string = record?.[title + '-' + (option?.title?.($LL, fieldArg) || fieldName)];
							if (string?.includes('|')) {
								return [[fieldName, string?.split('|')]];
							} else if (string) {
								return [[fieldName, [string]]];
							}
							return [];
						})
				);

				const fieldRecords = Array.from({ length: Object.values(fieldStringArray)[0]?.length || 0 })
					.map((_, row) =>
						Object.fromEntries(
							Object.entries(fieldStringArray)
								.map(([fieldName, stringArray]) =>
									[fieldName, stringArray[row]]
								)
						)
					);

				const value = fieldRecords.map(fieldRecord =>
					Object.fromEntries(
						Object.entries(fields)
							.flatMap(([fieldName, option]) => {
								const fields = option.toFields?.();
								const value = option.fromRecord?.($LL, fields, fieldName, fieldRecord);
								if (value) {
									return [[fieldName, value]];
								}
								return [];
							})
					) as RoleInput | null | undefined
				);

				if (value.length) {
					return value;
				}
			}
			return undefined;
		},
		toFields: (fieldArg) => {
			const { name } = roleFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			const fieldValue = value?.roles;
			return Object.fromEntries(
				Object.entries(fields)
					.map(([fieldName, option]) =>
						[
							[title + '-' + (option?.title?.($LL, fieldArg) || fieldName)],
							fieldValue?.map(item => option?.toString?.($LL, item, fieldArg) || '').join('|') || ''
						]
					)
			);
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
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.User.fields.realm.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			if (fields) {
				const fieldRecord = Object.fromEntries(
					Object.entries(fields)
						.flatMap(([fieldName, option]) => {
							const string = record?.[title + '-' + (option?.title?.($LL, fieldArg) || fieldName)];
							if (string) {
								return [[fieldName, string]];
							}
							return [];
						})
				);

				const value = Object.fromEntries(
					Object.entries(fields)
						.flatMap(([fieldName, option]) => {
							const fields = option.toFields?.();
							const value = option.fromRecord?.($LL, fields, fieldName, fieldRecord);
							if (value) {
								return [[fieldName, value]];
							}
							return [];
						})
				) as RealmInput;

				if (Object.keys(value).length) {
					return value;
				}
			}
			return undefined;
		},
		toFields: (fieldArg) => {
			const { name } = realmFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			const fieldValue = value?.realm;
			return Object.fromEntries(
				Object.entries(fields)
					.map(([fieldName, option]) =>
						[
							[title + '-' + (option?.title?.($LL, fieldArg) || fieldName)],
							option?.toString?.($LL, fieldValue, fieldArg) || ''
						]
					)
			);
		},
		fields: (value, fieldArg) => realmFields
	}
};

export const validateRequired = async ($LL: TranslationFunctions, value: UserInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (value?.id || value?.where && Object.values(value.where).length > 0) {
			for (const [fieldName, fieldValue] of Object.entries(value)) {
				const options = userFields[fieldName as keyof UserFields];
				if (options?.required?.(value) && (fieldValue == null || Array.isArray(fieldValue) && !fieldValue.length)) {
					errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
				}
			}
		} else {
			for (const [fieldName, options] of Object.entries(userFields)) {
				const fieldValue = value[fieldName as keyof UserInput];
				if (options?.required?.(value) && (fieldValue == null || Array.isArray(fieldValue) && !fieldValue.length)) {
					errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
				}
			}
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: UserInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (value?.id || value?.where && Object.values(value.where).length > 0) {
			for (const [fieldName, fieldValue] of Object.entries(value)) {
				const options = userFields[fieldName as keyof UserFields];
				const fieldErrors = await options?.validate?.($LL, value);
				if (fieldErrors && fieldErrors.length > 0) {
					errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
				}
			}
		} else {
			for (const [fieldName, options] of Object.entries(userFields)) {
				const fieldErrors = await options?.validate?.($LL, value);
				if (fieldErrors && fieldErrors.length > 0) {
					errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
				}
			}
		}
	}
	return errors;
};

export const validate = async ($LL: TranslationFunctions, value: UserInput | null | undefined) => {
	let errors = await validateRequired($LL, value);
	if (Object.keys(errors).length === 0) {
		errors = await validateErrors($LL, value);
	}
	return new Promise(
		(
			resolve: (data: UserInput | null | undefined) => void,
			reject: (errors: Record<string, Errors>) => void
		) => {
			if (Object.keys(errors).length === 0) {
				resolve(value);
			} else {
				reject(errors);
			}
		}
	);
};

export const validateAll = async ($LL: TranslationFunctions, value: (UserInput | null | undefined)[] | null | undefined) => {
	let errors: Record<number, Errors> = {};
	if (value) {
		for (let row = 0; row < value.length; row++) {
			const node = value[row];
			if (node) {
				const rowErrors = await validateRequired($LL, node);
				if (Object.keys(rowErrors).length > 0) {
					errors[row] = { iterms: rowErrors };
				}
			}
		}
		if (Object.keys(errors).length === 0) {
			for (let row = 0; row < value.length; row++) {
				const node = value[row];
				if (node) {
					const rowErrors = await validateErrors($LL, node);
					if (Object.keys(rowErrors).length > 0) {
						errors[row] = { iterms: rowErrors };
					}
				}
			}
		}
	}
	return new Promise(
		(
			resolve: (data: (UserInput | null | undefined)[] | null | undefined) => void,
			reject: (errors: Record<number, Errors>) => void
		) => {
			if (Object.keys(errors).length === 0) {
				resolve(value);
			} else {
				reject(errors);
			}
		}
	);
};

export const toRecords = ($LL: TranslationFunctions, value: (UserInput | null | undefined)[] | null | undefined, fieldArgs?: UserFieldsArgs | undefined, fieldsPatch?: UserFields | undefined) => {
	const fields = fieldsPatch ?
		Object.fromEntries(
			Object.entries(fieldsPatch)
				.map(([fieldName, optionPatch]) => [fieldName, { ...userFields?.[fieldName as keyof UserFields], ...optionPatch }])
		) : userFields;
		
	return value?.map(item =>
		Object.fromEntries(
			Object.entries(fields)
				.flatMap(([fieldName, option]) => {
					const fieldArg = fieldArgs?.[fieldName as keyof UserFieldsArgs];
					const title = option.title?.($LL, fieldArg) || fieldName;
					const fields = option.toFields?.();
					if (fields && option.toRecord) {
						return Object.entries(option.toRecord($LL, fields, title, item, fieldArg));
					}
					const entry: [string, string | null | undefined] = [title, option.toString?.($LL, item, fieldArg) || ''];
					return [entry];
				})
		)
	);
}

export const toErrors = (errors: Record<number, Errors>, fieldsPatch?: UserFields | undefined) => {
	const fields = fieldsPatch ?
		Object.fromEntries(
			Object.entries(fieldsPatch)
				.map(([fieldName, optionPatch]) => [fieldName, { ...userFields?.[fieldName as keyof UserFields], ...optionPatch }])
		) : userFields;
		
	return Object.fromEntries(
		Object.entries(errors)
			.map(([row, errors]) =>
				[
					row,
					Object.entries(fields)
						.flatMap(([fieldName, option]) => {
							const fieldMessages = errors.iterms?.[fieldName]?.errors?.map(error => error.message);
							const fields = option.toFields?.();
							if (fields) {
								if (errors.iterms?.[fieldName]?.iterms?.[0]) {
									return Object.keys(fields)
										.map((subFieldName) =>
											[
												...(fieldMessages || []),
												...Object.values(errors.iterms?.[fieldName]?.iterms || {})
													.flatMap((rowErrors) =>
														rowErrors.iterms?.[subFieldName]?.errors?.map(error => error.message) || [])
											]
										);
								} else {
									return Object.keys(fields)
										.map((subFieldName) =>
											[
												...(fieldMessages || []),
												...(errors.iterms?.[fieldName]?.iterms?.[subFieldName]?.errors?.map(error => error.message) || [])
											]
										);
								}
							}
							if (errors.iterms?.[fieldName]?.iterms?.[0]) {
								return [
									[
										...(fieldMessages || []),
										...Object.values(errors.iterms?.[fieldName]?.iterms || {})
											.flatMap((rowErrors) =>
												rowErrors.errors?.map(error => error.message) || []
											)
									]
								];
							} else {
								return [fieldMessages];
							}
						})
				]
			)
	);
}

export const fromRecords = ($LL: TranslationFunctions, records: Record<string, string | null | undefined>[] | undefined, fieldArgs?: UserFieldsArgs | undefined, fieldsPatch?: UserFields | undefined) => {
	return records?.map(reocrd =>
		Object.fromEntries(
			Object.entries(userFields)
				.map(([fieldName, option]) => {
					const mergedOption = { ...option, ...fieldsPatch?.[fieldName as keyof UserFields] };
					const fieldArg = fieldArgs?.[fieldName as keyof UserFieldsArgs];
					const title = mergedOption.title?.($LL, fieldArg) || fieldName;
					const fields = option.toFields?.();
					return [fieldName, mergedOption.fromRecord?.($LL, fields, title, reocrd, fieldArg)];
				})
		) as UserInput
	);
}