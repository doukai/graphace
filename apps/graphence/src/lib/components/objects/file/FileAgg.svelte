<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal, Funnel } from '@steeze-ui/heroicons';
	import type { PermissionsStore } from '@graphace/commons';
	import { Field, Directive } from '@graphace/graphql';
	import { type Option, Combobox, Form, FormControl, Label, Loading } from '@graphace/ui';
	import FileFilter from '~/lib/components/objects/file/FileFilter.svelte';
	import type { QueryFileListArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let fields: Field[] = [];
	export let args: QueryFileListArgs = {};
	export let selectColumns: Option[] = [];
	export let groupByColumns: Option[] = [];
	export let orderByColumns: Option[] = [];
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };

	const contextClass = getContext<string>('ui.popover-content') || '';
	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

	const dispatch = createEventDispatcher<{
		query: {
			fields: Field[];
			args: QueryFileListArgs;
			directives?: Directive[];
		};
	}>();

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});

	$: selectOptions = [
		{
			value: '',
			label: $LL.graphql.objects.File.fields.name.name(),
			options: [
				{
					value: 'nameCount',
					label: $LL.graphql.objects.File.fields.nameCount.name()
				},
				{
					value: 'nameMax',
					label: $LL.graphql.objects.File.fields.nameMax.name()
				},
				{
					value: 'nameMin',
					label: $LL.graphql.objects.File.fields.nameMin.name()
				}
			],
			hidden: !permissions.auth('File::name::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.File.fields.contentType.name(),
			options: [
				{
					value: 'contentTypeCount',
					label: $LL.graphql.objects.File.fields.contentTypeCount.name()
				},
				{
					value: 'contentTypeMax',
					label: $LL.graphql.objects.File.fields.contentTypeMax.name()
				},
				{
					value: 'contentTypeMin',
					label: $LL.graphql.objects.File.fields.contentTypeMin.name()
				}
			],
			hidden: !permissions.auth('File::contentType::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.File.fields.content.name(),
			options: [
				{
					value: 'contentCount',
					label: $LL.graphql.objects.File.fields.contentCount.name()
				},
				{
					value: 'contentMax',
					label: $LL.graphql.objects.File.fields.contentMax.name()
				},
				{
					value: 'contentMin',
					label: $LL.graphql.objects.File.fields.contentMin.name()
				}
			],
			hidden: !permissions.auth('File::content::READ')
		},
		{
			value: '',
			label: $LL.graphql.objects.File.fields.url.name(),
			options: [
				{
					value: 'urlCount',
					label: $LL.graphql.objects.File.fields.urlCount.name()
				},
				{
					value: 'urlMax',
					label: $LL.graphql.objects.File.fields.urlMax.name()
				},
				{
					value: 'urlMin',
					label: $LL.graphql.objects.File.fields.urlMin.name()
				}
			],
			hidden: !permissions.auth('File::url::READ')
		}
	];

	let filteredSelectOptions = selectOptions;

	$: groupByOptions = [
		{
			value: 'name',
			label: $LL.graphql.objects.File.fields.name.name(),
			hidden: !permissions.auth('File::name::READ')
		},
		{
			value: 'contentType',
			label: $LL.graphql.objects.File.fields.contentType.name(),
			hidden: !permissions.auth('File::contentType::READ')
		},
		{
			value: 'content',
			label: $LL.graphql.objects.File.fields.content.name(),
			hidden: !permissions.auth('File::content::READ')
		},
		{
			value: 'url',
			label: $LL.graphql.objects.File.fields.url.name(),
			hidden: !permissions.auth('File::url::READ')
		}
	];

	let filteredGroupByOptions = groupByOptions;

	$: if (fields && fields.length > 0) {
		selectColumns = fields.flatMap((field) => {
			if (field.fields && field.fields.length > 0) {
				return selectOptions
					.filter((group) => group.value === field.name)
					.flatMap((group) =>
						field.fields!.flatMap((subField) =>
							group.options
								.filter((option) => option.value === subField.name)
								.map((option) => ({
									...option,
									parent: { value: group.value, label: group.label }
								}))
						)
					);
			} else {
				return selectOptions
					.filter((group) => !group.value)
					.flatMap((group) =>
						group.options
							.filter((option) => option.value === field.name)
							.map((option) => ({ ...option, parent: { value: group.value, label: group.label } }))
					);
			}
		});
	}

	$: if (args.groupBy && args.groupBy.length > 0) {
		groupByColumns = groupByOptions.filter((option) =>
			args.groupBy?.some((column) => option.value === column)
		);
	}

	$: orderByOptions = [
		...selectColumns,
		...groupByColumns.map((option) => ({
			...option,
			parent: { value: '', label: option.label }
		}))
	]
		.reduce((groups, option) => {
			if (
				groups.some(
					(group) => group.value === option.parent?.value && group.label === option.parent?.label
				)
			) {
				groups
					.find(
						(group) => group.value === option.parent?.value && group.label === option.parent?.label
					)
					?.options?.push(option);
			} else {
				groups.push({
					value: option.parent?.value,
					label: option.parent?.label,
					options: [option]
				});
			}
			return groups;
		}, <Option[]>[])
		.map((group) => {
			return {
				value: group.value,
				label: group.label,
				options: group.options?.flatMap((option) => [
					{ value: option.value, label: option.label + $LL.ui_graphql.table.th.asc(), node: 'ASC' },
					{
						value: option.value,
						label: option.label + $LL.ui_graphql.table.th.desc(),
						node: 'DESC'
					}
				])
			};
		});

	let filteredOrderByOptions = orderByOptions;

	$: if (args.orderBy && Object.keys(args.orderBy).length > 0) {
		orderByColumns = Object.entries(args.orderBy).flatMap((entry) => {
			if (entry[1] === 'ASC' || entry[1] === 'DESC') {
				return orderByOptions.flatMap((group) =>
					(group.options || [])
						.filter((option) => option.value === entry[0] && option.node === entry[1])
						.map((option) => ({ ...option, parent: group }))
				);
			} else {
				return Object.entries(entry[1] || {}).flatMap((subEntry) =>
					orderByOptions
						.filter((group) => group.value === entry[0])
						.flatMap((group) =>
							(group.options || [])
								.filter((option) => option.value === subEntry[0] && option.node === subEntry[1])
								.map((option) => ({ ...option, parent: group }))
						)
				);
			}
		});
	}

	const optionsToFields = (): Field[] => {
		return selectColumns.reduce((fields, option) => {
			if (option.parent?.value) {
				if (fields.some((field) => field.name === option.parent?.value)) {
					fields
						.find((field) => field.name === option.parent?.value)
						?.fields?.push(new Field({ name: option.value! }));
				} else {
					fields.push(
						new Field({ name: option.parent.value, fields: [new Field({ name: option.value! })] })
					);
				}
			} else {
				fields.push(new Field({ name: option.value! }));
			}
			return fields;
		}, <Field[]>[]);
	};

	const buildArguments = (): QueryFileListArgs => {
		if (groupByColumns.length > 0) {
			args.groupBy = groupByColumns.map((option) => option.value!);
		} else {
			args.groupBy = undefined;
		}

		if (orderByColumns.length > 0) {
			args.orderBy = Object.fromEntries(
				orderByColumns
					.reduce((groups, option) => {
						if (groups.some((group) => group.value === option.parent?.value)) {
							groups
								.find((group) => group.value === option.parent?.value)
								?.sorts?.push({ value: option.value!, sort: option.node });
						} else {
							if (option.parent?.value) {
								groups.push({
									value: option.parent?.value,
									sorts: [{ value: option.value!, sort: option.node }]
								});
							} else {
								groups.push({
									value: option.value!,
									sort: option.node
								});
							}
						}
						return groups;
					}, <{ value: string; sort?: string; sorts?: { value: string; sort: string }[] }[]>[])
					.map((sort) => {
						if (sort.sorts) {
							return [
								sort.value,
								Object.fromEntries(sort.sorts?.map((sort) => [sort.value, sort.sort]))
							];
						} else {
							return [sort.value, sort.sort];
						}
					})
			);
		} else {
			args.orderBy = undefined;
		}
		return args;
	};

	export const getFieldName = (fieldName: string, subFieldName?: string): string | undefined => {
		if (subFieldName) {
			return selectOptions
				.find((option) => option.value === fieldName)
				?.options?.find((option) => option.value === subFieldName)?.label;
		} else {
			return (
				selectOptions.find((option) => option.value === fieldName)?.label ||
				selectOptions.flatMap((option) =>
					option.options?.filter((option) => option.value === fieldName)
				)?.[0]?.label
			);
		}
	};

	export const getGrouByName = (fieldName: string): string | undefined => {
		return groupByOptions.find((group) => group.value === fieldName)?.label;
	};

	export const query = () => {
		dispatch('query', { fields, args });
	};

	query();
</script>

{#if showHeader}
	<div class="flex space-x-1">
		<div class="w-full">
			<Combobox
				multiple={true}
				options={filteredSelectOptions}
				bind:value={selectColumns}
				on:search={(e) => {
					if (e.detail.searchValue) {
						filteredSelectOptions = selectOptions
							.filter(
								(group) =>
									group.label.includes(e.detail.searchValue || '') ||
									group.options.some((option) => option.label.includes(e.detail.searchValue || ''))
							)
							.map((group) => ({
								...group,
								options: group.options.filter((option) =>
									option.label.includes(e.detail.searchValue || '')
								)
							}));
					} else {
						filteredSelectOptions = selectOptions;
					}
				}}
				on:change={(e) => {
					orderByColumns = orderByColumns.filter(
						(orderColumn) =>
							!Array.isArray(e.detail.value) ||
							e.detail.value.some((selectColumn) => selectColumn.value === orderColumn.value)
					);
					fields = optionsToFields();
					query();
				}}
			/>
		</div>
		{#if showOptionButton}
			<div class="tooltip" data-tip={$LL.graphence.components.agg.option()}>
				<button class="btn btn-square" use:melt={$trigger}>
					<Icon src={AdjustmentsHorizontal} class="h-5 w-5" />
				</button>
			</div>
			{#if $open}
				<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 7}]" />
				<div class="p-1 z-[{zIndex + 7}] {contextClass}" use:melt={$content}>
					<div use:melt={$arrow} />
					<Form class="max-h-60 overflow-y-auto">
						<FormControl let:id>
							<Label {id} text={$LL.graphence.components.agg.groupBy()} />
							<Combobox
								multiple={true}
								options={filteredGroupByOptions}
								bind:value={groupByColumns}
								on:search={(e) => {
									if (e.detail.searchValue) {
										filteredGroupByOptions = groupByOptions.filter((option) =>
											option.label.includes(e.detail.searchValue || '')
										);
									} else {
										filteredGroupByOptions = groupByOptions;
									}
								}}
								on:change={(e) => {
									orderByColumns = orderByColumns.filter(
										(orderColumn) =>
											!Array.isArray(e.detail.value) ||
											e.detail.value.some((groupColumn) => groupColumn.value === orderColumn.value)
									);
									args = buildArguments();
									query();
								}}
							/>
						</FormControl>
						<FormControl let:id>
							<Label {id} text={$LL.graphence.components.agg.orderBy()} />
							<Combobox
								multiple={true}
								options={filteredOrderByOptions}
								bind:value={orderByColumns}
								on:search={(e) => {
									if (e.detail.searchValue) {
										filteredOrderByOptions = orderByOptions
											.filter(
												(group) =>
													group.label?.includes(e.detail.searchValue || '') ||
													group.options?.some((option) =>
														option.label.includes(e.detail.searchValue || '')
													)
											)
											.map((group) => ({
												...group,
												options: group.options?.filter((option) =>
													option.label.includes(e.detail.searchValue || '')
												)
											}));
									} else {
										filteredOrderByOptions = orderByOptions;
									}
								}}
								on:change={(e) => {
									args = buildArguments();
									query();
								}}
							/>
						</FormControl>
					</Form>
				</div>
			{/if}
		{/if}
		{#if showFilterButton}
			<FileFilter
				bind:value={args}
				let:trigger
				on:filter={(e) => {
					args = buildArguments();
					query();
				}}
			>
				<div class="tooltip" data-tip={$LL.graphence.components.agg.filter()}>
					<button class="btn btn-square" use:melt={trigger}>
						<Icon src={Funnel} class="h-5 w-5" />
					</button>
				</div>
			</FileFilter>
		{/if}
	</div>
	<div class="divider" />
{/if}
<div class="overflow-auto {className}">
	{#if isFetching}
		<Loading class="loading-lg" />
	{:else}
		<slot
			{fields}
			{args}
			{selectOptions}
			{groupByOptions}
			{getFieldName}
			{getGrouByName}
			{query}
			{buildArguments}
		/>
	{/if}
</div>