import type { Errors } from '@graphace/commons';
import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
import type {
	RealmInput,
	QueryRealmArgs,
	QueryRealmListArgs
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const realmTabs: (($LL: TranslationFunctions, args?: QueryRealmListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const realmTab: ((args?: QueryRealmListArgs | undefined) => string | undefined) | undefined = undefined;

export const realmTabChange = async (tab: string, args: QueryRealmListArgs, value?: (RealmInput | null | undefined)[] | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryRealmListArgs) => void,
			reject: (errors: Record<number, Errors>) => void
		) => {
			resolve(args);
		}
	);
};

export const realmFormTabs: (($LL: TranslationFunctions, args?: QueryRealmArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const realmFormTab: ((args?: QueryRealmArgs | undefined) => string | undefined) | undefined = undefined;

export const realmFormTabChange = async (tab: string, args: QueryRealmArgs, value?: RealmInput | null | undefined) => {
	return new Promise(
		(
			resolve: (data: QueryRealmArgs) => void,
			reject: (errors: Record<string, Errors>) => void
		) => {
			resolve(args);
		}
	);
};

export type RealmFieldsArgs = {
	name?: {} | undefined;
	description?: {} | undefined;
};

export type RealmFieldsProps = {
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
};

export type RealmFields = {
	name?: Option<TranslationFunctions, RealmInput, QueryRealmListArgs, string | null | undefined, RealmFieldsArgs['name'], RealmFieldsProps['name']> | undefined;
	description?: Option<TranslationFunctions, RealmInput, QueryRealmListArgs, string | null | undefined, RealmFieldsArgs['description'], RealmFieldsProps['description']> | undefined;
};

export const realmFields: RealmFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Realm::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Realm::name::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Realm::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Realm::name::READ');
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
					resolve: (data: RealmInput | null | undefined) => void,
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
			return !auth('Realm::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Realm::description::WRITE');
		},
		hidden: (value, fieldArg) => {
			return !auth('Realm::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Realm::description::READ');
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
					resolve: (data: RealmInput | null | undefined) => void,
					reject: (errors: Errors) => void
				) => {
					resolve(value);
				}
			);
		},
		props: ($LL, value, fieldArg) => {
			return {};
		}
	}
};

export const validateRequired = async ($LL: TranslationFunctions, value: RealmInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (realmFields?.name?.required?.(value) && value.name == null) {
			errors['name'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
		if (realmFields?.description?.required?.(value) && value.description == null) {
			errors['description'] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: RealmInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		const nameErrors = await realmFields?.name?.validate?.($LL, value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await realmFields?.description?.validate?.($LL, value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
	}
	return errors;
};

export const validate = async ($LL: TranslationFunctions, value: RealmInput | null | undefined) => {
	let errors = await validateRequired($LL, value);
	if (Object.keys(errors).length === 0) {
		errors = await validateErrors($LL, value);
	}
	return new Promise(
		(
			resolve: (data: RealmInput | null | undefined) => void,
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

export const validateAll = async ($LL: TranslationFunctions, value: (RealmInput | null | undefined)[] | null | undefined) => {
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
			resolve: (data: (RealmInput | null | undefined)[] | null | undefined) => void,
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