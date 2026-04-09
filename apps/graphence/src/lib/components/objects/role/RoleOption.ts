import { format } from 'date-fns';
import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
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

export const roleInit: ((value: RoleInput | null | undefined) => RoleInput | null | undefined) | undefined = undefined;

export const roleTabs: (($LL: TranslationFunctions, args?: QueryRoleListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const roleTab: ((args?: QueryRoleListArgs | undefined) => string | undefined) | undefined = undefined;

export const roleTabChange = async (tab: string, args: QueryRoleListArgs, value?: (RoleInput | null | undefined)[] | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryRoleListArgs) => void,
			reject: (errors: Record<number, Errors>) => void
		) => {
			resolve(args);
		}
	);
};

export const roleFormTabs: (($LL: TranslationFunctions, args?: QueryRoleArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const roleFormTab: ((args?: QueryRoleArgs | undefined) => string | undefined) | undefined = undefined;

export const roleFormTabChange = async (tab: string, args: QueryRoleArgs, value?: RoleInput | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryRoleArgs) => void,
			reject: (errors: Record<string, Errors>) => void
		) => {
			resolve(args);
		}
	);
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
	name?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	description?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	users?: {
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
	composites?: {
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
	permissions?: {
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
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
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
			return $LL.graphql.objects.Role.fields.name.name();
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
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
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
			return $LL.graphql.objects.Role.fields.description.name();
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
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
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
			return $LL.graphql.objects.Role.fields.users.name();
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
					) as UserInput | null | undefined
				);

				if (value.length) {
					return value;
				}
			}
			return undefined;
		},
		toFields: (fieldArg) => {
			const { name } = userFields;
			return { name };
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			const fieldValue = value?.users;
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
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
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
			return $LL.graphql.objects.Role.fields.groups.name();
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
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
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
			return $LL.graphql.objects.Role.fields.composites.name();
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
			const fieldValue = value?.composites;
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
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
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
			return $LL.graphql.objects.Role.fields.permissions.name();
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
					) as PermissionInput | null | undefined
				);

				if (value.length) {
					return value;
				}
			}
			return undefined;
		},
		toFields: (fieldArg) => {
			return {};
		},
		toRecord: ($LL, fields, title, value, fieldArg) => {
			const fieldValue = value?.permissions;
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
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
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
			return $LL.graphql.objects.Role.fields.realm.name();
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

export const validateRequired = async ($LL: TranslationFunctions, value: RoleInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		for (const [fieldName, options] of Object.entries(roleFields)) {
			if (options?.required?.(value) && value[fieldName as keyof RoleInput] == null) {
				errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
			}
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: RoleInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		for (const [fieldName, options] of Object.entries(roleFields)) {
			const fieldErrors = await options?.validate?.($LL, value);
			if (fieldErrors && fieldErrors.length > 0) {
				errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
			}
		}
	}
	return errors;
};

export const validate = async ($LL: TranslationFunctions, value: RoleInput | null | undefined) => {
	let errors = await validateRequired($LL, value);
	if (Object.keys(errors).length === 0) {
		errors = await validateErrors($LL, value);
	}
	return new Promise(
		(
			resolve: (data: RoleInput | null | undefined) => void,
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

export const validateAll = async ($LL: TranslationFunctions, value: (RoleInput | null | undefined)[] | null | undefined) => {
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
			resolve: (data: (RoleInput | null | undefined)[] | null | undefined) => void,
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

export const toRecords = ($LL: TranslationFunctions, value: (RoleInput | null | undefined)[] | null | undefined, fieldArgs?: RoleFieldsArgs | undefined, fieldsPatch?: RoleFields | undefined) => {
	const fields = fieldsPatch ?
		Object.fromEntries(
			Object.entries(fieldsPatch)
				.map(([fieldName, optionPatch]) => [fieldName, { ...roleFields?.[fieldName as keyof RoleFields], ...optionPatch }])
		) : roleFields;
		
	return value?.map(item =>
		Object.fromEntries(
			Object.entries(fields)
				.flatMap(([fieldName, option]) => {
					const fieldArg = fieldArgs?.[fieldName as keyof RoleFieldsArgs];
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

export const toErrors = (errors: Record<number, Errors>, fieldsPatch?: RoleFields | undefined) => {
	const fields = fieldsPatch ?
		Object.fromEntries(
			Object.entries(fieldsPatch)
				.map(([fieldName, optionPatch]) => [fieldName, { ...roleFields?.[fieldName as keyof RoleFields], ...optionPatch }])
		) : roleFields;
		
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

export const fromRecords = ($LL: TranslationFunctions, records: Record<string, string | null | undefined>[] | undefined, fieldArgs?: RoleFieldsArgs | undefined, fieldsPatch?: RoleFields | undefined) => {
	return records?.map(reocrd =>
		Object.fromEntries(
			Object.entries(roleFields)
				.map(([fieldName, option]) => {
					const mergedOption = { ...option, ...fieldsPatch?.[fieldName as keyof RoleFields] };
					const fieldArg = fieldArgs?.[fieldName as keyof RoleFieldsArgs];
					const title = mergedOption.title?.($LL, fieldArg) || fieldName;
					const fields = option.toFields?.();
					return [fieldName, mergedOption.fromRecord?.($LL, fields, title, reocrd, fieldArg)];
				})
		) as RoleInput
	);
}