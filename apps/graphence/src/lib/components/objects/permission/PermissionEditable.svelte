<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark, Funnel, Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import {
		Buttons,
		Empty,
		Label,
		Loading,
		SearchInput,
		Table,
		Tr,
		Td,
		Tabs,
		type TabInfo
	} from '@graphace/ui';
	import { StringTh, StringInput, ObjectLink } from '@graphace/ui-graphql';
	import PermissionFilter from '~/lib/components/objects/permission/PermissionFilter.svelte';
	import PermissionFormDialog from '~/lib/components/objects/permission/PermissionFormDialog.svelte';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeInput from '~/lib/components/enums/permission-type/PermissionTypeInput.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		permissionTabs,
		permissionTab,
		permissionTabChange,
		permissionFields,
		type PermissionFields,
		type PermissionFieldsArgs,
		validateAll
	} from '~/lib/components/objects/permission/PermissionOption';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		PermissionOrderBy,
		QueryPermissionListArgs,
		PermissionInput
	} from '~/lib/types/schema';

	export let value: (PermissionInput | null | undefined)[] | null | undefined = undefined;
	export let args: QueryPermissionListArgs = {};
	export let orderBy: PermissionOrderBy = {};
	export let selectedIdList: (string | null | undefined)[] = [];
	export let selectedRowList: number[] = [];
	export let isFetching: boolean = false;
	export let isMutating: boolean = false;
	export let errors: Record<number, Errors> = {};
	export let showEditButton: boolean = false;
	export let showEditDialog: boolean = false;
	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showCreateButton: boolean = false;
	export let showCreateDialog: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = false;
	export let showSearchInput: boolean = false;
	export let title: string | undefined = undefined;
	export let zIndex: number = 0;
	let className: string | undefined = '[&_[data-part=table]]:table-pin-rows [&_[data-part=table]]:table-pin-cols';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryPermissionListArgs | undefined) => TabInfo[] | undefined) | undefined = permissionTabs;
	export let tab: string | undefined = permissionTab?.(args);
	export let fields: PermissionFields | undefined = permissionFields;
	export let fieldsPatch: PermissionFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: PermissionFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryPermissionListArgs; orderBy: PermissionOrderBy };
		remove: {
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		unbind: {
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		edit: {
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		save: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
		select: {
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined ;
			row?: number[] | number | undefined;
		};
		tabChange: { tab: string; origin: string; };
		create: {};
		back: {};
	}>();

	let selectAll: boolean;
</script>

<div class="flex justify-between">
	<slot name="start" />
	<slot name="title">
		<span class="text-xl font-semibold self-center max-sm:hidden">
			{#if title}
				{title}
			{:else}
				{$LL.graphql.objects.Permission.name()}
			{/if}
		</span>
	</slot>
	<Buttons
		showRemoveButton={showRemoveButton && selectedIdList.length > 0}
		showUnbindButton={showUnbindButton && selectedIdList.length > 0}
		{showSaveButton}
		{showCreateButton}
		{showSelectButton}
		{showBackButton}
		loading={isMutating}
		on:save={(e) =>
			validateAll($LL, value)
				.then((value) => dispatch('save', { value }))
				.catch((e) => (errors = e))}
		on:remove={(e) =>
			dispatch('remove', {
				value: value?.filter((node) => selectedIdList.includes(node?.id)),
				row: selectedRowList
			})}
		on:unbind={(e) =>
			dispatch('unbind', {
				value: value?.filter((node) => selectedIdList.includes(node?.id)),
				row: selectedRowList
			})}
		on:select={(e) =>
			dispatch('select', {
				value: value?.filter((node) => selectedIdList.includes(node?.id)),
				row: selectedRowList
			})}
		on:create
		on:back
	>
		<svelte:fragment slot="start">
			<slot name="search">
				{#if showSearchInput}
					<SearchInput class="max-sm:w-full" on:search />
				{/if}
			</slot>
			<div class="sm:hidden">
				<PermissionFilter
					bind:value={args}
					let:trigger
					on:filter={(e) => dispatch('query', { args, orderBy })}
				>
					<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
						<button class="btn btn-square" use:melt={trigger}>
							<Icon src={Funnel} class="h-5 w-5" />
						</button>
					</div>
				</PermissionFilter>
			</div>
		</svelte:fragment>
		{#if showCreateDialog}
			<PermissionFormDialog
				text={$LL.ui.button.create()}
				{fields}
				select
				clearAfterSelect
				class="btn-accent"
				on:select={(e) => {
					value = [...(value || []), e.detail.value];
				}}
			>
				<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
			</PermissionFormDialog>
		{/if}
		<slot />
	</Buttons>
</div>
<div class="divider my-0" />
{#if tabs?.($LL, args)}
	<Tabs
		bind:value={tab}
		tabs={tabs?.($LL, args)}
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				permissionTabChange(e.detail.value, args, value)
					.then((args) => {
						dispatch('query', {
							args,
							orderBy
						});
					})
					.catch((e) => (errors = e));
			}
		}}
	/>
{/if}
<Table {zIndex} class="max-sm:hidden {className}">
	<thead>
		<tr>
			<th class="w-0">
				<label>
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={selectAll}
						on:change={(e) => {
							if (value && value.length > 0) {
								if (selectAll) {
									selectedIdList = [
										...new Set([...selectedIdList, ...value.map((node) => node?.id)])
									];
									selectedRowList = [...value?.map((_, row) => row)];
								} else {
									selectedIdList = [
										...selectedIdList.filter(
											(selectedId) => !value?.some((node) => node?.id === selectedId)
										)
									];
									selectedRowList = [];
								}
							}
						}}
					/>
				</label>
			</th>
			<slot name="name-th" {args} {orderBy} {fields}>
				{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
					<StringTh
						name={$LL.graphql.objects.Permission.fields.name.name()}
						bind:value={args.name}
						bind:sort={orderBy.name}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.name?.required?.()}
						{zIndex}
						{...fields?.name?.props?.($LL, undefined, fieldsArgs?.name)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="description-th" {args} {orderBy} {fields}>
				{#if !fields?.description?.hiddenCol?.(args, tab, fieldsArgs?.description)}
					<StringTh
						name={$LL.graphql.objects.Permission.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{zIndex}
						{...fields?.description?.props?.($LL, undefined, fieldsArgs?.description)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="field-th" {args} {orderBy} {fields}>
				{#if !fields?.field?.hiddenCol?.(args, tab, fieldsArgs?.field)}
					<StringTh
						name={$LL.graphql.objects.Permission.fields.field.name()}
						bind:value={args.field}
						bind:sort={orderBy.field}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.field?.required?.()}
						{zIndex}
						{...fields?.field?.props?.($LL, undefined, fieldsArgs?.field)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="type-th" {args} {orderBy} {fields}>
				{#if !fields?.type?.hiddenCol?.(args, tab, fieldsArgs?.type)}
					<StringTh
						name={$LL.graphql.objects.Permission.fields.type.name()}
						bind:value={args.type}
						bind:sort={orderBy.type}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.type?.required?.()}
						{zIndex}
						{...fields?.type?.props?.($LL, undefined, fieldsArgs?.type)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="permissionType-th" {args} {orderBy} {fields}>
				{#if !fields?.permissionType?.hiddenCol?.(args, tab, fieldsArgs?.permissionType)}
					<PermissionTypeTh
						name={$LL.graphql.objects.Permission.fields.permissionType.name()}
						bind:value={args.permissionType}
						bind:sort={orderBy.permissionType}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.permissionType?.required?.()}
						{zIndex}
						{...fields?.permissionType?.props?.($LL, undefined, fieldsArgs?.permissionType)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="roles-th" {args} {orderBy} {fields}>
				{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
					<RoleTh
						name={$LL.graphql.objects.Permission.fields.roles.name()}
						bind:value={args.roles}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.roles?.required?.()}
						{zIndex}
						{...fields?.roles?.props?.($LL, undefined, fieldsArgs?.roles)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="realm-th" {args} {orderBy} {fields}>
				{#if !fields?.realm?.hiddenCol?.(args, tab, fieldsArgs?.realm)}
					<RealmTh
						name={$LL.graphql.objects.Permission.fields.realm.name()}
						bind:value={args.realm}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.realm?.required?.()}
						{zIndex}
						{...fields?.realm?.props?.($LL, undefined, fieldsArgs?.realm)?.['th']}
					/>
				{/if}
			</slot>
			<th class="w-0" />
		</tr>
	</thead>
	<tbody>
		{#if isFetching}
			<tr>
				<td colspan="999">
					<Loading class="loading-lg" />
				</td>
			</tr>
		{:else if value && value.length > 0}
			{#each value as node, row}
				{#if node}
					<tr class="hover">
						<th>
							<label>
								<input
									type="checkbox"
									class="checkbox"
									bind:group={selectedRowList}
									value={row}
									on:change={(e) => {
										selectedIdList = [
											...selectedRowList
												.filter(
													(row) => value?.[row]?.id !== undefined && value?.[row]?.id !== null
												)
												.map((row) => value?.[row]?.id)
										];
									}}
								/>
							</label>
						</th>
						<slot name="name" {node} {errors} {fields} {row}>
							{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
								<Td {zIndex} {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['td']}>
									<StringInput
										name="name"
										bind:value={node.name}
										readonly={fields?.name?.readonly?.(node, fieldsArgs?.name)}
										disabled={fields?.name?.disabled?.(node, fieldsArgs?.name)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.name
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.name)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, name: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.name}
										{...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="description" {node} {errors} {fields} {row}>
							{#if !fields?.description?.hiddenCol?.(args, tab, fieldsArgs?.description)}
								<Td {zIndex} {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['td']}>
									<StringInput
										name="description"
										bind:value={node.description}
										readonly={fields?.description?.readonly?.(node, fieldsArgs?.description)}
										disabled={fields?.description?.disabled?.(node, fieldsArgs?.description)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.description
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.description)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, description: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.description}
										{...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="field" {node} {errors} {fields} {row}>
							{#if !fields?.field?.hiddenCol?.(args, tab, fieldsArgs?.field)}
								<Td {zIndex} {...fields?.field?.props?.($LL, node, fieldsArgs?.field)?.['td']}>
									<StringInput
										name="field"
										bind:value={node.field}
										readonly={fields?.field?.readonly?.(node, fieldsArgs?.field)}
										disabled={fields?.field?.disabled?.(node, fieldsArgs?.field)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.field
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.field)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, field: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.field}
										{...fields?.field?.props?.($LL, node, fieldsArgs?.field)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="type" {node} {errors} {fields} {row}>
							{#if !fields?.type?.hiddenCol?.(args, tab, fieldsArgs?.type)}
								<Td {zIndex} {...fields?.type?.props?.($LL, node, fieldsArgs?.type)?.['td']}>
									<StringInput
										name="type"
										bind:value={node.type}
										readonly={fields?.type?.readonly?.(node, fieldsArgs?.type)}
										disabled={fields?.type?.disabled?.(node, fieldsArgs?.type)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.type
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.type)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, type: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.type}
										{...fields?.type?.props?.($LL, node, fieldsArgs?.type)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="permissionType" {node} {errors} {fields} {row}>
							{#if !fields?.permissionType?.hiddenCol?.(args, tab, fieldsArgs?.permissionType)}
								<Td {zIndex} {...fields?.permissionType?.props?.($LL, node, fieldsArgs?.permissionType)?.['td']}>
									<PermissionTypeInput
										name="permissionType"
										bind:value={node.permissionType}
										readonly={fields?.permissionType?.readonly?.(node, fieldsArgs?.permissionType)}
										disabled={fields?.permissionType?.disabled?.(node, fieldsArgs?.permissionType)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.permissionType
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.permissionType)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, permissionType: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.permissionType}
										{...fields?.permissionType?.props?.($LL, node, fieldsArgs?.permissionType)?.['select']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="roles" {node} {errors} {fields} {row}>
							{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
								<Td {zIndex} {...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['td']}>
									<RoleSelect
										name="roles"
										bind:value={node.roles}
										list
										errors={errors?.[row]?.iterms?.roles}
										readonly={fields?.roles?.readonly?.(node, fieldsArgs?.roles)}
										disabled={fields?.roles?.disabled?.(node, fieldsArgs?.roles)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.roles
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.roles)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, roles: e }
																}
															})
													);
											}
										}}
										{...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['combobox']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="realm" {node} {errors} {fields} {row}>
							{#if !fields?.realm?.hiddenCol?.(args, tab, fieldsArgs?.realm)}
								<Td errors={errors?.[row]?.iterms?.realm} {zIndex} {...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.realm}
											textFieldName="name"
											path={`${node.id}/realm`}
											on:goto
											{...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['link']}
										/>
									{:else}
										<RealmTableDialog
											fieldsPatch={fields?.realm?.fields?.(node, fieldsArgs?.realm)}
											bind:value={node.realm}
											textFieldName="name"
											singleChoice
											class="btn-link"
											readonly={fields?.realm?.readonly?.(node, fieldsArgs?.realm)}
											disabled={fields?.realm?.disabled?.(node, fieldsArgs?.realm)}
											on:select={(e) => {
												if (!Array.isArray(e.detail.value) || e.detail.value == null) {
													fields?.realm
														?.onChange?.($LL, e.detail.value, node, fieldsArgs?.realm)
														.then((next) => (node = next))
														.catch(
															(e) =>
																(errors = {
																	...errors,
																	[row]: {
																		...errors?.[row],
																		iterms: { ...errors?.[row]?.iterms, realm: e }
																	}
																})
														);
												}
											}}
											{...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['dialog']}
										/>
									{/if}
								</Td>
							{/if}
						</slot>
						<th class="hover:z-[{zIndex + 3}]">
							<div class="flex space-x-1">
								{#if showEditButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('edit', { value: node, row })}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
								{/if}
								{#if showEditDialog}
									<PermissionFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</PermissionFormDialog>
								{/if}
								{#if showUnbindButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.unbindBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('unbind', { value: node, row })}
										>
											<Icon src={ArchiveBoxXMark} solid />
										</button>
									</div>
								{/if}
								{#if showRemoveButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.removeBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('remove', { value: node, row })}
										>
											<Icon src={Trash} solid />
										</button>
									</div>
								{/if}
							</div>
						</th>
					</tr>
				{/if}
			{/each}
		{:else}
			<tr>
				<td colspan="999">
					<Empty class="badge-lg" />
				</td>
			</tr>
		{/if}
	</tbody>
</Table>
<Table {zIndex} class="sm:hidden {className}">
	{#if isFetching}
		<Loading />
	{:else if value && value.length > 0}
		{#each value as node, row}
			{#if node}
				<thead class="border">
					<tr>
						<th class="w-0">
							<label>
								<input
									type="checkbox"
									class="checkbox"
									bind:group={selectedRowList}
									value={row}
									on:change={(e) => {
										selectedIdList = [
											...selectedRowList
												.filter(
													(row) => value?.[row]?.id !== undefined && value?.[row]?.id !== null
												)
												.map((row) => value?.[row]?.id)
										];
									}}
								/>
							</label>
						</th>
						<th class="flex justify-end hover:z-[{zIndex + 3}]">
							<div class="flex space-x-1">
								{#if showEditButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('edit', { value: node, row })}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
								{/if}
								{#if showEditDialog}
									<PermissionFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</PermissionFormDialog>
								{/if}
								{#if showUnbindButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.unbindBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('unbind', { value: node, row })}
										>
											<Icon src={ArchiveBoxXMark} solid />
										</button>
									</div>
								{/if}
								{#if showRemoveButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.removeBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('remove', { value: node, row })}
										>
											<Icon src={Trash} solid />
										</button>
									</div>
								{/if}
							</div>
						</th>
					</tr>
				</thead>
				<tbody class="border">
					<slot name="name-sm" {node} {errors} {fields} {row}>
						{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
							<Tr class="hover" let:id {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.name.name()}
										required={fields?.name?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['td']}>
									<StringInput
										{id}
										name="name"
										bind:value={node.name}
										readonly={fields?.name?.readonly?.(node, fieldsArgs?.name)}
										disabled={fields?.name?.disabled?.(node, fieldsArgs?.name)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.name
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.name)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, name: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.name}
										{...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="description-sm" {node} {errors} {fields} {row}>
						{#if !fields?.description?.hiddenCol?.(args, tab, fieldsArgs?.description)}
							<Tr class="hover" let:id {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.description.name()}
										required={fields?.description?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['td']}>
									<StringInput
										{id}
										name="description"
										bind:value={node.description}
										readonly={fields?.description?.readonly?.(node, fieldsArgs?.description)}
										disabled={fields?.description?.disabled?.(node, fieldsArgs?.description)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.description
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.description)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, description: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.description}
										{...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="field-sm" {node} {errors} {fields} {row}>
						{#if !fields?.field?.hiddenCol?.(args, tab, fieldsArgs?.field)}
							<Tr class="hover" let:id {...fields?.field?.props?.($LL, node, fieldsArgs?.field)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.field.name()}
										required={fields?.field?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.field?.props?.($LL, node, fieldsArgs?.field)?.['td']}>
									<StringInput
										{id}
										name="field"
										bind:value={node.field}
										readonly={fields?.field?.readonly?.(node, fieldsArgs?.field)}
										disabled={fields?.field?.disabled?.(node, fieldsArgs?.field)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.field
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.field)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, field: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.field}
										{...fields?.field?.props?.($LL, node, fieldsArgs?.field)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="type-sm" {node} {errors} {fields} {row}>
						{#if !fields?.type?.hiddenCol?.(args, tab, fieldsArgs?.type)}
							<Tr class="hover" let:id {...fields?.type?.props?.($LL, node, fieldsArgs?.type)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.type.name()}
										required={fields?.type?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.type?.props?.($LL, node, fieldsArgs?.type)?.['td']}>
									<StringInput
										{id}
										name="type"
										bind:value={node.type}
										readonly={fields?.type?.readonly?.(node, fieldsArgs?.type)}
										disabled={fields?.type?.disabled?.(node, fieldsArgs?.type)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.type
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.type)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, type: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.type}
										{...fields?.type?.props?.($LL, node, fieldsArgs?.type)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="permissionType-sm" {node} {errors} {fields} {row}>
						{#if !fields?.permissionType?.hiddenCol?.(args, tab, fieldsArgs?.permissionType)}
							<Tr class="hover" let:id {...fields?.permissionType?.props?.($LL, node, fieldsArgs?.permissionType)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.permissionType.name()}
										required={fields?.permissionType?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.permissionType?.props?.($LL, node, fieldsArgs?.permissionType)?.['td']}>
									<PermissionTypeInput
										{id}
										name="permissionType"
										bind:value={node.permissionType}
										readonly={fields?.permissionType?.readonly?.(node, fieldsArgs?.permissionType)}
										disabled={fields?.permissionType?.disabled?.(node, fieldsArgs?.permissionType)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.permissionType
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.permissionType)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, permissionType: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.permissionType}
										{...fields?.permissionType?.props?.($LL, node, fieldsArgs?.permissionType)?.['select']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="roles-sm" {node} {errors} {fields} {row}>
						{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
							<Tr class="hover" let:id {...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.roles.name()}
										required={fields?.roles?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['td']}>
									<RoleSelect
										{id}
										name="roles"
										bind:value={node.roles}
										list
										errors={errors?.[row]?.iterms?.roles}
										readonly={fields?.roles?.readonly?.(node, fieldsArgs?.roles)}
										disabled={fields?.roles?.disabled?.(node, fieldsArgs?.roles)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.roles
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.roles)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, roles: e }
																}
															})
													);
											}
										}}
										{...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['combobox']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="realm-sm" {node} {errors} {fields} {row}>
						{#if !fields?.realm?.hiddenCol?.(args, tab, fieldsArgs?.realm)}
							<Tr class="hover" let:id {...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.realm.name()}
										required={fields?.realm?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td errors={errors?.[row]?.iterms?.realm} {zIndex} {...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.realm}
											textFieldName="name"
											path={`${node.id}/realm`}
											on:goto
											{...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['link']}
										/>
									{:else}
										<RealmTableDialog
											fieldsPatch={fields?.realm?.fields?.(node, fieldsArgs?.realm)}
											bind:value={node.realm}
											textFieldName="name"
											singleChoice
											class="btn-link"
											readonly={fields?.realm?.readonly?.(node, fieldsArgs?.realm)}
											disabled={fields?.realm?.disabled?.(node, fieldsArgs?.realm)}
											on:select={(e) => {
												if (!Array.isArray(e.detail.value) || e.detail.value == null) {
													fields?.realm
														?.onChange?.($LL, e.detail.value, node, fieldsArgs?.realm)
														.then((next) => (node = next))
														.catch(
															(e) =>
																(errors = {
																	...errors,
																	[row]: {
																		...errors?.[row],
																		iterms: { ...errors?.[row]?.iterms, realm: e }
																	}
																})
														);
												}
											}}
											{...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['dialog']}
										/>
									{/if}
								</Td>
							</Tr>
						{/if}
					</slot>
				</tbody>
			{/if}
		{/each}
	{:else}
		<Empty />
	{/if}
</Table>
<slot name="table-bottom" />