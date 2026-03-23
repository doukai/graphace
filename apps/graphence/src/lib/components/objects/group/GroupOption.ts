import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
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

export const groupTabs: (($LL: TranslationFunctions, args?: QueryGroupListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const groupTab: ((args?: QueryGroupListArgs | undefined) => string | undefined) | undefined = undefined;

export const groupTabChange = async (tab: string, args: QueryGroupListArgs, value?: (GroupInput | null | undefined)[] | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryGroupListArgs) => void,
			reject: (errors: Record<number, Errors>) => void
		) => {
			resolve(args);
		}
	);
};

export const groupFormTabs: (($LL: TranslationFunctions, args?: QueryGroupArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const groupFormTab: ((args?: QueryGroupArgs | undefined) => string | undefined) | undefined = undefined;

export const groupFormTabChange = async (tab: string, args: QueryGroupArgs, value?: GroupInput | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryGroupArgs) => void,
			reject: (errors: Record<string, Errors>) => void
		) => {
			resolve(args);
		}
	);
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
	path?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	deep?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	parentId?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	parent?: {
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
	subGroups?: {
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
		required: (value) => {
			return true;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.name.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.name;
			return fieldValue ? '' + fieldValue : '';
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.description.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.description;
			return fieldValue ? '' + fieldValue : '';
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.path.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.path;
			return fieldValue ? '' + fieldValue : '';
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.deep.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string) {
				return parseInt(string);
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.deep;
			return fieldValue ? '' + fieldValue : '';
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.parentId.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.parentId;
			return fieldValue ? '' + fieldValue : '';
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.parent.name();
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
				) as GroupInput;

				if (Object.keys(value).length) {
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
			const fieldValue = value?.parent;
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.subGroups.name();
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
			const fieldValue = value?.subGroups;
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.users.name();
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.roles.name();
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
		required: (value) => {
			return false;
		},
		validate: async ($LL, value) => {
			return [];
		},
		onChange: async ($LL, fieldValue, value, fieldArg) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
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
			return $LL.graphql.objects.Group.fields.realm.name();
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

export const validateRequired = async ($LL: TranslationFunctions, value: GroupInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		for (const [fieldName, options] of Object.entries(groupFields)) {
			if (options?.required?.(value) && value[fieldName as keyof GroupInput] == null) {
				errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
			}
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: GroupInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		for (const [fieldName, options] of Object.entries(groupFields)) {
			const fieldErrors = await options?.validate?.($LL, value);
			if (fieldErrors && fieldErrors.length > 0) {
				errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
			}
		}
	}
	return errors;
};

export const validate = async ($LL: TranslationFunctions, value: GroupInput | null | undefined) => {
	let errors = await validateRequired($LL, value);
	if (Object.keys(errors).length === 0) {
		errors = await validateErrors($LL, value);
	}
	return new Promise(
		(
			resolve: (data: GroupInput | null | undefined) => void,
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

export const validateAll = async ($LL: TranslationFunctions, value: (GroupInput | null | undefined)[] | null | undefined) => {
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
			resolve: (data: (GroupInput | null | undefined)[] | null | undefined) => void,
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

export const toRecords = ($LL: TranslationFunctions, value: (GroupInput | null | undefined)[] | null | undefined, fieldArgs?: GroupFieldsArgs | undefined, fieldsPatch?: GroupFields | undefined) => {
	if (fieldsPatch) {
		return value?.map(item =>
			Object.fromEntries(
				Object.entries(fieldsPatch)
					.flatMap(([fieldName, optionPatch]) => {
						const option = { ...groupFields?.[fieldName as keyof GroupFields], ...optionPatch };
						const fieldArg = fieldArgs?.[fieldName as keyof GroupFieldsArgs];
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
	return value?.map(item =>
		Object.fromEntries(
			Object.entries(groupFields)
				.flatMap(([fieldName, option]) => {
					const fieldArg = fieldArgs?.[fieldName as keyof GroupFieldsArgs];
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

export const toErrors = (errors: Record<number, Errors>, fieldsPatch?: GroupFields | undefined) => {
	return Object.fromEntries(
		Object.entries(errors)
			.map(([row, errors]) =>
				[
					row,
					Object.entries(groupFields)
						.flatMap(([fieldName, option]) => {
							const mergedOption = { ...option, ...fieldsPatch?.[fieldName as keyof GroupFields] };
							const fieldMessages = errors.iterms?.[fieldName]?.errors?.map(error => error.message);
							const fields = mergedOption.toFields?.();
							if (fields) {
								return Object.keys(fields)
									.map((subFieldName) =>
										[...(fieldMessages || []), ...(errors.iterms?.[fieldName]?.iterms?.[subFieldName]?.errors?.map(error => error.message) || [])]
									);
							}
							return [fieldMessages];
						})
				]
			)
	);
}

export const fromRecords = ($LL: TranslationFunctions, records: Record<string, string | null | undefined>[] | undefined, fieldArgs?: GroupFieldsArgs | undefined, fieldsPatch?: GroupFields | undefined) => {
	return records?.map(reocrd =>
		Object.fromEntries(
			Object.entries(groupFields)
				.map(([fieldName, option]) => {
					const mergedOption = { ...option, ...fieldsPatch?.[fieldName as keyof GroupFields] };
					const fieldArg = fieldArgs?.[fieldName as keyof GroupFieldsArgs];
					const title = mergedOption.title?.($LL, fieldArg) || fieldName;
					const fields = option.toFields?.();
					return [fieldName, mergedOption.fromRecord?.($LL, fields, title, reocrd, fieldArg)];
				})
		) as GroupInput
	);
}