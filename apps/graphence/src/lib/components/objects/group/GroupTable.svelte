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
		type GroupFields
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
	export let title: string | undefined = undefined;
	export let zIndex: number = 0;
	let className: string | undefined = '[&_[data-part=table]]:table-pin-rows [&_[data-part=table]]:table-pin-cols';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryGroupListArgs | undefined) => TabInfo[] | undefined) | undefined = groupTabs;
	export let tab: ((args?: QueryGroupListArgs | undefined) => string | undefined) | undefined = groupTab;
	export let fields: GroupFields | undefined = groupFields;

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
		tabChange: { tab: any; origin: any; };
		create: {};
		back: {};
	}>();

	let selectAll: boolean;

	const validate = async () => {
		errors = {};
		if (value) {
			for (let row = 0; row < value.length; row++) {
				const node = value[row];
				if (node) {
					const rowErrors = await validateRow(node);
					if (Object.keys(rowErrors).length > 0) {
						errors[row] = { iterms: rowErrors };
					}
				}
			}
		}

		return new Promise(
			(
				resolve: (data: (GroupInput | null | undefined)[] | null | undefined) => void,
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

	const validateRow = async (value: GroupInput) => {
		const errors: Record<string, Errors> = {};
		const nameErrors = await fields?.name?.validate?.(value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await fields?.description?.validate?.(value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
		const pathErrors = await fields?.path?.validate?.(value);
		if (pathErrors && pathErrors.length > 0) {
			errors['path'] = { errors: pathErrors.map((message) => ({ message })) };
		}
		const deepErrors = await fields?.deep?.validate?.(value);
		if (deepErrors && deepErrors.length > 0) {
			errors['deep'] = { errors: deepErrors.map((message) => ({ message })) };
		}
		const parentIdErrors = await fields?.parentId?.validate?.(value);
		if (parentIdErrors && parentIdErrors.length > 0) {
			errors['parentId'] = { errors: parentIdErrors.map((message) => ({ message })) };
		}
		const parentErrors = await fields?.parent?.validate?.(value);
		if (parentErrors && parentErrors.length > 0) {
			errors['parent'] = { errors: parentErrors.map((message) => ({ message })) };
		}
		const subGroupsErrors = await fields?.subGroups?.validate?.(value);
		if (subGroupsErrors && subGroupsErrors.length > 0) {
			errors['subGroups'] = { errors: subGroupsErrors.map((message) => ({ message })) };
		}
		const usersErrors = await fields?.users?.validate?.(value);
		if (usersErrors && usersErrors.length > 0) {
			errors['users'] = { errors: usersErrors.map((message) => ({ message })) };
		}
		const rolesErrors = await fields?.roles?.validate?.(value);
		if (rolesErrors && rolesErrors.length > 0) {
			errors['roles'] = { errors: rolesErrors.map((message) => ({ message })) };
		}
		const realmErrors = await fields?.realm?.validate?.(value);
		if (realmErrors && realmErrors.length > 0) {
			errors['realm'] = { errors: realmErrors.map((message) => ({ message })) };
		}
		return errors;
	};
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
		on:save={(e) => validate().then(() => dispatch('save', { value }))}
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
				groupTabChange(e.detail.value, args).then((args) => {
					dispatch('query', {
						args,
						orderBy
					});
				});
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
				{#if !fields?.name?.hiddenCol?.(args, tab?.(args))}
					<StringTh
						name={$LL.graphql.objects.Group.fields.name.name()}
						bind:value={args.name}
						bind:sort={orderBy.name}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.name?.required?.()}
						{zIndex}
						{...fields?.name?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="description-th" {args} {orderBy} {fields}>
				{#if !fields?.description?.hiddenCol?.(args, tab?.(args))}
					<StringTh
						name={$LL.graphql.objects.Group.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{zIndex}
						{...fields?.description?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="path-th" {args} {orderBy} {fields}>
				{#if !fields?.path?.hiddenCol?.(args, tab?.(args))}
					<StringTh
						name={$LL.graphql.objects.Group.fields.path.name()}
						bind:value={args.path}
						bind:sort={orderBy.path}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.path?.required?.()}
						{zIndex}
						{...fields?.path?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="deep-th" {args} {orderBy} {fields}>
				{#if !fields?.deep?.hiddenCol?.(args, tab?.(args))}
					<IntTh
						name={$LL.graphql.objects.Group.fields.deep.name()}
						bind:value={args.deep}
						bind:sort={orderBy.deep}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.deep?.required?.()}
						{zIndex}
						{...fields?.deep?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="parentId-th" {args} {orderBy} {fields}>
				{#if !fields?.parentId?.hiddenCol?.(args, tab?.(args))}
					<StringTh
						name={$LL.graphql.objects.Group.fields.parentId.name()}
						bind:value={args.parentId}
						bind:sort={orderBy.parentId}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.parentId?.required?.()}
						{zIndex}
						{...fields?.parentId?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="parent-th" {args} {orderBy} {fields}>
				{#if !fields?.parent?.hiddenCol?.(args, tab?.(args))}
					<GroupTh
						name={$LL.graphql.objects.Group.fields.parent.name()}
						bind:value={args.parent}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.parent?.required?.()}
						{zIndex}
						{...fields?.parent?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="subGroups-th" {args} {orderBy} {fields}>
				{#if !fields?.subGroups?.hiddenCol?.(args, tab?.(args))}
					<GroupTh
						name={$LL.graphql.objects.Group.fields.subGroups.name()}
						bind:value={args.subGroups}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.subGroups?.required?.()}
						{zIndex}
						{...fields?.subGroups?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="users-th" {args} {orderBy} {fields}>
				{#if !fields?.users?.hiddenCol?.(args, tab?.(args))}
					<UserTh
						name={$LL.graphql.objects.Group.fields.users.name()}
						bind:value={args.users}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.users?.required?.()}
						{zIndex}
						{...fields?.users?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="roles-th" {args} {orderBy} {fields}>
				{#if !fields?.roles?.hiddenCol?.(args, tab?.(args))}
					<RoleTh
						name={$LL.graphql.objects.Group.fields.roles.name()}
						bind:value={args.roles}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.roles?.required?.()}
						{zIndex}
						{...fields?.roles?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="realm-th" {args} {orderBy} {fields}>
				{#if !fields?.realm?.hiddenCol?.(args, tab?.(args))}
					<RealmTh
						name={$LL.graphql.objects.Group.fields.realm.name()}
						bind:value={args.realm}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.realm?.required?.()}
						{zIndex}
						{...fields?.realm?.props?.()?.['th']}
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
							{#if !fields?.name?.hiddenCol?.(args, tab?.(args))}
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { name: node?.name, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.name?.readonly?.(node)}
									disabled={fields?.name?.disabled?.(node)}
									on:change={(e) => fields?.name?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.name}
									{zIndex}
									{...fields?.name?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="description" {node} {errors} {fields} {row}>
							{#if !fields?.description?.hiddenCol?.(args, tab?.(args))}
								<StringTd
									name="description"
									bind:value={node.description}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { description: node?.description, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.description?.readonly?.(node)}
									disabled={fields?.description?.disabled?.(node)}
									on:change={(e) => fields?.description?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.description}
									{zIndex}
									{...fields?.description?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="path" {node} {errors} {fields} {row}>
							{#if !fields?.path?.hiddenCol?.(args, tab?.(args))}
								<StringTd
									name="path"
									bind:value={node.path}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { path: node?.path, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.path?.readonly?.(node)}
									disabled={fields?.path?.disabled?.(node)}
									on:change={(e) => fields?.path?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.path}
									{zIndex}
									{...fields?.path?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="deep" {node} {errors} {fields} {row}>
							{#if !fields?.deep?.hiddenCol?.(args, tab?.(args))}
								<IntTd
									name="deep"
									bind:value={node.deep}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { deep: node?.deep, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.deep?.readonly?.(node)}
									disabled={fields?.deep?.disabled?.(node)}
									on:change={(e) => fields?.deep?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.deep}
									{zIndex}
									{...fields?.deep?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="parentId" {node} {errors} {fields} {row}>
							{#if !fields?.parentId?.hiddenCol?.(args, tab?.(args))}
								<StringTd
									name="parentId"
									bind:value={node.parentId}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { parentId: node?.parentId, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.parentId?.readonly?.(node)}
									disabled={fields?.parentId?.disabled?.(node)}
									on:change={(e) => fields?.parentId?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.parentId}
									{zIndex}
									{...fields?.parentId?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="parent" {node} {errors} {fields} {row}>
							{#if !fields?.parent?.hiddenCol?.(args, tab?.(args))}
								<GroupSelectTd
									name="parent"
									bind:value={node.parent}
									errors={errors?.[row]?.iterms?.parent}
									readonly={fields?.parent?.readonly?.(node)}
									disabled={fields?.parent?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { parent: node?.parent, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.parent?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.parent?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="subGroups" {node} {errors} {fields} {row}>
							{#if !fields?.subGroups?.hiddenCol?.(args, tab?.(args))}
								<GroupSelectTd
									name="subGroups"
									bind:value={node.subGroups}
									list
									errors={errors?.[row]?.iterms?.subGroups}
									readonly={fields?.subGroups?.readonly?.(node)}
									disabled={fields?.subGroups?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { subGroups: node?.subGroups, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.subGroups?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.subGroups?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="users" {node} {errors} {fields} {row}>
							{#if !fields?.users?.hiddenCol?.(args, tab?.(args))}
								<UserSelectTd
									name="users"
									bind:value={node.users}
									list
									errors={errors?.[row]?.iterms?.users}
									readonly={fields?.users?.readonly?.(node)}
									disabled={fields?.users?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { users: node?.users, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.users?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.users?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="roles" {node} {errors} {fields} {row}>
							{#if !fields?.roles?.hiddenCol?.(args, tab?.(args))}
								<RoleSelectTd
									name="roles"
									bind:value={node.roles}
									list
									errors={errors?.[row]?.iterms?.roles}
									readonly={fields?.roles?.readonly?.(node)}
									disabled={fields?.roles?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { roles: node?.roles, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.roles?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.roles?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="realm" {node} {errors} {fields} {row}>
							{#if !fields?.realm?.hiddenCol?.(args, tab?.(args))}
								<Td errors={errors?.[row]?.iterms?.realm} {zIndex} {...fields?.realm?.props?.(node)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.realm}
											textFieldName="name"
											path={`${node.id}/realm`}
											on:goto
											{...fields?.realm?.props?.(node)?.['link']}
										/>
									{:else}
										<RealmTableDialog
											bind:value={node.realm}
											textFieldName="name"
											singleChoice
											class="btn-link"
											readonly={fields?.realm?.readonly?.(node)}
											disabled={fields?.realm?.disabled?.(node)}
											on:select={(e) => fields?.realm?.onChange?.(e.detail.value, node).then((next) => node = next)}
											{...fields?.realm?.props?.(node)?.['dialog']}
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
									bind:group={selectedIdList}
									value={node.id}
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
						{#if !fields?.name?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.name?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.name.name()}
										required={fields?.name?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="name"
									bind:value={node.name}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { name: node?.name, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.name?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.name?.readonly?.(node)}
									disabled={fields?.name?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.name}
									{zIndex}
									{...fields?.name?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="description-sm" {node} {errors} {fields} {row}>
						{#if !fields?.description?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.description?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.description.name()}
										required={fields?.description?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="description"
									bind:value={node.description}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { description: node?.description, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.description?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.description?.readonly?.(node)}
									disabled={fields?.description?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.description}
									{zIndex}
									{...fields?.description?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="path-sm" {node} {errors} {fields} {row}>
						{#if !fields?.path?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.path?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.path.name()}
										required={fields?.path?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="path"
									bind:value={node.path}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { path: node?.path, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.path?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.path?.readonly?.(node)}
									disabled={fields?.path?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.path}
									{zIndex}
									{...fields?.path?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="deep-sm" {node} {errors} {fields} {row}>
						{#if !fields?.deep?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.deep?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.deep.name()}
										required={fields?.deep?.required?.(node)}
										class="truncate"
									/>
								</td>
								<IntTd
									{id}
									name="deep"
									bind:value={node.deep}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { deep: node?.deep, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.deep?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.deep?.readonly?.(node)}
									disabled={fields?.deep?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.deep}
									{zIndex}
									{...fields?.deep?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="parentId-sm" {node} {errors} {fields} {row}>
						{#if !fields?.parentId?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.parentId?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.parentId.name()}
										required={fields?.parentId?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="parentId"
									bind:value={node.parentId}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { parentId: node?.parentId, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.parentId?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.parentId?.readonly?.(node)}
									disabled={fields?.parentId?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.parentId}
									{zIndex}
									{...fields?.parentId?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="parent-sm" {node} {errors} {fields} {row}>
						{#if !fields?.parent?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.parent?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.parent.name()}
										required={fields?.parent?.required?.(node)}
										class="truncate"
									/>
								</td>
								<GroupSelectTd
									{id}
									name="parent"
									bind:value={node.parent}
									errors={errors?.[row]?.iterms?.parent}
									readonly={fields?.parent?.readonly?.(node)}
									disabled={fields?.parent?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { parent: node?.parent, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.parent?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.parent?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="subGroups-sm" {node} {errors} {fields} {row}>
						{#if !fields?.subGroups?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.subGroups?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.subGroups.name()}
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
									readonly={fields?.subGroups?.readonly?.(node)}
									disabled={fields?.subGroups?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { subGroups: node?.subGroups, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.subGroups?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.subGroups?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="users-sm" {node} {errors} {fields} {row}>
						{#if !fields?.users?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.users?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.users.name()}
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
									readonly={fields?.users?.readonly?.(node)}
									disabled={fields?.users?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { users: node?.users, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.users?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.users?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="roles-sm" {node} {errors} {fields} {row}>
						{#if !fields?.roles?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.roles?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.roles.name()}
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
									readonly={fields?.roles?.readonly?.(node)}
									disabled={fields?.roles?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { roles: node?.roles, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.roles?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.roles?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="realm-sm" {node} {errors} {fields} {row}>
						{#if !fields?.realm?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.realm?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Group.fields.realm.name()}
										required={fields?.realm?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td errors={errors?.[row]?.iterms?.realm} {zIndex} {...fields?.realm?.props?.(node)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.realm}
											textFieldName="name"
											path={`${node.id}/realm`}
											on:goto
											{...fields?.realm?.props?.(node)?.['link']}
										/>
									{:else}
										<RealmTableDialog
											bind:value={node.realm}
											textFieldName="name"
											singleChoice
											class="btn-link"
											readonly={fields?.realm?.readonly?.(node)}
											disabled={fields?.realm?.disabled?.(node)}
											on:select={(e) => fields?.realm?.onChange?.(e.detail.value, node).then((next) => node = next)}
											{...fields?.realm?.props?.(node)?.['dialog']}
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