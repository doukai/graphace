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
	import { StringTh, StringInput, IntTh, IntInput, ObjectLink } from '@graphace/ui-graphql';
	import GroupFilter from '~/lib/components/objects/group/GroupFilter.svelte';
	import GroupFormDialog from '~/lib/components/objects/group/GroupFormDialog.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		groupTabs,
		groupTab,
		groupTabChange,
		groupFields,
		type GroupFields,
		type GroupFieldsArgs,
		validateAll
	} from '~/lib/components/objects/group/GroupOption';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		GroupOrderBy,
		QueryGroupListArgs,
		GroupInput
	} from '~/lib/types/schema';

	export let value: (GroupInput | null | undefined)[] | null | undefined = undefined;
	export let args: QueryGroupListArgs = {};
	export let orderBy: GroupOrderBy = {};
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
	export let tabs: (($LL: TranslationFunctions, args?: QueryGroupListArgs | undefined) => TabInfo[] | undefined) | undefined = groupTabs;
	export let tab: ((args?: QueryGroupListArgs | undefined) => string | undefined) | undefined = groupTab;
	export let fields: GroupFields | undefined = groupFields;
	export let fieldsPatch: GroupFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: GroupFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryGroupListArgs; orderBy: GroupOrderBy };
		remove: {
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		unbind: {
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		edit: {
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		save: { value: GroupInput | (GroupInput | null | undefined)[] | null | undefined };
		select: {
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined ;
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
				{$LL.graphql.objects.Group.name()}
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
				<GroupFilter
					bind:value={args}
					let:trigger
					on:filter={(e) => dispatch('query', { args, orderBy })}
				>
					<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
						<button class="btn btn-square" use:melt={trigger}>
							<Icon src={Funnel} class="h-5 w-5" />
						</button>
					</div>
				</GroupFilter>
			</div>
		</svelte:fragment>
		{#if showCreateDialog}
			<GroupFormDialog
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
			</GroupFormDialog>
		{/if}
		<slot />
	</Buttons>
</div>
<div class="divider my-0" />
{#if tabs?.($LL, args)}
	<Tabs
		value={tab?.(args)}
		tabs={tabs?.($LL, args)}
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				groupTabChange(e.detail.value, args, value)
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
				{#if !fields?.name?.hiddenCol?.(args, tab?.(args), fieldsArgs?.name)}
					<StringTh
						name={$LL.graphql.objects.Group.fields.name.name()}
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
				{#if !fields?.description?.hiddenCol?.(args, tab?.(args), fieldsArgs?.description)}
					<StringTh
						name={$LL.graphql.objects.Group.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{zIndex}
						{...fields?.description?.props?.($LL, undefined, fieldsArgs?.description)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="path-th" {args} {orderBy} {fields}>
				{#if !fields?.path?.hiddenCol?.(args, tab?.(args), fieldsArgs?.path)}
					<StringTh
						name={$LL.graphql.objects.Group.fields.path.name()}
						bind:value={args.path}
						bind:sort={orderBy.path}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.path?.required?.()}
						{zIndex}
						{...fields?.path?.props?.($LL, undefined, fieldsArgs?.path)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="deep-th" {args} {orderBy} {fields}>
				{#if !fields?.deep?.hiddenCol?.(args, tab?.(args), fieldsArgs?.deep)}
					<IntTh
						name={$LL.graphql.objects.Group.fields.deep.name()}
						bind:value={args.deep}
						bind:sort={orderBy.deep}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.deep?.required?.()}
						{zIndex}
						{...fields?.deep?.props?.($LL, undefined, fieldsArgs?.deep)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="parentId-th" {args} {orderBy} {fields}>
				{#if !fields?.parentId?.hiddenCol?.(args, tab?.(args), fieldsArgs?.parentId)}
					<StringTh
						name={$LL.graphql.objects.Group.fields.parentId.name()}
						bind:value={args.parentId}
						bind:sort={orderBy.parentId}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.parentId?.required?.()}
						{zIndex}
						{...fields?.parentId?.props?.($LL, undefined, fieldsArgs?.parentId)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="parent-th" {args} {orderBy} {fields}>
				{#if !fields?.parent?.hiddenCol?.(args, tab?.(args), fieldsArgs?.parent)}
					<GroupTh
						name={$LL.graphql.objects.Group.fields.parent.name()}
						bind:value={args.parent}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.parent?.required?.()}
						{zIndex}
						{...fields?.parent?.props?.($LL, undefined, fieldsArgs?.parent)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="subGroups-th" {args} {orderBy} {fields}>
				{#if !fields?.subGroups?.hiddenCol?.(args, tab?.(args), fieldsArgs?.subGroups)}
					<GroupTh
						name={$LL.graphql.objects.Group.fields.subGroups.name()}
						bind:value={args.subGroups}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.subGroups?.required?.()}
						{zIndex}
						{...fields?.subGroups?.props?.($LL, undefined, fieldsArgs?.subGroups)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="users-th" {args} {orderBy} {fields}>
				{#if !fields?.users?.hiddenCol?.(args, tab?.(args), fieldsArgs?.users)}
					<UserTh
						name={$LL.graphql.objects.Group.fields.users.name()}
						bind:value={args.users}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.users?.required?.()}
						{zIndex}
						{...fields?.users?.props?.($LL, undefined, fieldsArgs?.users)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="roles-th" {args} {orderBy} {fields}>
				{#if !fields?.roles?.hiddenCol?.(args, tab?.(args), fieldsArgs?.roles)}
					<RoleTh
						name={$LL.graphql.objects.Group.fields.roles.name()}
						bind:value={args.roles}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.roles?.required?.()}
						{zIndex}
						{...fields?.roles?.props?.($LL, undefined, fieldsArgs?.roles)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="realm-th" {args} {orderBy} {fields}>
				{#if !fields?.realm?.hiddenCol?.(args, tab?.(args), fieldsArgs?.realm)}
					<RealmTh
						name={$LL.graphql.objects.Group.fields.realm.name()}
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
							{#if !fields?.name?.hiddenCol?.(args, tab?.(args), fieldsArgs?.name)}
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
							{#if !fields?.description?.hiddenCol?.(args, tab?.(args), fieldsArgs?.description)}
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
						<slot name="path" {node} {errors} {fields} {row}>
							{#if !fields?.path?.hiddenCol?.(args, tab?.(args), fieldsArgs?.path)}
								<Td {zIndex} {...fields?.path?.props?.($LL, node, fieldsArgs?.path)?.['td']}>
									<StringInput
										name="path"
										bind:value={node.path}
										readonly={fields?.path?.readonly?.(node, fieldsArgs?.path)}
										disabled={fields?.path?.disabled?.(node, fieldsArgs?.path)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.path
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.path)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, path: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.path}
										{...fields?.path?.props?.($LL, node, fieldsArgs?.path)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="deep" {node} {errors} {fields} {row}>
							{#if !fields?.deep?.hiddenCol?.(args, tab?.(args), fieldsArgs?.deep)}
								<Td {zIndex} {...fields?.deep?.props?.($LL, node, fieldsArgs?.deep)?.['td']}>
									<IntInput
										name="deep"
										bind:value={node.deep}
										readonly={fields?.deep?.readonly?.(node, fieldsArgs?.deep)}
										disabled={fields?.deep?.disabled?.(node, fieldsArgs?.deep)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.deep
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.deep)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, deep: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.deep}
										{...fields?.deep?.props?.($LL, node, fieldsArgs?.deep)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="parentId" {node} {errors} {fields} {row}>
							{#if !fields?.parentId?.hiddenCol?.(args, tab?.(args), fieldsArgs?.parentId)}
								<Td {zIndex} {...fields?.parentId?.props?.($LL, node, fieldsArgs?.parentId)?.['td']}>
									<StringInput
										name="parentId"
										bind:value={node.parentId}
										readonly={fields?.parentId?.readonly?.(node, fieldsArgs?.parentId)}
										disabled={fields?.parentId?.disabled?.(node, fieldsArgs?.parentId)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.parentId
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.parentId)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, parentId: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.parentId}
										{...fields?.parentId?.props?.($LL, node, fieldsArgs?.parentId)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="parent" {node} {errors} {fields} {row}>
							{#if !fields?.parent?.hiddenCol?.(args, tab?.(args), fieldsArgs?.parent)}
								<Td {zIndex} {...fields?.parent?.props?.($LL, node, fieldsArgs?.parent)?.['td']}>
									<GroupSelect
										name="parent"
										bind:value={node.parent}
										errors={errors?.[row]?.iterms?.parent}
										readonly={fields?.parent?.readonly?.(node, fieldsArgs?.parent)}
										disabled={fields?.parent?.disabled?.(node, fieldsArgs?.parent)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.parent
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.parent)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, parent: e }
																}
															})
													);
											}
										}}
										{...fields?.parent?.props?.($LL, node, fieldsArgs?.parent)?.['combobox']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="subGroups" {node} {errors} {fields} {row}>
							{#if !fields?.subGroups?.hiddenCol?.(args, tab?.(args), fieldsArgs?.subGroups)}
								<Td {zIndex} {...fields?.subGroups?.props?.($LL, node, fieldsArgs?.subGroups)?.['td']}>
									<GroupSelect
										name="subGroups"
										bind:value={node.subGroups}
										list
										errors={errors?.[row]?.iterms?.subGroups}
										readonly={fields?.subGroups?.readonly?.(node, fieldsArgs?.subGroups)}
										disabled={fields?.subGroups?.disabled?.(node, fieldsArgs?.subGroups)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.subGroups
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.subGroups)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, subGroups: e }
																}
															})
													);
											}
										}}
										{...fields?.subGroups?.props?.($LL, node, fieldsArgs?.subGroups)?.['combobox']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="users" {node} {errors} {fields} {row}>
							{#if !fields?.users?.hiddenCol?.(args, tab?.(args), fieldsArgs?.users)}
								<Td {zIndex} {...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['td']}>
									<UserSelect
										name="users"
										bind:value={node.users}
										list
										errors={errors?.[row]?.iterms?.users}
										readonly={fields?.users?.readonly?.(node, fieldsArgs?.users)}
										disabled={fields?.users?.disabled?.(node, fieldsArgs?.users)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.users
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.users)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, users: e }
																}
															})
													);
											}
										}}
										{...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['combobox']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="roles" {node} {errors} {fields} {row}>
							{#if !fields?.roles?.hiddenCol?.(args, tab?.(args), fieldsArgs?.roles)}
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
							{#if !fields?.realm?.hiddenCol?.(args, tab?.(args), fieldsArgs?.realm)}
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
									<GroupFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</GroupFormDialog>
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
									<GroupFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</GroupFormDialog>
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
						{#if !fields?.name?.hiddenCol?.(args, tab?.(args), fieldsArgs?.name)}
							<Tr class="hover" let:id {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.name.name()}
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
						{#if !fields?.description?.hiddenCol?.(args, tab?.(args), fieldsArgs?.description)}
							<Tr class="hover" let:id {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.description.name()}
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
					<slot name="path-sm" {node} {errors} {fields} {row}>
						{#if !fields?.path?.hiddenCol?.(args, tab?.(args), fieldsArgs?.path)}
							<Tr class="hover" let:id {...fields?.path?.props?.($LL, node, fieldsArgs?.path)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.path.name()}
										required={fields?.path?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.path?.props?.($LL, node, fieldsArgs?.path)?.['td']}>
									<StringInput
										{id}
										name="path"
										bind:value={node.path}
										readonly={fields?.path?.readonly?.(node, fieldsArgs?.path)}
										disabled={fields?.path?.disabled?.(node, fieldsArgs?.path)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.path
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.path)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, path: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.path}
										{...fields?.path?.props?.($LL, node, fieldsArgs?.path)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="deep-sm" {node} {errors} {fields} {row}>
						{#if !fields?.deep?.hiddenCol?.(args, tab?.(args), fieldsArgs?.deep)}
							<Tr class="hover" let:id {...fields?.deep?.props?.($LL, node, fieldsArgs?.deep)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.deep.name()}
										required={fields?.deep?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.deep?.props?.($LL, node, fieldsArgs?.deep)?.['td']}>
									<IntInput
										{id}
										name="deep"
										bind:value={node.deep}
										readonly={fields?.deep?.readonly?.(node, fieldsArgs?.deep)}
										disabled={fields?.deep?.disabled?.(node, fieldsArgs?.deep)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.deep
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.deep)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, deep: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.deep}
										{...fields?.deep?.props?.($LL, node, fieldsArgs?.deep)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="parentId-sm" {node} {errors} {fields} {row}>
						{#if !fields?.parentId?.hiddenCol?.(args, tab?.(args), fieldsArgs?.parentId)}
							<Tr class="hover" let:id {...fields?.parentId?.props?.($LL, node, fieldsArgs?.parentId)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.parentId.name()}
										required={fields?.parentId?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.parentId?.props?.($LL, node, fieldsArgs?.parentId)?.['td']}>
									<StringInput
										{id}
										name="parentId"
										bind:value={node.parentId}
										readonly={fields?.parentId?.readonly?.(node, fieldsArgs?.parentId)}
										disabled={fields?.parentId?.disabled?.(node, fieldsArgs?.parentId)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.parentId
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.parentId)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, parentId: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.parentId}
										{...fields?.parentId?.props?.($LL, node, fieldsArgs?.parentId)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="parent-sm" {node} {errors} {fields} {row}>
						{#if !fields?.parent?.hiddenCol?.(args, tab?.(args), fieldsArgs?.parent)}
							<Tr class="hover" let:id {...fields?.parent?.props?.($LL, node, fieldsArgs?.parent)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.parent.name()}
										required={fields?.parent?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.parent?.props?.($LL, node, fieldsArgs?.parent)?.['td']}>
									<GroupSelect
										{id}
										name="parent"
										bind:value={node.parent}
										errors={errors?.[row]?.iterms?.parent}
										readonly={fields?.parent?.readonly?.(node, fieldsArgs?.parent)}
										disabled={fields?.parent?.disabled?.(node, fieldsArgs?.parent)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.parent
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.parent)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, parent: e }
																}
															})
													);
											}
										}}
										{...fields?.parent?.props?.($LL, node, fieldsArgs?.parent)?.['combobox']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="subGroups-sm" {node} {errors} {fields} {row}>
						{#if !fields?.subGroups?.hiddenCol?.(args, tab?.(args), fieldsArgs?.subGroups)}
							<Tr class="hover" let:id {...fields?.subGroups?.props?.($LL, node, fieldsArgs?.subGroups)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.subGroups.name()}
										required={fields?.subGroups?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.subGroups?.props?.($LL, node, fieldsArgs?.subGroups)?.['td']}>
									<GroupSelect
										{id}
										name="subGroups"
										bind:value={node.subGroups}
										list
										errors={errors?.[row]?.iterms?.subGroups}
										readonly={fields?.subGroups?.readonly?.(node, fieldsArgs?.subGroups)}
										disabled={fields?.subGroups?.disabled?.(node, fieldsArgs?.subGroups)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.subGroups
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.subGroups)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, subGroups: e }
																}
															})
													);
											}
										}}
										{...fields?.subGroups?.props?.($LL, node, fieldsArgs?.subGroups)?.['combobox']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="users-sm" {node} {errors} {fields} {row}>
						{#if !fields?.users?.hiddenCol?.(args, tab?.(args), fieldsArgs?.users)}
							<Tr class="hover" let:id {...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.users.name()}
										required={fields?.users?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['td']}>
									<UserSelect
										{id}
										name="users"
										bind:value={node.users}
										list
										errors={errors?.[row]?.iterms?.users}
										readonly={fields?.users?.readonly?.(node, fieldsArgs?.users)}
										disabled={fields?.users?.disabled?.(node, fieldsArgs?.users)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.users
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.users)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, users: e }
																}
															})
													);
											}
										}}
										{...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['combobox']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="roles-sm" {node} {errors} {fields} {row}>
						{#if !fields?.roles?.hiddenCol?.(args, tab?.(args), fieldsArgs?.roles)}
							<Tr class="hover" let:id {...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.roles.name()}
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
						{#if !fields?.realm?.hiddenCol?.(args, tab?.(args), fieldsArgs?.realm)}
							<Tr class="hover" let:id {...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.realm.name()}
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