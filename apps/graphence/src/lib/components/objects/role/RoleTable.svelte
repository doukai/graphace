<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Loading, SearchInput, Table } from '@graphace/ui';
	import { type Option, StringTh, StringTd, ObjectTd } from '@graphace/ui-graphql';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import PermissionTh from '~/lib/components/objects/permission/PermissionTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelectTd from '~/lib/components/objects/group/GroupSelectTd.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
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
	export let isFetching: boolean = false;
	export let errors: Record<number, Errors> = {};
	export let showEditButton: boolean = false;
	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showCreateButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = false;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };
	export let fields: {
		name: Option;
		description: Option;
		users: Option;
		groups: Option;
		composites: Option;
		permissions: Option;
		realm: Option;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		users: { readonly: false, disabled: false, hidden: false },
		groups: { readonly: false, disabled: false, hidden: false },
		composites: { readonly: false, disabled: false, hidden: false },
		permissions: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryRoleListArgs; orderBy: RoleOrderBy };
		remove: { value: RoleInput | (RoleInput | null | undefined)[] | null | undefined };
		unbind: { value: RoleInput | (RoleInput | null | undefined)[] | null | undefined };
		edit: { value: RoleInput | (RoleInput | null | undefined)[] | null | undefined };
		save: { value: RoleInput | (RoleInput | null | undefined)[] | null | undefined };
		select: { value: RoleInput | (RoleInput | null | undefined)[] | null | undefined };
		create: {};
		back: {};
	}>();

	let selectAll: boolean;
</script>

<div class="flex md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.Role.name()}
	</span>
	<Buttons
		class="flex space-x-1 max-sm:w-full"
		showRemoveButton={showRemoveButton && selectedIdList.length > 0}
		showUnbindButton={showUnbindButton && selectedIdList.length > 0}
		{showSaveButton}
		{showCreateButton}
		{showSelectButton}
		{showBackButton}
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
		<SearchInput slot="start" on:search />
	</Buttons>
</div>
<div class="divider" />
<Table {zIndex} class={className}>
	<thead>
		<tr>
			<th>
				<label>
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={selectAll}
						on:change={(e) => {
							if (value && value.length > 0) {
								selectedIdList = selectAll ? value.map((node) => node?.id) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if !fields.name.hidden}
				<StringTh
					name={$LL.graphql.objects.Role.fields.name.name()}
					bind:value={args.name}
					bind:sort={orderBy.name}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.description.hidden}
				<StringTh
					name={$LL.graphql.objects.Role.fields.description.name()}
					bind:value={args.description}
					bind:sort={orderBy.description}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.users.hidden}
				<UserTh
					name={$LL.graphql.objects.Role.fields.users.name()}
					bind:value={args.users}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.groups.hidden}
				<GroupTh
					name={$LL.graphql.objects.Role.fields.groups.name()}
					bind:value={args.groups}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.composites.hidden}
				<RoleTh
					name={$LL.graphql.objects.Role.fields.composites.name()}
					bind:value={args.composites}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.permissions.hidden}
				<PermissionTh
					name={$LL.graphql.objects.Role.fields.permissions.name()}
					bind:value={args.permissions}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.realm.hidden}
				<RealmTh
					name={$LL.graphql.objects.Role.fields.realm.name()}
					bind:value={args.realm}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			<th />
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
					<tr>
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
							{#if !fields.name.hidden}
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={(e) =>
										dispatch('save', {
											value: { name: node?.name, where: { id: { val: node?.id } } }
										})}
									readonly={fields.name.readonly}
									disabled={fields.name.disabled}
									errors={errors?.[row]?.iterms?.name}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="description">
							{#if !fields.description.hidden}
								<StringTd
									name="description"
									bind:value={node.description}
									on:save={(e) =>
										dispatch('save', {
											value: { description: node?.description, where: { id: { val: node?.id } } }
										})}
									readonly={fields.description.readonly}
									disabled={fields.description.disabled}
									errors={errors?.[row]?.iterms?.description}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="users">
							{#if !fields.users.hidden}
								<ObjectTd
									namedStruct={node.users}
									errors={errors?.[row]?.iterms?.users}
									path={`${node.id}/users`}
									on:goto
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="groups">
							{#if !fields.groups.hidden}
								<GroupSelectTd
									name="groups"
									bind:value={node.groups}
									list
									errors={errors?.[row]?.iterms?.groups}
									readonly={fields.groups.readonly}
									disabled={fields.groups.disabled}
									on:save={(e) =>
										dispatch('save', {
											value: { groups: node?.groups, where: { id: { val: node?.id } } }
										})}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="composites">
							{#if !fields.composites.hidden}
								<RoleSelectTd
									name="composites"
									bind:value={node.composites}
									list
									errors={errors?.[row]?.iterms?.composites}
									readonly={fields.composites.readonly}
									disabled={fields.composites.disabled}
									on:save={(e) =>
										dispatch('save', {
											value: { composites: node?.composites, where: { id: { val: node?.id } } }
										})}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="permissions">
							{#if !fields.permissions.hidden}
								<ObjectTd
									errors={errors?.[row]?.iterms?.permissions}
									path={`${node.id}/permissions`}
									on:goto
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="realm">
							{#if !fields.realm.hidden}
								<ObjectTd
									namedStruct={node.realm}
									errors={errors?.[row]?.iterms?.realm}
									path={`${node.id}/realm`}
									on:goto
									{zIndex}
								/>
							{/if}
						</slot>
						<th class="hover:z-[{zIndex + 3}]">
							<div class="flex space-x-1">
								{#if showEditButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('edit', { value: node })}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
								{/if}
								{#if showUnbindButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.unbindBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('unbind', { value: node })}
										>
											<Icon src={ArchiveBoxXMark} solid />
										</button>
									</div>
								{/if}
								{#if showRemoveButton}
									<div class="tooltip" data-tip={$LL.graphence.components.table.removeBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => dispatch('remove', { value: node })}
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
