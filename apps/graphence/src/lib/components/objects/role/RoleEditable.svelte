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
	import RoleFilter from '~/lib/components/objects/role/RoleFilter.svelte';
	import RoleFormDialog from '~/lib/components/objects/role/RoleFormDialog.svelte';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import PermissionTh from '~/lib/components/objects/permission/PermissionTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import UserTableDialog from '~/lib/components/objects/user/UserTableDialog.svelte';
	import PermissionTableDialog from '~/lib/components/objects/permission/PermissionTableDialog.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		roleTabs,
		roleTab,
		roleTabChange,
		roleFields,
		type RoleFields
	} from '~/lib/components/objects/role/RoleOption';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		RoleOrderBy,
		QueryRoleListArgs,
		RoleInput
	} from '~/lib/types/schema';

	export let value: (RoleInput | null | undefined)[] | null | undefined = undefined;
	export let args: QueryRoleListArgs = {};
	export let orderBy: RoleOrderBy = {};
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
	let className: string | undefined = 'table-pin-rows table-pin-cols';
	export { className as class };
	export let tabs: TabInfo[] | undefined = roleTabs;
	export let tab: string | undefined = roleTab;
	export let fields: RoleFields | undefined = roleFields;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryRoleListArgs; orderBy: RoleOrderBy };
		remove: {
			value: RoleInput | (RoleInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		unbind: {
			value: RoleInput | (RoleInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		edit: {
			value: RoleInput | (RoleInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		save: { value: RoleInput | (RoleInput | null | undefined)[] | null | undefined };
		select: {
			value: RoleInput | (RoleInput | null | undefined)[] | null | undefined ;
			row?: number[] | number | undefined;
		};
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
				resolve: (data: (RoleInput | null | undefined)[] | null | undefined) => void,
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

	const validateRow = async (value: RoleInput) => {
		const errors: Record<string, Errors> = {};
		const nameErrors = await fields?.name.validate?.(value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await fields?.description.validate?.(value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
		const usersErrors = await fields?.users.validate?.(value);
		if (usersErrors && usersErrors.length > 0) {
			errors['users'] = { errors: usersErrors.map((message) => ({ message })) };
		}
		const groupsErrors = await fields?.groups.validate?.(value);
		if (groupsErrors && groupsErrors.length > 0) {
			errors['groups'] = { errors: groupsErrors.map((message) => ({ message })) };
		}
		const compositesErrors = await fields?.composites.validate?.(value);
		if (compositesErrors && compositesErrors.length > 0) {
			errors['composites'] = { errors: compositesErrors.map((message) => ({ message })) };
		}
		const permissionsErrors = await fields?.permissions.validate?.(value);
		if (permissionsErrors && permissionsErrors.length > 0) {
			errors['permissions'] = { errors: permissionsErrors.map((message) => ({ message })) };
		}
		const realmErrors = await fields?.realm.validate?.(value);
		if (realmErrors && realmErrors.length > 0) {
			errors['realm'] = { errors: realmErrors.map((message) => ({ message })) };
		}
		return errors;
	};
</script>

<div class="flex justify-between">
	<slot name="start" />
	<span class="text-xl font-semibold self-center max-sm:hidden">
		{#if title}
			{title}
		{:else}
			{$LL.graphql.objects.Role.name()}
		{/if}
	</span>
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
			{#if showSearchInput}
				<SearchInput class="max-sm:w-full" on:search />
			{/if}
			<div class="sm:hidden">
				<RoleFilter
					bind:value={args}
					let:trigger
					on:filter={(e) => dispatch('query', { args, orderBy })}
				>
					<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
						<button class="btn btn-square" use:melt={trigger}>
							<Icon src={Funnel} class="h-5 w-5" />
						</button>
					</div>
				</RoleFilter>
			</div>
		</svelte:fragment>
		{#if showCreateDialog}
			<RoleFormDialog
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
			</RoleFormDialog>
		{/if}
		<slot />
	</Buttons>
</div>
<div class="divider my-0" />
{#if tabs}
	<Tabs
		value={tab}
		{tabs}
		on:change={(e) => {
			if (e.detail.value !== e.detail.origin) {
				roleTabChange(e.detail.value, args).then((args) => {
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
			<slot name="name-th">
				{#if !fields?.name?.hiddenCol?.(args, tab)}
					<StringTh
						name={$LL.graphql.objects.Role.fields.name.name()}
						bind:value={args.name}
						bind:sort={orderBy.name}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.name?.required?.()}
						{...fields?.name?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="description-th">
				{#if !fields?.description?.hiddenCol?.(args, tab)}
					<StringTh
						name={$LL.graphql.objects.Role.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{...fields?.description?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="users-th">
				{#if !fields?.users?.hiddenCol?.(args, tab)}
					<UserTh
						name={$LL.graphql.objects.Role.fields.users.name()}
						bind:value={args.users}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.users?.required?.()}
						{...fields?.users?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="groups-th">
				{#if !fields?.groups?.hiddenCol?.(args, tab)}
					<GroupTh
						name={$LL.graphql.objects.Role.fields.groups.name()}
						bind:value={args.groups}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.groups?.required?.()}
						{...fields?.groups?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="composites-th">
				{#if !fields?.composites?.hiddenCol?.(args, tab)}
					<RoleTh
						name={$LL.graphql.objects.Role.fields.composites.name()}
						bind:value={args.composites}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.composites?.required?.()}
						{...fields?.composites?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="permissions-th">
				{#if !fields?.permissions?.hiddenCol?.(args, tab)}
					<PermissionTh
						name={$LL.graphql.objects.Role.fields.permissions.name()}
						bind:value={args.permissions}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.permissions?.required?.()}
						{...fields?.permissions?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="realm-th">
				{#if !fields?.realm?.hiddenCol?.(args, tab)}
					<RealmTh
						name={$LL.graphql.objects.Role.fields.realm.name()}
						bind:value={args.realm}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.realm?.required?.()}
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
						<slot name="name">
							{#if !fields?.name?.hiddenCol?.(args, tab)}
								<Td {zIndex} {...fields?.name?.props?.(node)?.['td']}>
									<StringInput
										name="name"
										bind:value={node.name}
										readonly={fields?.name?.readonly?.(node)}
										disabled={fields?.name?.disabled?.(node)}
										on:change={(e) => fields?.name.onChange?.(e.detail.value, node).then((next) => node = next)}
										errors={errors?.[row]?.iterms?.name}
										{...fields?.name?.props?.(node)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="description">
							{#if !fields?.description?.hiddenCol?.(args, tab)}
								<Td {zIndex} {...fields?.description?.props?.(node)?.['td']}>
									<StringInput
										name="description"
										bind:value={node.description}
										readonly={fields?.description?.readonly?.(node)}
										disabled={fields?.description?.disabled?.(node)}
										on:change={(e) => fields?.description.onChange?.(e.detail.value, node).then((next) => node = next)}
										errors={errors?.[row]?.iterms?.description}
										{...fields?.description?.props?.(node)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="users">
							{#if !fields?.users?.hiddenCol?.(args, tab)}
								<Td errors={errors?.[row]?.iterms?.users} {zIndex} {...fields?.users?.props?.(node)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.users}
											textFieldName="name"
											path={`${node.id}/users`}
											on:goto
											{...fields?.users?.props?.(node)?.['link']}
										/>
									{:else}
										<UserTableDialog
											bind:value={node.users}
											textFieldName="name"
											class="btn-link"
											readonly={fields?.users?.readonly?.(node)}
											disabled={fields?.users?.disabled?.(node)}
											on:select={(e) => fields?.users.onChange?.(e.detail.value, node).then((next) => node = next)}
											{...fields?.users?.props?.(node)?.['dialog']}
										/>
									{/if}
								</Td>
							{/if}
						</slot>
						<slot name="groups">
							{#if !fields?.groups?.hiddenCol?.(args, tab)}
								<Td {zIndex} {...fields?.groups?.props?.(node)?.['td']}>
									<GroupSelect
										name="groups"
										bind:value={node.groups}
										list
										errors={errors?.[row]?.iterms?.groups}
										readonly={fields?.groups?.readonly?.(node)}
										disabled={fields?.groups?.disabled?.(node)}
										on:change={(e) => fields?.groups.onChange?.(e.detail.value, node).then((next) => node = next)}
										{...fields?.groups?.props?.(node)?.['select']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="composites">
							{#if !fields?.composites?.hiddenCol?.(args, tab)}
								<Td {zIndex} {...fields?.composites?.props?.(node)?.['td']}>
									<RoleSelect
										name="composites"
										bind:value={node.composites}
										list
										errors={errors?.[row]?.iterms?.composites}
										readonly={fields?.composites?.readonly?.(node)}
										disabled={fields?.composites?.disabled?.(node)}
										on:change={(e) => fields?.composites.onChange?.(e.detail.value, node).then((next) => node = next)}
										{...fields?.composites?.props?.(node)?.['select']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="permissions">
							{#if !fields?.permissions?.hiddenCol?.(args, tab)}
								<Td errors={errors?.[row]?.iterms?.permissions} {zIndex} {...fields?.permissions?.props?.(node)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.permissions}
											path={`${node.id}/permissions`}
											on:goto
											{...fields?.permissions?.props?.(node)?.['link']}
										/>
									{:else}
										<PermissionTableDialog
											bind:value={node.permissions}
											class="btn-link"
											readonly={fields?.permissions?.readonly?.(node)}
											disabled={fields?.permissions?.disabled?.(node)}
											on:select={(e) => fields?.permissions.onChange?.(e.detail.value, node).then((next) => node = next)}
											{...fields?.permissions?.props?.(node)?.['dialog']}
										/>
									{/if}
								</Td>
							{/if}
						</slot>
						<slot name="realm">
							{#if !fields?.realm?.hiddenCol?.(args, tab)}
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
											on:select={(e) => fields?.realm.onChange?.(e.detail.value, node).then((next) => node = next)}
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
									<RoleFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</RoleFormDialog>
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
									<RoleFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</RoleFormDialog>
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
					<slot name="name-sm">
						{#if !fields?.name?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.name?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Role.fields.name.name()}
										required={fields?.name?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.name?.props?.(node)?.['td']}>
									<StringInput
										{id}
										name="name"
										bind:value={node.name}
										readonly={fields?.name?.readonly?.(node)}
										disabled={fields?.name?.disabled?.(node)}
										on:change={(e) => fields?.name.onChange?.(e.detail.value, node).then((next) => node = next)}
										errors={errors?.[row]?.iterms?.name}
										{...fields?.name?.props?.(node)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="description-sm">
						{#if !fields?.description?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.description?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Role.fields.description.name()}
										required={fields?.description?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.description?.props?.(node)?.['td']}>
									<StringInput
										{id}
										name="description"
										bind:value={node.description}
										readonly={fields?.description?.readonly?.(node)}
										disabled={fields?.description?.disabled?.(node)}
										on:change={(e) => fields?.description.onChange?.(e.detail.value, node).then((next) => node = next)}
										errors={errors?.[row]?.iterms?.description}
										{...fields?.description?.props?.(node)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="users-sm">
						{#if !fields?.users?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.users?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Role.fields.users.name()}
										required={fields?.users?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td errors={errors?.[row]?.iterms?.users} {zIndex} {...fields?.users?.props?.(node)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.users}
											textFieldName="name"
											path={`${node.id}/users`}
											on:goto
											{...fields?.users?.props?.(node)?.['link']}
										/>
									{:else}
										<UserTableDialog
											bind:value={node.users}
											textFieldName="name"
											class="btn-link"
											readonly={fields?.users?.readonly?.(node)}
											disabled={fields?.users?.disabled?.(node)}
											on:select={(e) => fields?.users.onChange?.(e.detail.value, node).then((next) => node = next)}
											{...fields?.users?.props?.(node)?.['dialog']}
										/>
									{/if}
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="groups-sm">
						{#if !fields?.groups?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.groups?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Role.fields.groups.name()}
										required={fields?.groups?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.groups?.props?.(node)?.['td']}>
									<GroupSelect
										{id}
										name="groups"
										bind:value={node.groups}
										list
										errors={errors?.[row]?.iterms?.groups}
										readonly={fields?.groups?.readonly?.(node)}
										disabled={fields?.groups?.disabled?.(node)}
										on:change={(e) => fields?.groups.onChange?.(e.detail.value, node).then((next) => node = next)}
										{...fields?.groups?.props?.(node)?.['select']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="composites-sm">
						{#if !fields?.composites?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.composites?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Role.fields.composites.name()}
										required={fields?.composites?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.composites?.props?.(node)?.['td']}>
									<RoleSelect
										{id}
										name="composites"
										bind:value={node.composites}
										list
										errors={errors?.[row]?.iterms?.composites}
										readonly={fields?.composites?.readonly?.(node)}
										disabled={fields?.composites?.disabled?.(node)}
										on:change={(e) => fields?.composites.onChange?.(e.detail.value, node).then((next) => node = next)}
										{...fields?.composites?.props?.(node)?.['select']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="permissions-sm">
						{#if !fields?.permissions?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.permissions?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Role.fields.permissions.name()}
										required={fields?.permissions?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td errors={errors?.[row]?.iterms?.permissions} {zIndex} {...fields?.permissions?.props?.(node)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.permissions}
											path={`${node.id}/permissions`}
											on:goto
											{...fields?.permissions?.props?.(node)?.['link']}
										/>
									{:else}
										<PermissionTableDialog
											bind:value={node.permissions}
											class="btn-link"
											readonly={fields?.permissions?.readonly?.(node)}
											disabled={fields?.permissions?.disabled?.(node)}
											on:select={(e) => fields?.permissions.onChange?.(e.detail.value, node).then((next) => node = next)}
											{...fields?.permissions?.props?.(node)?.['dialog']}
										/>
									{/if}
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="realm-sm">
						{#if !fields?.realm?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.realm?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Role.fields.realm.name()}
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
											on:select={(e) => fields?.realm.onChange?.(e.detail.value, node).then((next) => node = next)}
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