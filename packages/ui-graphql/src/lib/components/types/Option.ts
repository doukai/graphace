import type { Errors } from '@graphace/commons';

export type Option<L, V, R, F, A, P, S> = {
    readonly?: ((value?: V | undefined, fieldArg?: A) => boolean) | undefined;
    disabled?: ((value?: V | undefined, fieldArg?: A) => boolean) | undefined;
    hidden?: ((value?: V | undefined, tab?: string | undefined, fieldArg?: A) => boolean | undefined) | undefined;
    hiddenCol?: ((args: R, tab?: string | undefined, fieldArg?: A) => boolean | undefined) | undefined;
    hiddenFilter?: ((args: R, fieldArg?: A) => boolean | undefined) | undefined;
    required?: ((value?: V | undefined) => boolean) | undefined;
    validate?: (($LL: L, value: V) => Promise<string[]>) | undefined;
    onChange?: (($LL: L, fieldValue: F, value?: V | null | undefined, fieldArg?: A) => Promise<V | null | undefined>) | undefined;
    props?: (($LL: L, value?: V | undefined, fieldArg?: A) => P) | undefined;
    toString?: (($LL: L, value?: V | null | undefined, fieldArg?: A) => string) | undefined;
    toFields?: ((fieldArg?: A) => S) | undefined;
    toRecord?: (($LL: L, fields: S, title: string, value?: V | null | undefined, fieldArg?: A) => Record<string, string | null | undefined>) | undefined;
    fromRecord?: (($LL: L, fields: S | undefined, title: string, record?: Record<string, string | null | undefined>, fieldArg?: A) => F) | undefined;
    title?: (($LL: L, fieldArg?: A) => string) | undefined;
    fields?: ((value?: V | null | undefined, fieldArg?: A) => S) | undefined;
};

export interface OptionEntry<L = unknown, A = unknown> {
	title?: (($LL: L, fieldArg?: A) => string) | undefined;
	toFields?: ((fieldArg?: A) => Record<string, OptionEntry<L, A>>) | undefined;
	toString?: (($LL: L, value?: unknown, fieldArg?: A) => string) | undefined;
	fromRecord?: (($LL: L, fields: Record<string, OptionEntry<L, A>> | undefined, title: string, record?: Record<string, string | null | undefined>, fieldArg?: A) => unknown) | undefined;
	toRecord?: (($LL: L, fields: Record<string, OptionEntry<L, A>>, title: string, value?: unknown, fieldArg?: A) => Record<string, string | undefined>) | undefined;
}

export interface FieldOption<L = unknown, A = unknown> extends OptionEntry<L, A> {
	required?: ((value?: unknown) => boolean) | undefined;
	validate?: (($LL: L, value: unknown) => Promise<string[]>) | undefined;
	fields?: ((value?: unknown, fieldArg?: A) => Record<string, FieldOption<L, A>>) | undefined;
}

type LLWithErrors = {
	errors: { jsonSchema: { required: () => string } };
};

export function stringFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string
): string | undefined {
	const string = record?.[title as string];
	if (string != null) {
		return string;
	}
	return undefined;
}

export function numberFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string
): number | undefined {
	const string = record?.[title as string];
	if (string != null) {
		return parseInt(string);
	}
	return undefined;
}

export function floatFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string
): number | undefined {
	const string = record?.[title as string];
	if (string != null) {
		return parseFloat(string);
	}
	return undefined;
}

export function dateTimeFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string
): string | undefined {
	const val = record?.[title as string];
	if (val == null) {
		return undefined;
	}
	if (typeof val !== "number") {
		return val;
	}
	if (val >= 25569) {
		const date = new Date((val - 25569) * 86400000);
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
	}
	return undefined;
}

export function dateFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string
): string | undefined {
	const val = record?.[title as string];
	if (val == null) {
		return undefined;
	}
	if (typeof val !== "number") {
		return val;
	}
	if (val >= 25569) {
		const date = new Date((val - 25569) * 86400000);
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
	}
	return undefined;
}

export function booleanFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string,
	trueLabel?: string
): boolean | undefined {
	const string = record?.[title as string];
	if (string != null && trueLabel != null) {
		return string === trueLabel;
	}
	return undefined;
}

