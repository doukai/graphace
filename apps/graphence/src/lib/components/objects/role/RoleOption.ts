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
	name?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, string | null | undefined, RoleFieldsArgs['name'], RoleFieldsProps['name']> | undefined;
	description?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, string | null | undefined, RoleFieldsArgs['description'], RoleFieldsProps['description']> | undefined;
	users?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, (UserInput | null | undefined)[] | null | undefined, RoleFieldsArgs['users'], RoleFieldsProps['users']> & { fields?: (value?: RoleInput | undefined, fieldArg?: RoleFieldsArgs['users']) => UserFields } | undefined;
	groups?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, (GroupInput | null | undefined)[] | null | undefined, RoleFieldsArgs['groups'], RoleFieldsProps['groups']> & { fields?: (value?: RoleInput | undefined, fieldArg?: RoleFieldsArgs['groups']) => GroupFields } | undefined;
	composites?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, (RoleInput | null | undefined)[] | null | undefined, RoleFieldsArgs['composites'], RoleFieldsProps['composites']> & { fields?: (value?: RoleInput | undefined, fieldArg?: RoleFieldsArgs['composites']) => RoleFields } | undefined;
	permissions?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, (PermissionInput | null | undefined)[] | null | undefined, RoleFieldsArgs['permissions'], RoleFieldsProps['permissions']> & { fields?: (value?: RoleInput | undefined, fieldArg?: RoleFieldsArgs['permissions']) => PermissionFields } | undefined;
	realm?: Option<TranslationFunctions, RoleInput, QueryRoleListArgs, RealmInput | null | undefined, RoleFieldsArgs['realm'], RoleFieldsProps['realm']> & { fields?: (value?: RoleInput | undefined, fieldArg?: RoleFieldsArgs['realm']) => RealmFields } | undefined;
};

export const roleFields: RoleFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Role::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::name::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Role::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	description: {
		readonly: (value, fieldArg) => {
			return !auth('Role::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::description::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Role::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	users: {
		readonly: (value, fieldArg) => {
			return !auth('Role::users::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::users::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Role::users::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		fields: (value, fieldArg) => userFields
	},
	groups: {
		readonly: (value, fieldArg) => {
			return !auth('Role::groups::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::groups::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Role::groups::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		fields: (value, fieldArg) => groupFields
	},
	composites: {
		readonly: (value, fieldArg) => {
			return !auth('Role::composites::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::composites::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Role::composites::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		fields: (value, fieldArg) => roleFields
	},
	permissions: {
		readonly: (value, fieldArg) => {
			return !auth('Role::permissions::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::permissions::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Role::permissions::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		fields: (value, fieldArg) => permissionFields
	},
	realm: {
		readonly: (value, fieldArg) => {
			return !auth('Role::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Role::realm::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Role::realm::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		fields: (value, fieldArg) => realmFields
	}
};

export const validateRequired = async ($LL: TranslationFunctions, value: RoleInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (roleFields?.name?.required?.(value) && value.name == null) {
			errors['name'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (roleFields?.description?.required?.(value) && value.description == null) {
			errors['description'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (roleFields?.users?.required?.(value) && value.users == null) {
			errors['users'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (roleFields?.groups?.required?.(value) && value.groups == null) {
			errors['groups'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (roleFields?.composites?.required?.(value) && value.composites == null) {
			errors['composites'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (roleFields?.permissions?.required?.(value) && value.permissions == null) {
			errors['permissions'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (roleFields?.realm?.required?.(value) && value.realm == null) {
			errors['realm'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: RoleInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		const nameErrors = await roleFields?.name?.validate?.($LL, value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await roleFields?.description?.validate?.($LL, value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
		const usersErrors = await roleFields?.users?.validate?.($LL, value);
		if (usersErrors && usersErrors.length > 0) {
			errors['users'] = { errors: usersErrors.map((message) => ({ message })) };
		}
		const groupsErrors = await roleFields?.groups?.validate?.($LL, value);
		if (groupsErrors && groupsErrors.length > 0) {
			errors['groups'] = { errors: groupsErrors.map((message) => ({ message })) };
		}
		const compositesErrors = await roleFields?.composites?.validate?.($LL, value);
		if (compositesErrors && compositesErrors.length > 0) {
			errors['composites'] = { errors: compositesErrors.map((message) => ({ message })) };
		}
		const permissionsErrors = await roleFields?.permissions?.validate?.($LL, value);
		if (permissionsErrors && permissionsErrors.length > 0) {
			errors['permissions'] = { errors: permissionsErrors.map((message) => ({ message })) };
		}
		const realmErrors = await roleFields?.realm?.validate?.($LL, value);
		if (realmErrors && realmErrors.length > 0) {
			errors['realm'] = { errors: realmErrors.map((message) => ({ message })) };
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