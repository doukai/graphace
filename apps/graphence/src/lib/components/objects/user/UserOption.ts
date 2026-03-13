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
	lastName?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	login?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	email?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	phones?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
	} | undefined;
	disable?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
		'select'?: {} | undefined;
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
	name?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['name'], UserFieldsProps['name']> | undefined;
	description?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['description'], UserFieldsProps['description']> | undefined;
	lastName?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['lastName'], UserFieldsProps['lastName']> | undefined;
	login?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['login'], UserFieldsProps['login']> | undefined;
	email?: Option<TranslationFunctions, UserInput, QueryUserListArgs, string | null | undefined, UserFieldsArgs['email'], UserFieldsProps['email']> | undefined;
	phones?: Option<TranslationFunctions, UserInput, QueryUserListArgs, (string | null | undefined)[] | null | undefined, UserFieldsArgs['phones'], UserFieldsProps['phones']> | undefined;
	disable?: Option<TranslationFunctions, UserInput, QueryUserListArgs, boolean | null | undefined, UserFieldsArgs['disable'], UserFieldsProps['disable']> | undefined;
	groups?: Option<TranslationFunctions, UserInput, QueryUserListArgs, (GroupInput | null | undefined)[] | null | undefined, UserFieldsArgs['groups'], UserFieldsProps['groups']> & { fields?: (value?: UserInput | undefined, fieldArg?: UserFieldsArgs['groups']) => GroupFields } | undefined;
	roles?: Option<TranslationFunctions, UserInput, QueryUserListArgs, (RoleInput | null | undefined)[] | null | undefined, UserFieldsArgs['roles'], UserFieldsProps['roles']> & { fields?: (value?: UserInput | undefined, fieldArg?: UserFieldsArgs['roles']) => RoleFields } | undefined;
	realm?: Option<TranslationFunctions, UserInput, QueryUserListArgs, RealmInput | null | undefined, UserFieldsArgs['realm'], UserFieldsProps['realm']> & { fields?: (value?: UserInput | undefined, fieldArg?: UserFieldsArgs['realm']) => RealmFields } | undefined;
};

export const userFields: UserFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('User::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::name::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	description: {
		readonly: (value, fieldArg) => {
			return !auth('User::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::description::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	lastName: {
		readonly: (value, fieldArg) => {
			return !auth('User::lastName::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::lastName::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::lastName::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	login: {
		readonly: (value, fieldArg) => {
			return !auth('User::login::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::login::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::login::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	email: {
		readonly: (value, fieldArg) => {
			return !auth('User::email::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::email::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::email::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	phones: {
		readonly: (value, fieldArg) => {
			return !auth('User::phones::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::phones::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::phones::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	disable: {
		readonly: (value, fieldArg) => {
			return !auth('User::disable::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::disable::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::disable::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		}
	},
	groups: {
		readonly: (value, fieldArg) => {
			return !auth('User::groups::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::groups::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::groups::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		fields: (value, fieldArg) => groupFields
	},
	roles: {
		readonly: (value, fieldArg) => {
			return !auth('User::roles::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::roles::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::roles::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		fields: (value, fieldArg) => roleFields
	},
	realm: {
		readonly: (value, fieldArg) => {
			return !auth('User::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('User::realm::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('User::realm::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
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
		fields: (value, fieldArg) => realmFields
	}
};

export const validateRequired = async ($LL: TranslationFunctions, value: UserInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (userFields?.name?.required?.(value) && value.name == null) {
			errors['name'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.description?.required?.(value) && value.description == null) {
			errors['description'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.lastName?.required?.(value) && value.lastName == null) {
			errors['lastName'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.login?.required?.(value) && value.login == null) {
			errors['login'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.email?.required?.(value) && value.email == null) {
			errors['email'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.phones?.required?.(value) && value.phones == null) {
			errors['phones'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.disable?.required?.(value) && value.disable == null) {
			errors['disable'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.groups?.required?.(value) && value.groups == null) {
			errors['groups'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.roles?.required?.(value) && value.roles == null) {
			errors['roles'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (userFields?.realm?.required?.(value) && value.realm == null) {
			errors['realm'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: UserInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		const nameErrors = await userFields?.name?.validate?.($LL, value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await userFields?.description?.validate?.($LL, value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
		const lastNameErrors = await userFields?.lastName?.validate?.($LL, value);
		if (lastNameErrors && lastNameErrors.length > 0) {
			errors['lastName'] = { errors: lastNameErrors.map((message) => ({ message })) };
		}
		const loginErrors = await userFields?.login?.validate?.($LL, value);
		if (loginErrors && loginErrors.length > 0) {
			errors['login'] = { errors: loginErrors.map((message) => ({ message })) };
		}
		const emailErrors = await userFields?.email?.validate?.($LL, value);
		if (emailErrors && emailErrors.length > 0) {
			errors['email'] = { errors: emailErrors.map((message) => ({ message })) };
		}
		const phonesErrors = await userFields?.phones?.validate?.($LL, value);
		if (phonesErrors && phonesErrors.length > 0) {
			errors['phones'] = { errors: phonesErrors.map((message) => ({ message })) };
		}
		const disableErrors = await userFields?.disable?.validate?.($LL, value);
		if (disableErrors && disableErrors.length > 0) {
			errors['disable'] = { errors: disableErrors.map((message) => ({ message })) };
		}
		const groupsErrors = await userFields?.groups?.validate?.($LL, value);
		if (groupsErrors && groupsErrors.length > 0) {
			errors['groups'] = { errors: groupsErrors.map((message) => ({ message })) };
		}
		const rolesErrors = await userFields?.roles?.validate?.($LL, value);
		if (rolesErrors && rolesErrors.length > 0) {
			errors['roles'] = { errors: rolesErrors.map((message) => ({ message })) };
		}
		const realmErrors = await userFields?.realm?.validate?.($LL, value);
		if (realmErrors && realmErrors.length > 0) {
			errors['realm'] = { errors: realmErrors.map((message) => ({ message })) };
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