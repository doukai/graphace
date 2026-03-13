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
	name?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, string | null | undefined, GroupFieldsArgs['name'], GroupFieldsProps['name']> | undefined;
	description?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, string | null | undefined, GroupFieldsArgs['description'], GroupFieldsProps['description']> | undefined;
	path?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, string | null | undefined, GroupFieldsArgs['path'], GroupFieldsProps['path']> | undefined;
	deep?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, number | null | undefined, GroupFieldsArgs['deep'], GroupFieldsProps['deep']> | undefined;
	parentId?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, string | null | undefined, GroupFieldsArgs['parentId'], GroupFieldsProps['parentId']> | undefined;
	parent?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, GroupInput | null | undefined, GroupFieldsArgs['parent'], GroupFieldsProps['parent']> & { fields?: (value?: GroupInput | undefined, fieldArg?: GroupFieldsArgs['parent']) => GroupFields } | undefined;
	subGroups?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, (GroupInput | null | undefined)[] | null | undefined, GroupFieldsArgs['subGroups'], GroupFieldsProps['subGroups']> & { fields?: (value?: GroupInput | undefined, fieldArg?: GroupFieldsArgs['subGroups']) => GroupFields } | undefined;
	users?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, (UserInput | null | undefined)[] | null | undefined, GroupFieldsArgs['users'], GroupFieldsProps['users']> & { fields?: (value?: GroupInput | undefined, fieldArg?: GroupFieldsArgs['users']) => UserFields } | undefined;
	roles?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, (RoleInput | null | undefined)[] | null | undefined, GroupFieldsArgs['roles'], GroupFieldsProps['roles']> & { fields?: (value?: GroupInput | undefined, fieldArg?: GroupFieldsArgs['roles']) => RoleFields } | undefined;
	realm?: Option<TranslationFunctions, GroupInput, QueryGroupListArgs, RealmInput | null | undefined, GroupFieldsArgs['realm'], GroupFieldsProps['realm']> & { fields?: (value?: GroupInput | undefined, fieldArg?: GroupFieldsArgs['realm']) => RealmFields } | undefined;
};

export const groupFields: GroupFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Group::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::name::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		}
	},
	description: {
		readonly: (value, fieldArg) => {
			return !auth('Group::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::description::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		}
	},
	path: {
		readonly: (value, fieldArg) => {
			return !auth('Group::path::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::path::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		}
	},
	deep: {
		readonly: (value, fieldArg) => {
			return !auth('Group::deep::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::deep::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		}
	},
	parentId: {
		readonly: (value, fieldArg) => {
			return !auth('Group::parentId::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::parentId::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		}
	},
	parent: {
		readonly: (value, fieldArg) => {
			return !auth('Group::parent::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::parent::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		fields: (value, fieldArg) => groupFields
	},
	subGroups: {
		readonly: (value, fieldArg) => {
			return !auth('Group::subGroups::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::subGroups::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		fields: (value, fieldArg) => groupFields
	},
	users: {
		readonly: (value, fieldArg) => {
			return !auth('Group::users::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::users::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		fields: (value, fieldArg) => userFields
	},
	roles: {
		readonly: (value, fieldArg) => {
			return !auth('Group::roles::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::roles::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		fields: (value, fieldArg) => roleFields
	},
	realm: {
		readonly: (value, fieldArg) => {
			return !auth('Group::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Group::realm::WRITE');
		},
		hidden: (value, fieldArg) => {
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
		fields: (value, fieldArg) => realmFields
	}
};

export const validateRequired = async ($LL: TranslationFunctions, value: GroupInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (groupFields?.name?.required?.(value) && value.name == null) {
			errors['name'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.description?.required?.(value) && value.description == null) {
			errors['description'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.path?.required?.(value) && value.path == null) {
			errors['path'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.deep?.required?.(value) && value.deep == null) {
			errors['deep'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.parentId?.required?.(value) && value.parentId == null) {
			errors['parentId'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.parent?.required?.(value) && value.parent == null) {
			errors['parent'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.subGroups?.required?.(value) && value.subGroups == null) {
			errors['subGroups'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.users?.required?.(value) && value.users == null) {
			errors['users'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.roles?.required?.(value) && value.roles == null) {
			errors['roles'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (groupFields?.realm?.required?.(value) && value.realm == null) {
			errors['realm'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: GroupInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		const nameErrors = await groupFields?.name?.validate?.($LL, value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await groupFields?.description?.validate?.($LL, value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
		const pathErrors = await groupFields?.path?.validate?.($LL, value);
		if (pathErrors && pathErrors.length > 0) {
			errors['path'] = { errors: pathErrors.map((message) => ({ message })) };
		}
		const deepErrors = await groupFields?.deep?.validate?.($LL, value);
		if (deepErrors && deepErrors.length > 0) {
			errors['deep'] = { errors: deepErrors.map((message) => ({ message })) };
		}
		const parentIdErrors = await groupFields?.parentId?.validate?.($LL, value);
		if (parentIdErrors && parentIdErrors.length > 0) {
			errors['parentId'] = { errors: parentIdErrors.map((message) => ({ message })) };
		}
		const parentErrors = await groupFields?.parent?.validate?.($LL, value);
		if (parentErrors && parentErrors.length > 0) {
			errors['parent'] = { errors: parentErrors.map((message) => ({ message })) };
		}
		const subGroupsErrors = await groupFields?.subGroups?.validate?.($LL, value);
		if (subGroupsErrors && subGroupsErrors.length > 0) {
			errors['subGroups'] = { errors: subGroupsErrors.map((message) => ({ message })) };
		}
		const usersErrors = await groupFields?.users?.validate?.($LL, value);
		if (usersErrors && usersErrors.length > 0) {
			errors['users'] = { errors: usersErrors.map((message) => ({ message })) };
		}
		const rolesErrors = await groupFields?.roles?.validate?.($LL, value);
		if (rolesErrors && rolesErrors.length > 0) {
			errors['roles'] = { errors: rolesErrors.map((message) => ({ message })) };
		}
		const realmErrors = await groupFields?.realm?.validate?.($LL, value);
		if (realmErrors && realmErrors.length > 0) {
			errors['realm'] = { errors: realmErrors.map((message) => ({ message })) };
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