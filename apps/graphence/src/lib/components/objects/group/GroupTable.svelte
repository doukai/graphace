<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark, Plus } from '@steeze-ui/heroicons';
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
	import { StringTh, StringTd, IntTh, IntTd, ObjectLink } from '@graphace/ui-graphql';
	import GroupFilter from '~/lib/components/objects/group/GroupFilter.svelte';
	import GroupFormDialog from '~/lib/components/objects/group/GroupFormDialog.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelectTd from '~/lib/components/objects/group/GroupSelectTd.svelte';
	import UserSelectTd from '~/lib/components/objects/user/UserSelectTd.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		groupTabs,
		groupTab,
		groupTabChange,
		groupFields,
		type GroupFieldsArgs,
		type GroupFields,
		validate,
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
	export let showFilter: boolean = false;
	export let title: string | undefined = undefined;
	export let zIndex: number = 0;
	let className: string | undefined = '[&_[data-part=table]]:table-pin-rows [&_[data-part=table]]:table-pin-cols [&_[data-element=td]]:max-w-64';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryGroupListArgs | undefined) => TabInfo[] | undefined) | undefined = groupTabs;
	export let tab: string | undefined = groupTab?.(args);
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
		class="flex space-x-1 justify-end max-sm:w-full"
		loading={isMutating}
		on:save={(e) =>
			validateAll($LL, value)
				.then((value) => dispatch('save', { value }))
				.catch((e) => (errors = e))}
		on:remove={(e) =>
			dispatch('remove', {
				value: value?.filter((node) => selectedIdList.includes(node?.id))
			})}
		on:unbind={(e) =>
			dispatch('unbind', {
				value: value?.filter((node) => selectedIdList.includes(node?.id))
			})}
		on:select={(e) =>
			dispatch('select', {
				value: value?.filter((node) => selectedIdList.includes(node?.id))
			})}
		on:create
		on:back
	>
		<svelte:fragment slot="start">
			<slot name="search">
				{#if showSearchInput}
					<SearchInput class="max-sm:w-full max-sm:[&_[data-part=input]]:w-full" on:search />
				{/if}
			</slot>
			{#if showFilter}
				<div class="sm:hidden">
					<GroupFilter
						bind:value={args}
						bind:orderBy
						on:filter={(e) => dispatch('query', { args, orderBy })}
					/>
				</div>
			{/if}
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
		bind:value={tab}
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
								} else {
									selectedIdList = [
										...selectedIdList.filter(
											(selectedId) => !value?.some((node) => node?.id === selectedId)
										)
									];
								}
							}
						}}
					/>
				</label>
			</th>
			<slot name="name-th" {args} {orderBy} {fields}>
				{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
					<StringTh
						name={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.Group.fields.name.name()}
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
						name={fields?.description?.title?.($LL, fieldsArgs?.description) || $LL.graphql.objects.Group.fields.description.name()}
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
				{#if !fields?.path?.hiddenCol?.(args, tab, fieldsArgs?.path)}
					<StringTh
						name={fields?.path?.title?.($LL, fieldsArgs?.path) || $LL.graphql.objects.Group.fields.path.name()}
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
				{#if !fields?.deep?.hiddenCol?.(args, tab, fieldsArgs?.deep)}
					<IntTh
						name={fields?.deep?.title?.($LL, fieldsArgs?.deep) || $LL.graphql.objects.Group.fields.deep.name()}
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
				{#if !fields?.parentId?.hiddenCol?.(args, tab, fieldsArgs?.parentId)}
					<StringTh
						name={fields?.parentId?.title?.($LL, fieldsArgs?.parentId) || $LL.graphql.objects.Group.fields.parentId.name()}
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
				{#if !fields?.parent?.hiddenCol?.(args, tab, fieldsArgs?.parent)}
					<GroupTh
						name={fields?.parent?.title?.($LL, fieldsArgs?.parent) || $LL.graphql.objects.Group.fields.parent.name()}
						bind:value={args.parent}
						bind:orderBy={orderBy.parent}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.parent?.required?.()}
						{zIndex}
						{...fields?.parent?.props?.($LL, undefined, fieldsArgs?.parent)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="subGroups-th" {args} {orderBy} {fields}>
				{#if !fields?.subGroups?.hiddenCol?.(args, tab, fieldsArgs?.subGroups)}
					<GroupTh
						name={fields?.subGroups?.title?.($LL, fieldsArgs?.subGroups) || $LL.graphql.objects.Group.fields.subGroups.name()}
						bind:value={args.subGroups}
						bind:orderBy={orderBy.subGroups}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.subGroups?.required?.()}
						{zIndex}
						{...fields?.subGroups?.props?.($LL, undefined, fieldsArgs?.subGroups)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="users-th" {args} {orderBy} {fields}>
				{#if !fields?.users?.hiddenCol?.(args, tab, fieldsArgs?.users)}
					<UserTh
						name={fields?.users?.title?.($LL, fieldsArgs?.users) || $LL.graphql.objects.Group.fields.users.name()}
						bind:value={args.users}
						bind:orderBy={orderBy.users}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.users?.required?.()}
						{zIndex}
						{...fields?.users?.props?.($LL, undefined, fieldsArgs?.users)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="roles-th" {args} {orderBy} {fields}>
				{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
					<RoleTh
						name={fields?.roles?.title?.($LL, fieldsArgs?.roles) || $LL.graphql.objects.Group.fields.roles.name()}
						bind:value={args.roles}
						bind:orderBy={orderBy.roles}
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
						name={fields?.realm?.title?.($LL, fieldsArgs?.realm) || $LL.graphql.objects.Group.fields.realm.name()}
						bind:value={args.realm}
						bind:orderBy={orderBy.realm}
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
									bind:group={selectedIdList}
									value={node.id}
								/>
							</label>
						</th>
						<slot name="name" {node} {errors} {fields} {row}>
							{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { name: node?.name, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['input']}
								/>
							{/if}
						</slot>
						<slot name="description" {node} {errors} {fields} {row}>
							{#if !fields?.description?.hiddenCol?.(args, tab, fieldsArgs?.description)}
								<StringTd
									name="description"
									bind:value={node.description}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { description: node?.description, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['input']}
								/>
							{/if}
						</slot>
						<slot name="path" {node} {errors} {fields} {row}>
							{#if !fields?.path?.hiddenCol?.(args, tab, fieldsArgs?.path)}
								<StringTd
									name="path"
									bind:value={node.path}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { path: node?.path, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.path?.props?.($LL, node, fieldsArgs?.path)?.['input']}
								/>
							{/if}
						</slot>
						<slot name="deep" {node} {errors} {fields} {row}>
							{#if !fields?.deep?.hiddenCol?.(args, tab, fieldsArgs?.deep)}
								<IntTd
									name="deep"
									bind:value={node.deep}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { deep: node?.deep, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.deep?.props?.($LL, node, fieldsArgs?.deep)?.['input']}
								/>
							{/if}
						</slot>
						<slot name="parentId" {node} {errors} {fields} {row}>
							{#if !fields?.parentId?.hiddenCol?.(args, tab, fieldsArgs?.parentId)}
								<StringTd
									name="parentId"
									bind:value={node.parentId}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { parentId: node?.parentId, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.parentId?.props?.($LL, node, fieldsArgs?.parentId)?.['input']}
								/>
							{/if}
						</slot>
						<slot name="parent" {node} {errors} {fields} {row}>
							{#if !fields?.parent?.hiddenCol?.(args, tab, fieldsArgs?.parent)}
								<GroupSelectTd
									name="parent"
									bind:value={node.parent}
									errors={errors?.[row]?.iterms?.parent}
									readonly={fields?.parent?.readonly?.(node, fieldsArgs?.parent)}
									disabled={fields?.parent?.disabled?.(node, fieldsArgs?.parent)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { parent: node?.parent, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.parent?.props?.($LL, node, fieldsArgs?.parent)?.['combobox']}
								/>
							{/if}
						</slot>
						<slot name="subGroups" {node} {errors} {fields} {row}>
							{#if !fields?.subGroups?.hiddenCol?.(args, tab, fieldsArgs?.subGroups)}
								<GroupSelectTd
									name="subGroups"
									bind:value={node.subGroups}
									list
									errors={errors?.[row]?.iterms?.subGroups}
									readonly={fields?.subGroups?.readonly?.(node, fieldsArgs?.subGroups)}
									disabled={fields?.subGroups?.disabled?.(node, fieldsArgs?.subGroups)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { subGroups: node?.subGroups, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.subGroups?.props?.($LL, node, fieldsArgs?.subGroups)?.['combobox']}
								/>
							{/if}
						</slot>
						<slot name="users" {node} {errors} {fields} {row}>
							{#if !fields?.users?.hiddenCol?.(args, tab, fieldsArgs?.users)}
								<UserSelectTd
									name="users"
									bind:value={node.users}
									list
									errors={errors?.[row]?.iterms?.users}
									readonly={fields?.users?.readonly?.(node, fieldsArgs?.users)}
									disabled={fields?.users?.disabled?.(node, fieldsArgs?.users)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { users: node?.users, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['combobox']}
								/>
							{/if}
						</slot>
						<slot name="roles" {node} {errors} {fields} {row}>
							{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
								<RoleSelectTd
									name="roles"
									bind:value={node.roles}
									list
									errors={errors?.[row]?.iterms?.roles}
									readonly={fields?.roles?.readonly?.(node, fieldsArgs?.roles)}
									disabled={fields?.roles?.disabled?.(node, fieldsArgs?.roles)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { roles: node?.roles, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['combobox']}
								/>
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
				<thead>
					<tr>
						<th class="w-0">
							<label>
								<input
									type="checkbox"
									class="checkbox"
									bind:group={selectedIdList}
									value={node.id}
								/>
							</label>
						</th>
						<th class="hover:z-[{zIndex + 3}]">
							<div class="flex justify-end space-x-1">
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
				<tbody>
					<slot name="name-sm" {node} {errors} {fields} {row}>
						{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
							<Tr class="hover" let:id {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.name?.title?.($LL, fieldsArgs?.name) || 
											$LL.graphql.objects.Group.fields.name.name()}
										required={fields?.name?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="name"
									bind:value={node.name}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { name: node?.name, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									readonly={fields?.name?.readonly?.(node, fieldsArgs?.name)}
									disabled={fields?.name?.disabled?.(node, fieldsArgs?.name)}
									errors={errors?.[row]?.iterms?.name}
									{zIndex}
									{...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['input']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="description-sm" {node} {errors} {fields} {row}>
						{#if !fields?.description?.hiddenCol?.(args, tab, fieldsArgs?.description)}
							<Tr class="hover" let:id {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.description?.title?.($LL, fieldsArgs?.description) || 
											$LL.graphql.objects.Group.fields.description.name()}
										required={fields?.description?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="description"
									bind:value={node.description}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { description: node?.description, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									readonly={fields?.description?.readonly?.(node, fieldsArgs?.description)}
									disabled={fields?.description?.disabled?.(node, fieldsArgs?.description)}
									errors={errors?.[row]?.iterms?.description}
									{zIndex}
									{...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['input']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="path-sm" {node} {errors} {fields} {row}>
						{#if !fields?.path?.hiddenCol?.(args, tab, fieldsArgs?.path)}
							<Tr class="hover" let:id {...fields?.path?.props?.($LL, node, fieldsArgs?.path)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.path?.title?.($LL, fieldsArgs?.path) || 
											$LL.graphql.objects.Group.fields.path.name()}
										required={fields?.path?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="path"
									bind:value={node.path}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { path: node?.path, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									readonly={fields?.path?.readonly?.(node, fieldsArgs?.path)}
									disabled={fields?.path?.disabled?.(node, fieldsArgs?.path)}
									errors={errors?.[row]?.iterms?.path}
									{zIndex}
									{...fields?.path?.props?.($LL, node, fieldsArgs?.path)?.['input']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="deep-sm" {node} {errors} {fields} {row}>
						{#if !fields?.deep?.hiddenCol?.(args, tab, fieldsArgs?.deep)}
							<Tr class="hover" let:id {...fields?.deep?.props?.($LL, node, fieldsArgs?.deep)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.deep?.title?.($LL, fieldsArgs?.deep) || 
											$LL.graphql.objects.Group.fields.deep.name()}
										required={fields?.deep?.required?.(node)}
										class="truncate"
									/>
								</td>
								<IntTd
									{id}
									name="deep"
									bind:value={node.deep}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { deep: node?.deep, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									readonly={fields?.deep?.readonly?.(node, fieldsArgs?.deep)}
									disabled={fields?.deep?.disabled?.(node, fieldsArgs?.deep)}
									errors={errors?.[row]?.iterms?.deep}
									{zIndex}
									{...fields?.deep?.props?.($LL, node, fieldsArgs?.deep)?.['input']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="parentId-sm" {node} {errors} {fields} {row}>
						{#if !fields?.parentId?.hiddenCol?.(args, tab, fieldsArgs?.parentId)}
							<Tr class="hover" let:id {...fields?.parentId?.props?.($LL, node, fieldsArgs?.parentId)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.parentId?.title?.($LL, fieldsArgs?.parentId) || 
											$LL.graphql.objects.Group.fields.parentId.name()}
										required={fields?.parentId?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="parentId"
									bind:value={node.parentId}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { parentId: node?.parentId, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									readonly={fields?.parentId?.readonly?.(node, fieldsArgs?.parentId)}
									disabled={fields?.parentId?.disabled?.(node, fieldsArgs?.parentId)}
									errors={errors?.[row]?.iterms?.parentId}
									{zIndex}
									{...fields?.parentId?.props?.($LL, node, fieldsArgs?.parentId)?.['input']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="parent-sm" {node} {errors} {fields} {row}>
						{#if !fields?.parent?.hiddenCol?.(args, tab, fieldsArgs?.parent)}
							<Tr class="hover" let:id {...fields?.parent?.props?.($LL, node, fieldsArgs?.parent)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.parent?.title?.($LL, fieldsArgs?.parent) || 
											$LL.graphql.objects.Group.fields.parent.name()}
										required={fields?.parent?.required?.(node)}
										class="truncate"
									/>
								</td>
								<GroupSelectTd
									{id}
									name="parent"
									bind:value={node.parent}
									errors={errors?.[row]?.iterms?.parent}
									readonly={fields?.parent?.readonly?.(node, fieldsArgs?.parent)}
									disabled={fields?.parent?.disabled?.(node, fieldsArgs?.parent)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { parent: node?.parent, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.parent?.props?.($LL, node, fieldsArgs?.parent)?.['combobox']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="subGroups-sm" {node} {errors} {fields} {row}>
						{#if !fields?.subGroups?.hiddenCol?.(args, tab, fieldsArgs?.subGroups)}
							<Tr class="hover" let:id {...fields?.subGroups?.props?.($LL, node, fieldsArgs?.subGroups)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.subGroups?.title?.($LL, fieldsArgs?.subGroups) || 
											$LL.graphql.objects.Group.fields.subGroups.name()}
										required={fields?.subGroups?.required?.(node)}
										class="truncate"
									/>
								</td>
								<GroupSelectTd
									{id}
									name="subGroups"
									bind:value={node.subGroups}
									list
									errors={errors?.[row]?.iterms?.subGroups}
									readonly={fields?.subGroups?.readonly?.(node, fieldsArgs?.subGroups)}
									disabled={fields?.subGroups?.disabled?.(node, fieldsArgs?.subGroups)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { subGroups: node?.subGroups, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.subGroups?.props?.($LL, node, fieldsArgs?.subGroups)?.['combobox']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="users-sm" {node} {errors} {fields} {row}>
						{#if !fields?.users?.hiddenCol?.(args, tab, fieldsArgs?.users)}
							<Tr class="hover" let:id {...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.users?.title?.($LL, fieldsArgs?.users) || 
											$LL.graphql.objects.Group.fields.users.name()}
										required={fields?.users?.required?.(node)}
										class="truncate"
									/>
								</td>
								<UserSelectTd
									{id}
									name="users"
									bind:value={node.users}
									list
									errors={errors?.[row]?.iterms?.users}
									readonly={fields?.users?.readonly?.(node, fieldsArgs?.users)}
									disabled={fields?.users?.disabled?.(node, fieldsArgs?.users)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { users: node?.users, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['combobox']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="roles-sm" {node} {errors} {fields} {row}>
						{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
							<Tr class="hover" let:id {...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.roles?.title?.($LL, fieldsArgs?.roles) || 
											$LL.graphql.objects.Group.fields.roles.name()}
										required={fields?.roles?.required?.(node)}
										class="truncate"
									/>
								</td>
								<RoleSelectTd
									{id}
									name="roles"
									bind:value={node.roles}
									list
									errors={errors?.[row]?.iterms?.roles}
									readonly={fields?.roles?.readonly?.(node, fieldsArgs?.roles)}
									disabled={fields?.roles?.disabled?.(node, fieldsArgs?.roles)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { roles: node?.roles, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
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
									{zIndex}
									{...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['combobox']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="realm-sm" {node} {errors} {fields} {row}>
						{#if !fields?.realm?.hiddenCol?.(args, tab, fieldsArgs?.realm)}
							<Tr class="hover" let:id {...fields?.realm?.props?.($LL, node, fieldsArgs?.realm)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.realm?.title?.($LL, fieldsArgs?.realm) || 
											$LL.graphql.objects.Group.fields.realm.name()}
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