export function enumFromRecord<F extends string>(
	record?: Record<string, string | null | undefined>,
	title?: string,
	enumValues?: Record<string, { name: () => string }>
): F | undefined {
	const string = record?.[title as string];
	if (string != null && enumValues) {
		return Object.entries(enumValues).find(([_, v]) => v.name() === string)?.[0] as F;
	}
	return undefined;
}

export function stringListFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string,
	separator?: string
): string[] | undefined {
	const string = record?.[title as string];
	if (string != null && separator != null) {
		if (string.includes(separator)) {
			return string.split(separator);
		} else {
			return [string];
		}
	}
	return undefined;
}

export function numberListFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string,
	separator?: string
): number[] | undefined {
	const string = record?.[title as string];
	if (string != null && separator != null) {
		const items = string.includes(separator) ? string.split(separator) : [string];
		return items.map(item => parseInt(item, 10));
	}
	return undefined;
}

export function floatListFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string,
	separator?: string
): number[] | undefined {
	const string = record?.[title as string];
	if (string != null && separator != null) {
		const items = string.includes(separator) ? string.split(separator) : [string];
		return items.map(item => parseFloat(item));
	}
	return undefined;
}

export function booleanListFromRecord(
	record?: Record<string, string | null | undefined>,
	title?: string,
	separator?: string,
	trueLabel?: string
): boolean[] | undefined {
	const string = record?.[title as string];
	if (string != null && separator != null && trueLabel != null) {
		const items = string.includes(separator) ? string.split(separator) : [string];
		return items.map(item => item === trueLabel);
	}
	return undefined;
}

export function enumListFromRecord<F extends string>(
	record?: Record<string, string | null | undefined>,
	title?: string,
	separator?: string,
	enumValues?: Record<string, { name: () => string }>
): F[] | undefined {
	const string = record?.[title as string];
	if (string != null && separator != null && enumValues) {
		const items = string.includes(separator) ? string.split(separator) : [string];
		return items
			.map(item => Object.entries(enumValues).find(([_, v]) => v.name() === item)?.[0] as F)
			.filter((v): v is F => v != null);
	}
	return undefined;
}

export function objectFromRecord<L, A, F>(
	$LL: L,
	fields: Record<string, unknown> | undefined,
	title: string,
	record?: Record<string, string | null | undefined>,
	fieldArg?: A
): F | undefined {
	if (fields) {
		const fieldRecord = Object.fromEntries(
			Object.entries(fields)
				.flatMap(([fieldName, option]: [string, unknown]) => {
					const opt = option as OptionEntry<L, A>;
					const string = record?.[title + '-' + (opt?.title?.($LL, fieldArg) || fieldName)];
					if (string) {
						return [[fieldName, string]];
					}
					return [];
				})
		);

		const value = Object.fromEntries(
			Object.entries(fields)
				.flatMap(([fieldName, option]: [string, unknown]) => {
					const opt = option as OptionEntry<L, A>;
					const subFields = opt.toFields?.();
					const value = opt.fromRecord?.($LL, subFields, fieldName, fieldRecord);
					if (value) {
						return [[fieldName, value]];
					}
					return [];
				})
		) as Record<string, unknown>;

		if (Object.keys(value).length) {
			return value as F;
		}
	}
	return undefined;
}

