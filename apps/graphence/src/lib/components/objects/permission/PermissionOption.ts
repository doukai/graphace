import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
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

export const permissionTabs: (($LL: TranslationFunctions, args?: QueryPermissionListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const permissionTab: ((args?: QueryPermissionListArgs | undefined) => string | undefined) | undefined = undefined;

export const permissionTabChange = async (tab: string, args: QueryPermissionListArgs, value?: (PermissionInput | null | undefined)[] | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryPermissionListArgs) => void,
			reject: (errors: Record<number, Errors>) => void
		) => {
			resolve(args);
		}
	);
};

export const permissionFormTabs: (($LL: TranslationFunctions, args?: QueryPermissionArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const permissionFormTab: ((args?: QueryPermissionArgs | undefined) => string | undefined) | undefined = undefined;

export const permissionFormTabChange = async (tab: string, args: QueryPermissionArgs, value?: PermissionInput | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryPermissionArgs) => void,
			reject: (errors: Record<string, Errors>) => void
		) => {
			resolve(args);
		}
	);
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
	field?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	type?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	permissionType?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
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

export type PermissionFields = {
	name?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['name'], PermissionFieldsProps['name']> | undefined;
	description?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['description'], PermissionFieldsProps['description']> | undefined;
	field?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['field'], PermissionFieldsProps['field']> | undefined;
	type?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['type'], PermissionFieldsProps['type']> | undefined;
	permissionType?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, PermissionType | null | undefined, PermissionFieldsArgs['permissionType'], PermissionFieldsProps['permissionType']> | undefined;
	roles?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, (RoleInput | null | undefined)[] | null | undefined, PermissionFieldsArgs['roles'], PermissionFieldsProps['roles']> & { fields?: (value?: PermissionInput | undefined, fieldArg?: PermissionFieldsArgs['roles']) => RoleFields } | undefined;
	realm?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, RealmInput | null | undefined, PermissionFieldsArgs['realm'], PermissionFieldsProps['realm']> & { fields?: (value?: PermissionInput | undefined, fieldArg?: PermissionFieldsArgs['realm']) => RealmFields } | undefined;
};

export const permissionFields: PermissionFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::name::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Permission::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::name::READ');
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
					resolve: (data: PermissionInput | null | undefined) => void,
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
			return !auth('Permission::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::description::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Permission::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::description::READ');
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
					resolve: (data: PermissionInput | null | undefined) => void,
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
	field: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::field::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::field::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Permission::field::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::field::READ');
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
					resolve: (data: PermissionInput | null | undefined) => void,
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
	type: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::type::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::type::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Permission::type::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::type::READ');
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
					resolve: (data: PermissionInput | null | undefined) => void,
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
	permissionType: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::permissionType::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::permissionType::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Permission::permissionType::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::permissionType::READ');
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
					resolve: (data: PermissionInput | null | undefined) => void,
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
	roles: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::roles::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::roles::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Permission::roles::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::roles::READ');
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
					resolve: (data: PermissionInput | null | undefined) => void,
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
			return !auth('Permission::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::realm::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Permission::realm::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::realm::READ');
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
					resolve: (data: PermissionInput | null | undefined) => void,
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

export const validateRequired = async ($LL: TranslationFunctions, value: PermissionInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (permissionFields?.name?.required?.(value) && value.name == null) {
			errors['name'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (permissionFields?.description?.required?.(value) && value.description == null) {
			errors['description'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (permissionFields?.field?.required?.(value) && value.field == null) {
			errors['field'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (permissionFields?.type?.required?.(value) && value.type == null) {
			errors['type'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (permissionFields?.permissionType?.required?.(value) && value.permissionType == null) {
			errors['permissionType'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (permissionFields?.roles?.required?.(value) && value.roles == null) {
			errors['roles'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (permissionFields?.realm?.required?.(value) && value.realm == null) {
			errors['realm'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: PermissionInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		const nameErrors = await permissionFields?.name?.validate?.($LL, value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await permissionFields?.description?.validate?.($LL, value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
		const fieldErrors = await permissionFields?.field?.validate?.($LL, value);
		if (fieldErrors && fieldErrors.length > 0) {
			errors['field'] = { errors: fieldErrors.map((message) => ({ message })) };
		}
		const typeErrors = await permissionFields?.type?.validate?.($LL, value);
		if (typeErrors && typeErrors.length > 0) {
			errors['type'] = { errors: typeErrors.map((message) => ({ message })) };
		}
		const permissionTypeErrors = await permissionFields?.permissionType?.validate?.($LL, value);
		if (permissionTypeErrors && permissionTypeErrors.length > 0) {
			errors['permissionType'] = { errors: permissionTypeErrors.map((message) => ({ message })) };
		}
		const rolesErrors = await permissionFields?.roles?.validate?.($LL, value);
		if (rolesErrors && rolesErrors.length > 0) {
			errors['roles'] = { errors: rolesErrors.map((message) => ({ message })) };
		}
		const realmErrors = await permissionFields?.realm?.validate?.($LL, value);
		if (realmErrors && realmErrors.length > 0) {
			errors['realm'] = { errors: realmErrors.map((message) => ({ message })) };
		}
	}
	return errors;
};

export const validate = async ($LL: TranslationFunctions, value: PermissionInput | null | undefined) => {
	let errors = await validateRequired($LL, value);
	if (Object.keys(errors).length === 0) {
		errors = await validateErrors($LL, value);
	}
	return new Promise(
		(
			resolve: (data: PermissionInput | null | undefined) => void,
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

export const validateAll = async ($LL: TranslationFunctions, value: (PermissionInput | null | undefined)[] | null | undefined) => {
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
			resolve: (data: (PermissionInput | null | undefined)[] | null | undefined) => void,
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