<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark, Funnel, Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Loading, SearchInput, Table, Td } from '@graphace/ui';
	import { type Option, StringTh, StringTd, IntTh, IntTd, ObjectLink } from '@graphace/ui-graphql';
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
	let className: string | undefined = 'table-pin-rows table-pin-cols';
	export { className as class };
	export let fields: {
		name?: Option | undefined;
		description?: Option | undefined;
		path?: Option | undefined;
		deep?: Option | undefined;
		parentId?: Option | undefined;
		parent?: Option | undefined;
		subGroups?: Option | undefined;
		users?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		path: { readonly: false, disabled: false, hidden: false },
		deep: { readonly: false, disabled: false, hidden: false },
		parentId: { readonly: false, disabled: false, hidden: false },
		parent: { readonly: false, disabled: false, hidden: false },
		subGroups: { readonly: false, disabled: false, hidden: false },
		users: { readonly: false, disabled: false, hidden: false },
		roles: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryGroupListArgs; orderBy: GroupOrderBy };
		remove: { 
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		unbind: { 
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		edit: { 
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		save: { value: GroupInput | (GroupInput | null | undefined)[] | null | undefined };
		select: { value: GroupInput | (GroupInput | null | undefined)[] | null | undefined };
		create: {};
		back: {};
	}>();

	let selectAll: boolean;

	if (Array.isArray(value)) {
		value.forEach((item) => {
			if (item?.id && !item.where) {
				item.where = { id: { val: item.id } };
			}
		});
	}
</script>

<div class="flex sm:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{#if title}
			{title}
		{:else}
			{$LL.graphql.objects.Group.name()}
		{/if}
	</span>
	<Buttons
		class="flex space-x-1 max-sm:w-full"
		showRemoveButton={showRemoveButton && selectedIdList.length > 0}
		showUnbindButton={showUnbindButton && selectedIdList.length > 0}
		{showSaveButton}
		{showCreateButton}
		showSelectButton={showSelectButton}
		{showBackButton}
		loading={isMutating}
		on:save={(e) => dispatch('save', { value })}
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
			{#if showSearchInput}
				<SearchInput on:search />
			{/if}
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
					value = [...(value || []), e.detail.original];
				}}
			>
				<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
			</GroupFormDialog>
		{/if}
		<slot />
	</Buttons>
</div>
<div class="divider" />
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
			{#if !fields.name?.hidden}
				<StringTh
					name={$LL.graphql.objects.Group.fields.name.name()}
					bind:value={args.name}
					bind:sort={orderBy.name}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.description?.hidden}
				<StringTh
					name={$LL.graphql.objects.Group.fields.description.name()}
					bind:value={args.description}
					bind:sort={orderBy.description}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.path?.hidden}
				<StringTh
					name={$LL.graphql.objects.Group.fields.path.name()}
					bind:value={args.path}
					bind:sort={orderBy.path}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.deep?.hidden}
				<IntTh
					name={$LL.graphql.objects.Group.fields.deep.name()}
					bind:value={args.deep}
					bind:sort={orderBy.deep}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.parentId?.hidden}
				<StringTh
					name={$LL.graphql.objects.Group.fields.parentId.name()}
					bind:value={args.parentId}
					bind:sort={orderBy.parentId}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.parent?.hidden}
				<GroupTh
					name={$LL.graphql.objects.Group.fields.parent.name()}
					bind:value={args.parent}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.subGroups?.hidden}
				<GroupTh
					name={$LL.graphql.objects.Group.fields.subGroups.name()}
					bind:value={args.subGroups}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.users?.hidden}
				<UserTh
					name={$LL.graphql.objects.Group.fields.users.name()}
					bind:value={args.users}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.roles?.hidden}
				<RoleTh
					name={$LL.graphql.objects.Group.fields.roles.name()}
					bind:value={args.roles}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.realm?.hidden}
				<RealmTh
					name={$LL.graphql.objects.Group.fields.realm.name()}
					bind:value={args.realm}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
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
						<slot name="name">
							{#if !fields.name?.hidden}
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={(e) =>
										dispatch('save', {
											value: { name: node?.name, where: { id: { val: node?.id } } }
										})}
									readonly={fields.name?.readonly}
									disabled={fields.name?.disabled}
									errors={errors?.[row]?.iterms?.name}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="description">
							{#if !fields.description?.hidden}
								<StringTd
									name="description"
									bind:value={node.description}
									on:save={(e) =>
										dispatch('save', {
											value: { description: node?.description, where: { id: { val: node?.id } } }
										})}
									readonly={fields.description?.readonly}
									disabled={fields.description?.disabled}
									errors={errors?.[row]?.iterms?.description}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="path">
							{#if !fields.path?.hidden}
								<StringTd
									name="path"
									bind:value={node.path}
									on:save={(e) =>
										dispatch('save', {
											value: { path: node?.path, where: { id: { val: node?.id } } }
										})}
									readonly={fields.path?.readonly}
									disabled={fields.path?.disabled}
									errors={errors?.[row]?.iterms?.path}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="deep">
							{#if !fields.deep?.hidden}
								<IntTd
									name="deep"
									bind:value={node.deep}
									on:save={(e) =>
										dispatch('save', {
											value: { deep: node?.deep, where: { id: { val: node?.id } } }
										})}
									readonly={fields.deep?.readonly}
									disabled={fields.deep?.disabled}
									errors={errors?.[row]?.iterms?.deep}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="parentId">
							{#if !fields.parentId?.hidden}
								<StringTd
									name="parentId"
									bind:value={node.parentId}
									on:save={(e) =>
										dispatch('save', {
											value: { parentId: node?.parentId, where: { id: { val: node?.id } } }
										})}
									readonly={fields.parentId?.readonly}
									disabled={fields.parentId?.disabled}
									errors={errors?.[row]?.iterms?.parentId}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="parent">
							{#if !fields.parent?.hidden}
								<GroupSelectTd
									name="parent"
									bind:value={node.parent}
									errors={errors?.[row]?.iterms?.parent}
									readonly={fields.parent?.readonly}
									disabled={fields.parent?.disabled}
									on:save={(e) =>
										dispatch('save', {
											value: { parent: node?.parent, where: { id: { val: node?.id } } }
										})}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="subGroups">
							{#if !fields.subGroups?.hidden}
								<GroupSelectTd
									name="subGroups"
									bind:value={node.subGroups}
									list
									errors={errors?.[row]?.iterms?.subGroups}
									readonly={fields.subGroups?.readonly}
									disabled={fields.subGroups?.disabled}
									on:save={(e) =>
										dispatch('save', {
											value: { subGroups: node?.subGroups, where: { id: { val: node?.id } } }
										})}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="users">
							{#if !fields.users?.hidden}
								<UserSelectTd
									name="users"
									bind:value={node.users}
									list
									errors={errors?.[row]?.iterms?.users}
									readonly={fields.users?.readonly}
									disabled={fields.users?.disabled}
									on:save={(e) =>
										dispatch('save', {
											value: { users: node?.users, where: { id: { val: node?.id } } }
										})}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="roles">
							{#if !fields.roles?.hidden}
								<RoleSelectTd
									name="roles"
									bind:value={node.roles}
									list
									errors={errors?.[row]?.iterms?.roles}
									readonly={fields.roles?.readonly}
									disabled={fields.roles?.disabled}
									on:save={(e) =>
										dispatch('save', {
											value: { roles: node?.roles, where: { id: { val: node?.id } } }
										})}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="realm">
							{#if !fields.realm?.hidden}
								<Td errors={errors?.[row]?.iterms?.realm} {zIndex}>
									{#if node.id}
										<ObjectLink
											bind:value={node.realm}
											textFieldName="name"
											path={`${node.id}/realm`}
											name={$LL.graphql.objects.Group.fields.realm.name()}
											disabled={fields.realm?.disabled}
											on:goto
										/>
									{:else}
										<RealmTableDialog
											bind:value={node.realm}
											class="btn-link"
											textFieldName="name"
											singleChoice
											readonly={fields.realm?.readonly}
											disabled={fields.realm?.disabled}
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
<div class="sm:hidden">
	{#if isFetching}
		<Loading />
	{:else if value && value.length > 0}
		{#each value as node, row}
			{#if node}
				<Table {zIndex} class={className}>
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
					<tbody>
						<slot name="name">
							{#if !fields.name?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.name.name()}</td>
									<StringTd
										name="name"
										bind:value={node.name}
										on:save={(e) =>
											dispatch('save', {
												value: { name: node?.name, where: { id: { val: node?.id } } }
											})}
										readonly={fields.name?.readonly}
										disabled={fields.name?.disabled}
										errors={errors?.[row]?.iterms?.name}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="description">
							{#if !fields.description?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.description.name()}</td>
									<StringTd
										name="description"
										bind:value={node.description}
										on:save={(e) =>
											dispatch('save', {
												value: { description: node?.description, where: { id: { val: node?.id } } }
											})}
										readonly={fields.description?.readonly}
										disabled={fields.description?.disabled}
										errors={errors?.[row]?.iterms?.description}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="path">
							{#if !fields.path?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.path.name()}</td>
									<StringTd
										name="path"
										bind:value={node.path}
										on:save={(e) =>
											dispatch('save', {
												value: { path: node?.path, where: { id: { val: node?.id } } }
											})}
										readonly={fields.path?.readonly}
										disabled={fields.path?.disabled}
										errors={errors?.[row]?.iterms?.path}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="deep">
							{#if !fields.deep?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.deep.name()}</td>
									<IntTd
										name="deep"
										bind:value={node.deep}
										on:save={(e) =>
											dispatch('save', {
												value: { deep: node?.deep, where: { id: { val: node?.id } } }
											})}
										readonly={fields.deep?.readonly}
										disabled={fields.deep?.disabled}
										errors={errors?.[row]?.iterms?.deep}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="parentId">
							{#if !fields.parentId?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.parentId.name()}</td>
									<StringTd
										name="parentId"
										bind:value={node.parentId}
										on:save={(e) =>
											dispatch('save', {
												value: { parentId: node?.parentId, where: { id: { val: node?.id } } }
											})}
										readonly={fields.parentId?.readonly}
										disabled={fields.parentId?.disabled}
										errors={errors?.[row]?.iterms?.parentId}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="parent">
							{#if !fields.parent?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.parent.name()}</td>
									<GroupSelectTd
										name="parent"
										bind:value={node.parent}
										errors={errors?.[row]?.iterms?.parent}
										readonly={fields.parent?.readonly}
										disabled={fields.parent?.disabled}
										on:save={(e) =>
											dispatch('save', {
												value: { parent: node?.parent, where: { id: { val: node?.id } } }
											})}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="subGroups">
							{#if !fields.subGroups?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.subGroups.name()}</td>
									<GroupSelectTd
										name="subGroups"
										bind:value={node.subGroups}
										list
										errors={errors?.[row]?.iterms?.subGroups}
										readonly={fields.subGroups?.readonly}
										disabled={fields.subGroups?.disabled}
										on:save={(e) =>
											dispatch('save', {
												value: { subGroups: node?.subGroups, where: { id: { val: node?.id } } }
											})}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="users">
							{#if !fields.users?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.users.name()}</td>
									<UserSelectTd
										name="users"
										bind:value={node.users}
										list
										errors={errors?.[row]?.iterms?.users}
										readonly={fields.users?.readonly}
										disabled={fields.users?.disabled}
										on:save={(e) =>
											dispatch('save', {
												value: { users: node?.users, where: { id: { val: node?.id } } }
											})}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="roles">
							{#if !fields.roles?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.roles.name()}</td>
									<RoleSelectTd
										name="roles"
										bind:value={node.roles}
										list
										errors={errors?.[row]?.iterms?.roles}
										readonly={fields.roles?.readonly}
										disabled={fields.roles?.disabled}
										on:save={(e) =>
											dispatch('save', {
												value: { roles: node?.roles, where: { id: { val: node?.id } } }
											})}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="realm">
							{#if !fields.realm?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Group.fields.realm.name()}</td>
									<Td errors={errors?.[row]?.iterms?.realm} {zIndex}>
										{#if node.id}
											<ObjectLink
												bind:value={node.realm}
												textFieldName="name"
												disabled={fields.realm?.disabled}
												path={`${node.id}/realm`}
												name={$LL.graphql.objects.Group.fields.realm.name()}
												on:goto
											/>
										{:else}
											<RealmTableDialog
												bind:value={node.realm}
												class="btn-link"
												textFieldName="name"
												singleChoice
												readonly={fields.realm?.readonly}
												disabled={fields.realm?.disabled}
											/>
										{/if}
									</Td>
								</tr>
							{/if}
						</slot>
					</tbody>
				</Table>
				{#if row < value.length - 1}
					<div class="divider my-0" />
				{/if}
			{/if}
		{/each}
	{:else}
		<Empty />
	{/if}
</div>