export function objectListFromRecord<L, A, F>(
	$LL: L,
	fields: Record<string, unknown> | undefined,
	title: string,
	record?: Record<string, string | null | undefined>,
	fieldArg?: A
): F[] {
	if (fields) {
		const fieldStringArray = Object.fromEntries(
			Object.entries(fields)
				.flatMap(([fieldName, option]: [string, unknown]) => {
					const opt = option as OptionEntry<L, A>;
					const string = record?.[title + '-' + (opt?.title?.($LL, fieldArg) || fieldName)];
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
						.map(([fieldName, stringArray]: [string, string[]]) =>
							[fieldName, stringArray[row]]
						)
				)
			);

		const value = fieldRecords.map(fieldRecord =>
			Object.fromEntries(
				Object.entries(fields)
					.flatMap(([fieldName, option]: [string, unknown]) => {
						const opt = option as OptionEntry<L, A>;
						const subFields = opt.toFields?.();
						const value = opt.fromRecord?.($LL, subFields, fieldName, fieldRecord);
						if (value) {
							return [[fieldName, value]];
						}
						return [];
					})
			)
		) as F[];

		if (value.length) {
			return value;
		}
	}
	return [];
}

export function objectToRecord<L, A, V extends Record<string, unknown>>(
	$LL: L,
	fields: Record<string, unknown>,
	title: string,
	value: V | null | undefined,
	fieldName: string,
	fieldArg?: A
): Record<string, string | undefined> {
	const fieldValue = value?.[fieldName];
	return Object.fromEntries(
		Object.entries(fields)
			.map(([subFieldName, option]: [string, unknown]) => {
				const opt = option as OptionEntry<L, A>;
				return [
					title + '-' + (opt?.title?.($LL, fieldArg) || subFieldName),
					opt?.toString?.($LL, fieldValue, fieldArg) || ''
				];
			})
	);
}

export function objectListToRecord<L, A, V extends Record<string, unknown>>(
	$LL: L,
	fields: Record<string, unknown>,
	title: string,
	value: V | null | undefined,
	fieldName: string,
	fieldArg?: A
): Record<string, string | undefined> {
	const fieldValue = value?.[fieldName] as unknown[] | undefined;
	return Object.fromEntries(
		Object.entries(fields)
			.map(([subFieldName, option]: [string, unknown]) => {
				const opt = option as OptionEntry<L, A>;
				return [
					title + '-' + (opt?.title?.($LL, fieldArg) || subFieldName),
					fieldValue?.map((item: unknown) => opt?.toString?.($LL, item, fieldArg) || '').join('|') || ''
				];
			})
	);
}

export function stringToString<V extends Record<string, unknown>>(
	value: V | null | undefined,
	fieldName: string
): string {
	const fieldValue = value?.[fieldName] as string | null | undefined;
	if (fieldValue != null) {
		return String(fieldValue);
	}
	return '';
}

export function numberToString<V extends Record<string, unknown>>(
	value: V | null | undefined,
	fieldName: string
): string {
	const fieldValue = value?.[fieldName] as number | null | undefined;
	if (fieldValue != null) {
		return String(fieldValue);
	}
	return '';
}

export function floatToString<V extends Record<string, unknown>>(
	value: V | null | undefined,
	fieldName: string
): string {
	const fieldValue = value?.[fieldName] as number | null | undefined;
	if (fieldValue != null) {
		return String(fieldValue);
	}
	return '';
}

export function booleanToString<V extends Record<string, unknown>>(
	value: V | null | undefined,
	fieldName: string,
	trueLabel: string,
	falseLabel: string
): string {
	const fieldValue = value?.[fieldName];
	if (fieldValue != null) {
		return fieldValue ? trueLabel : falseLabel;
	}
	return '';
}

export function enumToString<V extends Record<string, unknown>, F extends string>(
	value: V | null | undefined,
	fieldName: string,
	enumValues: Record<string, { name: () => string }>
): string {
	const fieldValue = value?.[fieldName] as F | undefined;
	if (fieldValue != null) {
		return enumValues[fieldValue]?.name() ?? '';
	}
	return '';
}

export function stringListToString<V extends Record<string, unknown>>(
	value: V | null | undefined,
	fieldName: string,
	separator: string
): string {
	const fieldValue = value?.[fieldName] as (string | null | undefined)[] | null | undefined;
	if (fieldValue != null) {
		return fieldValue.map(item => item != null ? String(item) : '').join(separator);
	}
	return '';
}

export function numberListToString<V extends Record<string, unknown>>(
	value: V | null | undefined,
	fieldName: string,
	separator: string
): string {
	const fieldValue = value?.[fieldName] as (number | null | undefined)[] | null | undefined;
	if (fieldValue != null) {
		return fieldValue.map(item => item != null ? String(item) : '').join(separator);
	}
	return '';
}

export function floatListToString<V extends Record<string, unknown>>(
	value: V | null | undefined,
	fieldName: string,
	separator: string
): string {
	const fieldValue = value?.[fieldName] as (number | null | undefined)[] | null | undefined;
	if (fieldValue != null) {
		return fieldValue.map(item => item != null ? String(item) : '').join(separator);
	}
	return '';
}

export function booleanListToString<V extends Record<string, unknown>>(
	value: V | null | undefined,
	fieldName: string,
	separator: string,
	trueLabel: string,
	falseLabel: string
): string {
	const fieldValue = value?.[fieldName] as (boolean | null | undefined)[] | null | undefined;
	if (fieldValue != null) {
		return fieldValue.map(item =>
			item != null ? (item ? trueLabel : falseLabel) : ''
		).join(separator);
	}
	return '';
}

export function enumListToString<V extends Record<string, unknown>, F extends string>(
	value: V | null | undefined,
	fieldName: string,
	separator: string,
	enumValues: Record<string, { name: () => string }>
): string {
	const fieldValue = value?.[fieldName] as (F | null | undefined)[] | null | undefined;
	if (fieldValue != null) {
		return fieldValue.map(item => item != null ? (enumValues[item]?.name() ?? '') : '').join(separator);
	}
	return '';
}

export function createValidators<
	V extends Record<string, unknown>,
	Fields,
	A = unknown,
	L = unknown
>(
	fields: Fields
) {
	const fieldEntries = fields as Record<string, FieldOption<L, A> | undefined>;

	const validateRequired = async ($LL: L, value: V | null | undefined) => {
		const errors: Record<string, Errors> = {};
		if (value) {
			if (value?.id || value?.where && Object.values(value.where).length > 0) {
				for (const [fieldName, fieldValue] of Object.entries(value)) {
					const options = fieldEntries[fieldName];
					if (options?.required?.(value) && (fieldValue == null || Array.isArray(fieldValue) && !fieldValue.length)) {
						errors[fieldName] = { errors: [{ message: ($LL as unknown as LLWithErrors).errors.jsonSchema.required() }] };
					}
				}
			} else {
				for (const [fieldName, options] of Object.entries(fieldEntries)) {
					const fieldValue = value[fieldName as keyof V];
					if (options?.required?.(value) && (fieldValue == null || Array.isArray(fieldValue) && !fieldValue.length)) {
						errors[fieldName] = { errors: [{ message: ($LL as unknown as LLWithErrors).errors.jsonSchema.required() }] };
					}
				}
			}
		}
		return errors;
	};

	const validateErrors = async ($LL: L, value: V | null | undefined) => {
		const errors: Record<string, Errors> = {};
		if (value) {
			if (value?.id || value?.where && Object.values(value.where).length > 0) {
				for (const [fieldName, fieldValue] of Object.entries(value)) {
					const options = fieldEntries[fieldName];
					const fieldErrors = await options?.validate?.($LL, value);
					if (fieldErrors && fieldErrors.length > 0) {
						errors[fieldName] = { errors: fieldErrors.map((message: string) => ({ message })) };
					}
				}
			} else {
				for (const [fieldName, options] of Object.entries(fieldEntries)) {
					const fieldErrors = await options?.validate?.($LL, value);
					if (fieldErrors && fieldErrors.length > 0) {
						errors[fieldName] = { errors: fieldErrors.map((message: string) => ({ message })) };
					}
				}
			}
		}
		return errors;
	};

	const validate = async ($LL: L, value: V | null | undefined) => {
		let errors = await validateRequired($LL, value);
		if (Object.keys(errors).length === 0) {
			errors = await validateErrors($LL, value);
		}
		if (Object.keys(errors).length === 0) {
			return value;
		}
		throw errors;
	};

	const validateAll = async ($LL: L, value: (V | null | undefined)[] | null | undefined) => {
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
		if (Object.keys(errors).length === 0) {
			return value;
		}
		throw errors;
	};

	return { validateRequired, validateErrors, validate, validateAll };
}

export function createConverters<
	V extends Record<string, unknown>,
	Fields,
	FieldsArgs extends Record<string, unknown> = Record<string, unknown>,
	L = unknown
>(
	fields: Fields
) {
	const fieldEntries = fields as Record<string, FieldOption<L, unknown> | undefined>;

	const toRecords = ($LL: L, value: (V | null | undefined)[] | null | undefined, fieldArgs?: FieldsArgs | undefined, fieldsPatch?: Fields | undefined) => {
		const mergedFields = fieldsPatch ?
			Object.fromEntries(
				Object.entries(fieldsPatch as Record<string, unknown>)
					.map(([fieldName, optionPatch]) => [fieldName, { ...fieldEntries[fieldName], ...(optionPatch as Record<string, unknown>) }])
			) as Record<string, FieldOption<L, unknown>> : fieldEntries as Record<string, FieldOption<L, unknown>>;

		return value?.map(item =>
			Object.fromEntries(
				Object.entries(mergedFields)
					.flatMap(([fieldName, option]: [string, FieldOption<L, unknown> | undefined]) => {
						const fieldArg = fieldArgs?.[fieldName as keyof FieldsArgs];
						const title = option?.title?.($LL, fieldArg) || fieldName;
						const subFields = option?.toFields?.();
						if (subFields && option?.toRecord) {
							return Object.entries(option.toRecord($LL, subFields, title, item, fieldArg));
						}
						const entry: [string, string | null | undefined] = [title, option?.toString?.($LL, item, fieldArg) || ''];
						return [entry];
					})
			)
		);
	};

	const toErrors = (errors: Record<number, Errors>, fieldsPatch?: Fields | undefined) => {
		const mergedFields = fieldsPatch ?
			Object.fromEntries(
				Object.entries(fieldsPatch as Record<string, unknown>)
					.map(([fieldName, optionPatch]) => [fieldName, { ...fieldEntries[fieldName], ...(optionPatch as Record<string, unknown>) }])
			) as Record<string, FieldOption<L, unknown>> : fieldEntries as Record<string, FieldOption<L, unknown>>;

		return Object.fromEntries(
			Object.entries(errors)
				.map(([row, errorRecord]: [string, Errors]) =>
					[
						row,
						Object.entries(mergedFields)
							.flatMap(([fieldName, option]: [string, FieldOption<L, unknown> | undefined]) => {
								const fieldMessages = errorRecord.iterms?.[fieldName]?.errors?.map((error) => error.message);
								const subFields = option?.toFields?.();
								if (subFields) {
									if (errorRecord.iterms?.[fieldName]?.iterms?.[0]) {
										return Object.keys(subFields)
											.map((subFieldName) =>
												[
													...(fieldMessages || []),
													...Object.values(errorRecord.iterms?.[fieldName]?.iterms || {})
														.flatMap((rowErrors: Errors) =>
															rowErrors.iterms?.[subFieldName]?.errors?.map((error) => error.message) || [])
												]
											);
									} else {
										return Object.keys(subFields)
											.map((subFieldName) =>
												[
													...(fieldMessages || []),
													...(errorRecord.iterms?.[fieldName]?.iterms?.[subFieldName]?.errors?.map((error) => error.message) || [])
												]
											);
									}
								}
								if (errorRecord.iterms?.[fieldName]?.iterms?.[0]) {
									return [
										[
											...(fieldMessages || []),
											...Object.values(errorRecord.iterms?.[fieldName]?.iterms || {})
												.flatMap((rowErrors: Errors) =>
													rowErrors.errors?.map((error) => error.message) || []
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
	};

	const fromRecords = ($LL: L, records: Record<string, string | null | undefined>[] | undefined, fieldArgs?: FieldsArgs | undefined, fieldsPatch?: Fields | undefined) => {
		return records?.map(record =>
			Object.fromEntries(
				Object.entries(fieldEntries)
					.map(([fieldName, option]: [string, FieldOption<L, unknown> | undefined]) => {
						const mergedOption = { ...option, ...((fieldsPatch as Record<string, unknown>)?.[fieldName] as Record<string, unknown> | undefined) };
						const fieldArg = fieldArgs?.[fieldName as keyof FieldsArgs];
						const title = mergedOption.title?.($LL, fieldArg) || fieldName;
						const subFields = option?.toFields?.();
						return [fieldName, mergedOption.fromRecord?.($LL, subFields, title, record, fieldArg)];
					})
			) as V
		);
	};

	return { toRecords, toErrors, fromRecords };
}

export type ScalarFieldProps = {
	'tr'?: {} | undefined;
	'th'?: {} | undefined;
	'td'?: {} | undefined;
	'form-control'?: {} | undefined;
	'input'?: {} | undefined;
};

export type EnumFieldProps = {
	'tr'?: {} | undefined;
	'th'?: {} | undefined;
	'td'?: {} | undefined;
	'form-control'?: {} | undefined;
	'select'?: {} | undefined;
};

export type ObjectFieldProps = {
	'tr'?: {} | undefined;
	'th'?: {} | undefined;
	'td'?: {} | undefined;
	'form-control'?: {} | undefined;
	'table'?: {} | undefined;
	'form'?: {} | undefined;
	'combobox'?: {} | undefined;
	'dialog'?: {} | undefined;
	'link'?: {} | undefined;
};
