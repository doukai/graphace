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
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Realm.fields.name.name();
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
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Realm.fields.description.name();
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
	}
};

export const validateRequired = async ($LL: TranslationFunctions, value: RealmInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		for (const [fieldName, options] of Object.entries(realmFields)) {
			if (options?.required?.(value) && value[fieldName as keyof RealmInput] == null) {
				errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
			}
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: RealmInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		for (const [fieldName, options] of Object.entries(realmFields)) {
			const fieldErrors = await options?.validate?.($LL, value);
			if (fieldErrors && fieldErrors.length > 0) {
				errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
			}
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

export const toRecords = ($LL: TranslationFunctions, value: (RealmInput | null | undefined)[] | null | undefined, fieldArgs?: RealmFieldsArgs | undefined, fieldsPatch?: RealmFields | undefined) => {
	if (fieldsPatch) {
		return value?.map(item =>
			Object.fromEntries(
				Object.entries(fieldsPatch)
					.flatMap(([fieldName, optionPatch]) => {
						const option = { ...realmFields?.[fieldName as keyof RealmFields], ...optionPatch };
						const fieldArg = fieldArgs?.[fieldName as keyof RealmFieldsArgs];
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
			Object.entries(realmFields)
				.flatMap(([fieldName, option]) => {
					const fieldArg = fieldArgs?.[fieldName as keyof RealmFieldsArgs];
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

export const toErrors = (errors: Record<number, Errors>, fieldsPatch?: RealmFields | undefined) => {
	return Object.fromEntries(
		Object.entries(errors)
			.map(([row, errors]) =>
				[
					row,
					Object.entries(realmFields)
						.flatMap(([fieldName, option]) => {
							const mergedOption = { ...option, ...fieldsPatch?.[fieldName as keyof RealmFields] };
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

export const fromRecords = ($LL: TranslationFunctions, records: Record<string, string | null | undefined>[] | undefined, fieldArgs?: RealmFieldsArgs | undefined, fieldsPatch?: RealmFields | undefined) => {
	return records?.map(reocrd =>
		Object.fromEntries(
			Object.entries(realmFields)
				.map(([fieldName, option]) => {
					const mergedOption = { ...option, ...fieldsPatch?.[fieldName as keyof RealmFields] };
					const fieldArg = fieldArgs?.[fieldName as keyof RealmFieldsArgs];
					const title = mergedOption.title?.($LL, fieldArg) || fieldName;
					const fields = option.toFields?.();
					return [fieldName, mergedOption.fromRecord?.($LL, fields, title, reocrd, fieldArg)];
				})
		) as RealmInput
	);
}