import { format } from 'date-fns';
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

export const permissionInit: ((value?: PermissionInput | null | undefined) => PermissionInput | null | undefined) | undefined = undefined;

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
	} | undefined;
	description?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	field?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	type?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
		'input'?: {} | undefined;
	} | undefined;
	permissionType?: {
		'tr'?: {} | undefined;
		'th'?: {} | undefined;
		'td'?: {} | undefined;
		'form-control'?: {} | undefined;
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
	name?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['name'], PermissionFieldsProps['name'], {}> | undefined;
	description?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['description'], PermissionFieldsProps['description'], {}> | undefined;
	field?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['field'], PermissionFieldsProps['field'], {}> | undefined;
	type?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, string | null | undefined, PermissionFieldsArgs['type'], PermissionFieldsProps['type'], {}> | undefined;
	permissionType?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, PermissionType | null | undefined, PermissionFieldsArgs['permissionType'], PermissionFieldsProps['permissionType'], {}> | undefined;
	roles?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, (RoleInput | null | undefined)[] | null | undefined, PermissionFieldsArgs['roles'], PermissionFieldsProps['roles'], RoleFields> | undefined;
	realm?: Option<TranslationFunctions, PermissionInput, QueryPermissionListArgs, RealmInput | null | undefined, PermissionFieldsArgs['realm'], PermissionFieldsProps['realm'], RealmFields> | undefined;
};

export const permissionFields: PermissionFields = {
	name: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::name::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::name::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::name::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::name::READ');
		},
		hiddenFilter: (args, fieldArg) => {
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
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Permission.fields.name.name();
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
			return !auth('Permission::description::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::description::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::description::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::description::READ');
		},
		hiddenFilter: (args, fieldArg) => {
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
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Permission.fields.description.name();
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
	field: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::field::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::field::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::field::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::field::READ');
		},
		hiddenFilter: (args, fieldArg) => {
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
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Permission.fields.field.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.field;
			if (fieldValue != null) {
				return fieldValue.toString();
			}
			return '';
		}
	},
	type: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::type::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::type::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::type::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::type::READ');
		},
		hiddenFilter: (args, fieldArg) => {
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
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Permission.fields.type.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return string;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.type;
			if (fieldValue != null) {
				return fieldValue.toString();
			}
			return '';
		}
	},
	permissionType: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::permissionType::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::permissionType::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::permissionType::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::permissionType::READ');
		},
		hiddenFilter: (args, fieldArg) => {
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
		},
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Permission.fields.permissionType.name();
		},
		fromRecord: ($LL, fields, title, record, fieldArg) => {
			const string = record?.[title];
			if (string != null) {
				return Object.entries($LL.graphql.enums.PermissionType.values).find(([_, v]) => v.name() === string)?.[0] as PermissionType;
			}
			return undefined;
		},
		toString: ($LL, value, fieldArg) => {
			const fieldValue = value?.permissionType;
			if (fieldValue != null) {
				return $LL.graphql.enums.PermissionType.values[fieldValue].name();
			}
			return '';
		}
	},
	roles: {
		readonly: (value, fieldArg) => {
			return !auth('Permission::roles::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::roles::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::roles::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::roles::READ');
		},
		hiddenFilter: (args, fieldArg) => {
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
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Permission.fields.roles.name();
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
			return !auth('Permission::realm::WRITE');
		},
		disabled: (value, fieldArg) => {
			return !auth('Permission::realm::WRITE');
		},
		hidden: (value, tab, fieldArg) => {
			return !auth('Permission::realm::READ');
		},
		hiddenCol: (args, tab, fieldArg) => {
			return !auth('Permission::realm::READ');
		},
		hiddenFilter: (args, fieldArg) => {
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
		title: ($LL, fieldArg) => {
			return $LL.graphql.objects.Permission.fields.realm.name();
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

export const validateRequired = async ($LL: TranslationFunctions, value: PermissionInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (value?.id || value?.where && Object.values(value.where).length > 0) {
			for (const [fieldName, fieldValue] of Object.entries(value)) {
				const options = permissionFields[fieldName as keyof PermissionFields];
				if (options?.required?.(value) && (fieldValue == null || Array.isArray(fieldValue) && !fieldValue.length)) {
					errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
				}
			}
		} else {
			for (const [fieldName, options] of Object.entries(permissionFields)) {
				const fieldValue = value[fieldName as keyof PermissionInput];
				if (options?.required?.(value) && (fieldValue == null || Array.isArray(fieldValue) && !fieldValue.length)) {
					errors[fieldName] = { errors: [{ message: $LL.errors.jsonSchema.required() }] };
				}
			}
		}
	}
	return errors;
};

export const validateErrors = async ($LL: TranslationFunctions, value: PermissionInput | null | undefined) => {
	const errors: Record<string, Errors> = {};
	if (value) {
		if (value?.id || value?.where && Object.values(value.where).length > 0) {
			for (const [fieldName, fieldValue] of Object.entries(value)) {
				const options = permissionFields[fieldName as keyof PermissionFields];
				const fieldErrors = await options?.validate?.($LL, value);
				if (fieldErrors && fieldErrors.length > 0) {
					errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
				}
			}
		} else {
			for (const [fieldName, options] of Object.entries(permissionFields)) {
				const fieldErrors = await options?.validate?.($LL, value);
				if (fieldErrors && fieldErrors.length > 0) {
					errors[fieldName] = { errors: fieldErrors.map((message) => ({ message })) };
				}
			}
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

export const toRecords = ($LL: TranslationFunctions, value: (PermissionInput | null | undefined)[] | null | undefined, fieldArgs?: PermissionFieldsArgs | undefined, fieldsPatch?: PermissionFields | undefined) => {
	const fields = fieldsPatch ?
		Object.fromEntries(
			Object.entries(fieldsPatch)
				.map(([fieldName, optionPatch]) => [fieldName, { ...permissionFields?.[fieldName as keyof PermissionFields], ...optionPatch }])
		) : permissionFields;
		
	return value?.map(item =>
		Object.fromEntries(
			Object.entries(fields)
				.flatMap(([fieldName, option]) => {
					const fieldArg = fieldArgs?.[fieldName as keyof PermissionFieldsArgs];
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

export const toErrors = (errors: Record<number, Errors>, fieldsPatch?: PermissionFields | undefined) => {
	const fields = fieldsPatch ?
		Object.fromEntries(
			Object.entries(fieldsPatch)
				.map(([fieldName, optionPatch]) => [fieldName, { ...permissionFields?.[fieldName as keyof PermissionFields], ...optionPatch }])
		) : permissionFields;
		
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

export const fromRecords = ($LL: TranslationFunctions, records: Record<string, string | null | undefined>[] | undefined, fieldArgs?: PermissionFieldsArgs | undefined, fieldsPatch?: PermissionFields | undefined) => {
	return records?.map(reocrd =>
		Object.fromEntries(
			Object.entries(permissionFields)
				.map(([fieldName, option]) => {
					const mergedOption = { ...option, ...fieldsPatch?.[fieldName as keyof PermissionFields] };
					const fieldArg = fieldArgs?.[fieldName as keyof PermissionFieldsArgs];
					const title = mergedOption.title?.($LL, fieldArg) || fieldName;
					const fields = option.toFields?.();
					return [fieldName, mergedOption.fromRecord?.($LL, fields, title, reocrd, fieldArg)];
				})
		) as PermissionInput
	);
}