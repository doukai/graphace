<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { AdjustmentsHorizontal, Funnel, Bookmark } from '@steeze-ui/heroicons';
	import type { PermissionsStore } from '@graphace/commons';
	import { Field, Directive, type GraphQLError } from '@graphace/graphql';
	import { Combobox, type Group as G, Pagination, type Option, z_index } from '@graphace/ui';
	import RealmFilter from '~/lib/components/objects/realm/RealmFilter.svelte';
	import type { RealmConnection, RealmConnectionQueryArguments } from '~/lib/types/schema';
	import { __schema } from '~/utils';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let fields: Field[] = [];
	export let queryFields: Field[] = [];
	export let queryArguments: RealmConnectionQueryArguments = {};
	export let selectColumns: Option[] = [];
	export let join: Option | undefined = undefined;
	export let joinColumns: Option[] = [];
	export let orderByColumns: Option[] = [];
	export let totalCount: number = 0;
	export let pageNumber: number = 1;
	export let pageSize: number = 10;
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;
	export let className: string = '';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');
	const typeName = 'Realm';
	const idFieldName = 'id';
	
	const dispatch = createEventDispatcher<{
		query: { 
			fields: Field[];
			queryArguments: RealmConnectionQueryArguments;
			directives?: Directive[];
			then?: (connection: RealmConnection | null | undefined) => void;
			catch?: (errors: GraphQLError[]) => void;
		};
		bookmark: { fields: string; queryArguments: string };
	}>();

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});

	const z_class7 = z_index.top(7);

	$: selectOptions = [
		{
			value: '',
			label: $LL.graphql.objects.Realm.name(),
			options: [
				{
					value: 'id',
					label: $LL.graphql.objects.Realm.fields.id.name(),
					disabled: !permissions.auth('Realm::id::READ')
				},
				{
					value: 'name',
					label: $LL.graphql.objects.Realm.fields.name.name(),
					disabled: !permissions.auth('Realm::name::READ')
				},
				{
					value: 'description',
					label: $LL.graphql.objects.Realm.fields.description.name(),
					disabled: !permissions.auth('Realm::description::READ')
				},
			]
		},
	];

	let filteredSelectOptions = selectOptions;

	$: joinOptions = [
	];

	let filteredJoinOptions =
		joinOptions?.map((option) => ({
			value: option.value,
			label: option.label,
			disabled: option.disabled
		})) || [];

	$: joinColumnOptions = join
		? joinOptions.find((option) => option.value === join?.value)?.options
		: [];

	let filteredJoinColumnOptions = joinColumnOptions;

	$: if (fields && fields.length > 0) {
		selectColumns = fields.flatMap((field) => {
			if (field.fields && field.fields.length > 0) {
				return selectOptions
					.filter((group) => group.value === field.name)
					.flatMap((group) =>
						field.fields!.flatMap((subField) =>
							group.options
								.filter((option) => option.value === subField.name)
								.map((option) => ({ ...option, group: { value: group.value, label: group.label } }))
						)
					);
			} else {
				return selectOptions
					.filter((group) => !group.value)
					.flatMap((group) =>
						group.options
							.filter((option) => option.value === field.name)
							.map((option) => ({ ...option, group: { value: group.value, label: group.label } }))
					);
			}
		});
	}

	$: orderByOptions = selectColumns.reduce((groups, option) => {
			if (
				groups.some(
					(group) => group.value === option.group?.value && group.label === option.group?.label
				)
			) {
				groups
					.find(
						(group) => group.value === option.group?.value && group.label === option.group?.label
					)
					?.options?.push(option);
			} else {
				groups.push({
					value: option.group?.value,
					label: option.group?.label,
					options: [option]
				});
			}
			return groups;
		}, <G[]>[])
		.map((group) => {
			return {
				value: group.value,
				label: group.label,
				options: group.options?.flatMap((option) => [
					{ value: option.value, label: option.label + $LL.ui_graphql.table.th.asc(), node: 'ASC' },
					{ value: option.value, label: option.label + $LL.ui_graphql.table.th.desc(), node: 'DESC' }
				])
			};
		});

	let filteredOrderByOptions = orderByOptions;

	$: if (queryArguments.orderBy && Object.keys(queryArguments.orderBy).length > 0) {
		orderByColumns = Object.entries(queryArguments.orderBy).flatMap((entry) => {
			if (entry[1] === 'ASC' || entry[1] === 'DESC') {
				return orderByOptions.flatMap((group) =>
					(group.options || [])
						.filter((option) => option.value === entry[0] && option.node === entry[1])
						.map((option) => ({ ...option, group: group }))
				);
			} else {
				return Object.entries(entry[1] || {}).flatMap((subEntry) =>
					orderByOptions
						.filter((group) => group.value === entry[0])
						.flatMap((group) =>
							(group.options || [])
								.filter((option) => option.value === subEntry[0] && option.node === subEntry[1])
								.map((option) => ({ ...option, group: group }))
						)
				);
			}
		});
	}

	if (queryArguments.first) {
		pageSize = queryArguments.first;
	}

	if (queryArguments.offset) {
		pageNumber = queryArguments.offset / pageSize + 1;
	}

	const optionsToFields = (): Field[] => {
		return [
			...selectColumns.reduce((fields, option) => {
				if (option.group?.value) {
					if (fields.some((field) => field.name === option.group?.value)) {
						fields
							.find((field) => field.name === option.group?.value)
							?.fields?.push(new Field({ name: option.value }));
					} else {
						fields.push(new Field({
							name: option.group.value,
							fields: [new Field({ name: option.value })]
						}));
					}
				} else {
					fields.push(new Field({ name: option.value }));
				}
				return fields;
			}, <Field[]>[]),
			...(join && joinColumns && joinColumns.length > 0
				? [new Field({ name: join.value, fields: joinColumns?.map((column) => new Field({ name: column.value })) })]
				: [])
		];
	};

	export const buildArguments = (toPageNumber?: number | undefined, limit?: number | undefined): RealmConnectionQueryArguments => {
		if (!queryArguments) {
			queryArguments = {};
		}

		if (orderByColumns.length > 0) {
			queryArguments.orderBy = Object.fromEntries(
				orderByColumns
					.reduce((groups, option) => {
						if (groups.some((group) => group.value === option.group?.value)) {
							groups
								.find((group) => group.value === option.group?.value)
								?.sorts?.push({ value: option.value, sort: option.node });
						} else {
							if (option.group?.value) {
								groups.push({
									value: option.group?.value,
									sorts: [{ value: option.value, sort: option.node }]
								});
							} else {
								groups.push({
									value: option.value,
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
			queryArguments.orderBy = undefined;
		}

		queryArguments.offset = ((toPageNumber || pageNumber) - 1) * (limit || pageSize);
		queryArguments.first = limit || pageSize;
		return queryArguments;
	};

	export const getFieldName = (fieldName: string, subFieldName?: string): string => {
		if (subFieldName) {
			return [...selectOptions, ...joinOptions]
				.filter((group) => group.value === fieldName)
				?.flatMap((group) => group.options.filter((option) => option.value === subFieldName))[0]
				.label;
		} else {
			return (
				[...selectOptions, ...joinOptions]
					.filter((group) => !group.value)
					?.flatMap((group) => group.options.filter((option) => option.value === fieldName))?.[0] ||
				[...selectOptions, ...joinOptions].find((group) => group.value === fieldName)
			).label;
		}
	};

	export const queryPage = (toPageNumber?: number | undefined) => {
		if (toPageNumber) {
			queryArguments.offset = (toPageNumber - 1) * pageSize;
		}
		const _fields = optionsToFields();
		if (!_fields.some((subField) => subField.name === idFieldName)) {
			_fields.push(new Field({ name: idFieldName }));
		}
		_fields.forEach((field) => {
			if (field.fields) {
				const idFieldName = __schema
					.getType(
						__schema.getType(typeName)?.getField(field.name)?.getType().getNamedType()?.getName()!
					)
					?.getIDField()
					?.getName();
				if (!field.fields.some((subField) => subField.name === idFieldName)) {
					field.fields.push(new Field({ name: idFieldName! }));
				}
			}
		});
		dispatch('query', { fields: _fields, queryArguments });
	};

	queryPage();
</script>

{#if showHeader}
	<div class="flex space-x-1">
		<Combobox
			title={$LL.graphence.components.query.columns()}
			multiple={true}
			groups={filteredSelectOptions}
			rootClassName="w-full"
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
				queryPage(1);
			}}
		/>
		{#if showOptionButton}
			<div class="tooltip" data-tip={$LL.graphence.components.query.option()}>
				<button class="btn btn-square" use:melt={$trigger}>
					<Icon src={AdjustmentsHorizontal} class="h-5 w-5" />
				</button>
			</div>
			{#if $open}
				<div use:melt={$overlay} class="fixed inset-0 {z_class7}" />
				<div
					class="p-1 rounded-xl bg-base-200 shadow {z_class7}"
					use:melt={$content}
				>
					<div use:melt={$arrow} />
					<div class="space-y-1" transition:fade={{ duration: 100 }}>
						<Combobox
							title={$LL.graphence.components.query.join()}
							options={filteredJoinOptions}
							rootClassName="w-full"
							className="md:input-xs"
							containerClassName="md:min-h-8"
							tagClassName="md:badge-sm"
							groupClassName="md:input-group-sm"
							bind:value={join}
							on:search={(e) => {
								if (e.detail.searchValue) {
									filteredJoinOptions =
										joinOptions
											?.filter((group) => group.label?.includes(e.detail.searchValue || ''))
											.map((option) => ({
												value: option.value,
												label: option.label,
												disabled: option.disabled
											})) || [];
								} else {
									filteredJoinOptions =
										joinOptions?.map((option) => ({
											value: option.value,
											label: option.label,
											disabled: option.disabled
										})) || [];
								}
							}}
							on:change={(e) => {
								fields = optionsToFields();
								queryPage(1);
							}}
						/>
						<Combobox
							title={$LL.graphence.components.query.joinColumns()}
							multiple={true}
							options={filteredJoinColumnOptions}
							rootClassName="w-full"
							className="md:input-xs"
							containerClassName="md:min-h-8"
							tagClassName="md:badge-sm"
							groupClassName="md:input-group-sm"
							bind:value={joinColumns}
							on:search={(e) => {
								if (e.detail.searchValue) {
									filteredJoinColumnOptions = joinColumnOptions?.filter((option) =>
										option.label?.includes(e.detail.searchValue || '')
									);
								} else {
									filteredJoinColumnOptions = joinColumnOptions;
								}
							}}
							on:change={(e) => {
								fields = optionsToFields();
								queryPage(1);
							}}
						/>
						<Combobox
							title={$LL.graphence.components.query.orderBy()}
							multiple={true}
							groups={filteredOrderByOptions}
							rootClassName="w-full"
							className="md:input-xs"
							containerClassName="md:min-h-8"
							tagClassName="md:badge-sm"
							groupClassName="md:input-group-sm"
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
								queryArguments = buildArguments();
								queryPage(1);
							}}
						/>
					</div>
				</div>
			{/if}
		{/if}
		{#if showFilterButton}
			<RealmFilter
				bind:value={queryArguments}
				let:trigger
				on:filter={(e) => {
					queryArguments = buildArguments();
					queryPage(1);
				}}
			>
				<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
					<button class="btn btn-square" use:melt={trigger}>
						<Icon src={Funnel} class="h-5 w-5" />
					</button>
				</div>
			</RealmFilter>
		{/if}
		{#if showBookmarkButton}
			<div class="tooltip" data-tip={$LL.graphence.components.query.bookmark()}>
				<button
					class="btn btn-square"
					on:click={(e) =>
						dispatch('bookmark', {
							fields: JSON.stringify(fields),
							queryArguments: JSON.stringify(queryArguments)
						})}
				>
					<Icon src={Bookmark} class="h-5 w-5" />
				</button>
			</div>
		{/if}
	</div>
	<div class="divider" />
{/if}
<div class="card-body overflow-auto {className}">
	{#if isFetching}
		<div class="flex justify-center">
			<span class="loading loading-bars loading-lg" />
		</div>
	{:else}
		<slot
			{fields}
			{queryFields}
			{queryArguments}
			{selectOptions}
			{getFieldName}
			{queryPage}
			{buildArguments}
		/>
	{/if}
</div>
{#if showFooter}
	<div class="divider" />
	<Pagination
		bind:pageNumber
		bind:pageSize
		{totalCount}
		on:pageChange={(e) => queryPage()}
		on:sizeChange={(e) => queryPage()}
	/>
{/if}
