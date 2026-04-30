import { format } from 'date-fns';
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

export const realmInit: ((value?: RealmInput | null | undefined) => RealmInput | null | undefined) | undefined = undefined;

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
	} | undefined;
	description?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
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
		hiddenFilter: (args, fieldArg) => {
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
		hiddenFilter: (args, fieldArg) => {
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
	}
};

export const validateRequired = async ($LL: TranslationFunctions, value: RealmInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (value?.id || value?.where && Object.values(value.where).length > 0) {
			for (const [fieldName, fieldValue] of Object.entries(value)) {
				const options = realmFields[fieldName as keyof RealmFields];
				if (options?.required?.(value) && (fieldValue == null || Array.isArray(fieldValue) && !fieldValue.length)) {
					errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
				}
			}
		} else {
			for (const [fieldName, options] of Object.entries(realmFields)) {
				const fieldValue = value[fieldName as keyof RealmInput];
				if (options?.required?.(value) && (fieldValue == null || Array.isArray(fieldValue) && !fieldValue.length)) {
					errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
				}
			}
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: RealmInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (value?.id || value?.where && Object.values(value.where).length > 0) {
			for (const [fieldName, fieldValue] of Object.entries(value)) {
				const options = realmFields[fieldName as keyof RealmFields];
				const fieldErrors = await options?.validate?.($LL, value);
				if (fieldErrors && fieldErrors.length > 0) {
					errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
				}
			}
		} else {
			for (const [fieldName, options] of Object.entries(realmFields)) {
				const fieldErrors = await options?.validate?.($LL, value);
				if (fieldErrors && fieldErrors.length > 0) {
					errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
				}
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
	const fields = fieldsPatch ?
		Object.fromEntries(
			Object.entries(fieldsPatch)
				.map(([fieldName, optionPatch]) => [fieldName, { ...realmFields?.[fieldName as keyof RealmFields], ...optionPatch }])
		) : realmFields;
		
	return value?.map(item =>
		Object.fromEntries(
			Object.entries(fields)
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
	const fields = fieldsPatch ?
		Object.fromEntries(
			Object.entries(fieldsPatch)
				.map(([fieldName, optionPatch]) => [fieldName, { ...realmFields?.[fieldName as keyof RealmFields], ...optionPatch }])
		) : realmFields;
		
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