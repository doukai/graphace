<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Loading, SearchInput, Table, Td } from '@graphace/ui';
	import { type Option, IDTh, IDTd, StringTh, StringTd, ObjectTd } from '@graphace/ui-graphql';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import RoleTableDialog from '~/lib/components/objects/role/RoleTableDialog.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
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
		field: Option;
		type: Option;
		permissionType: Option;
		roles: Option;
		realm: Option;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		field: { readonly: false, disabled: false, hidden: false },
		type: { readonly: false, disabled: false, hidden: false },
		permissionType: { readonly: false, disabled: false, hidden: false },
		roles: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryPermissionListArgs; orderBy: PermissionOrderBy };
		remove: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
		unbind: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
		edit: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
		save: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
		select: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
		create: {};
		back: {};
	}>();

	let selectAll: boolean;
</script>

<div class="flex md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.Permission.name()}
	</span>
	<Buttons
		class="flex space-x-1 max-sm:w-full"
		showRemoveButton={showRemoveButton && selectedIdList.length > 0}
		showUnbindButton={showUnbindButton && selectedIdList.length > 0}
		{showSaveButton}
		{showCreateButton}
		showSelectButton={showSelectButton && selectedIdList.length > 0}
		{showBackButton}
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) =>
			dispatch('remove', {
				value: value?.filter((node) => selectedIdList.includes(node?.name))
			})}
		on:unbind={(e) =>
			dispatch('unbind', {
				value: value?.filter((node) => selectedIdList.includes(node?.name))
			})}
		on:select={(e) =>
			dispatch('select', {
				value: value?.filter((node) => selectedIdList.includes(node?.name))
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
			<th class="w-0">
				<label>
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={selectAll}
						on:change={(e) => {
							if (value && value.length > 0) {
								selectedIdList = selectAll ? value.map((node) => node?.name) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if !fields.name.hidden}
				<IDTh
					name={$LL.graphql.objects.Permission.fields.name.name()}
					bind:value={args.name}
					bind:sort={orderBy.name}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.description.hidden}
				<StringTh
					name={$LL.graphql.objects.Permission.fields.description.name()}
					bind:value={args.description}
					bind:sort={orderBy.description}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.field.hidden}
				<StringTh
					name={$LL.graphql.objects.Permission.fields.field.name()}
					bind:value={args.field}
					bind:sort={orderBy.field}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.type.hidden}
				<StringTh
					name={$LL.graphql.objects.Permission.fields.type.name()}
					bind:value={args.type}
					bind:sort={orderBy.type}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.permissionType.hidden}
				<PermissionTypeTh
					name={$LL.graphql.objects.Permission.fields.permissionType.name()}
					bind:value={args.permissionType}
					bind:sort={orderBy.permissionType}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.roles.hidden}
				<RoleTh
					name={$LL.graphql.objects.Permission.fields.roles.name()}
					bind:value={args.roles}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.realm.hidden}
				<RealmTh
					name={$LL.graphql.objects.Permission.fields.realm.name()}
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
									value={node.name}
								/>
							</label>
						</th>
						<slot name="name">
							{#if !fields.name.hidden}
								<IDTd
									name="name"
									bind:value={node.name}
									readonly
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
											value: { description: node?.description, where: { name: { val: node?.name } } }
										})}
									readonly={fields.description.readonly}
									disabled={fields.description.disabled}
									errors={errors?.[row]?.iterms?.description}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="field">
							{#if !fields.field.hidden}
								<StringTd
									name="field"
									bind:value={node.field}
									on:save={(e) =>
										dispatch('save', {
											value: { field: node?.field, where: { name: { val: node?.name } } }
										})}
									readonly={fields.field.readonly}
									disabled={fields.field.disabled}
									errors={errors?.[row]?.iterms?.field}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="type">
							{#if !fields.type.hidden}
								<StringTd
									name="type"
									bind:value={node.type}
									on:save={(e) =>
										dispatch('save', {
											value: { type: node?.type, where: { name: { val: node?.name } } }
										})}
									readonly={fields.type.readonly}
									disabled={fields.type.disabled}
									errors={errors?.[row]?.iterms?.type}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="permissionType">
							{#if !fields.permissionType.hidden}
								<PermissionTypeTd
									name="permissionType"
									bind:value={node.permissionType}
									on:save={(e) =>
										dispatch('save', {
											value: { permissionType: node?.permissionType, where: { name: { val: node?.name } } }
										})}
									readonly={fields.permissionType.readonly}
									disabled={fields.permissionType.disabled}
									errors={errors?.[row]?.iterms?.permissionType}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="roles">
							{#if !fields.roles.hidden}
								{#if node.name}
									<ObjectTd
										namedStruct={node.roles}
										errors={errors?.[row]?.iterms?.roles}
										disabled={fields.roles.disabled}
										path={`${node.name}/roles`}
										name={node.name + ':' + $LL.graphql.objects.Permission.fields.roles.name()}
										on:goto
										{zIndex}
									/>
								{:else}
									<Td {zIndex}>
										<RoleTableDialog
											bind:value={node.roles}
											readonly={fields.roles.readonly}
											disabled={fields.roles.disabled}
											on:select={(e) =>
												dispatch('save', {
													value: { roles: node?.roles, where: { name: { val: node?.name } } }
												})}
											class="btn-xs"
										/>
									</Td>
								{/if}
							{/if}
						</slot>
						<slot name="realm">
							{#if !fields.realm.hidden}
								{#if node.name}
									<ObjectTd
										namedStruct={node.realm}
										errors={errors?.[row]?.iterms?.realm}
										disabled={fields.realm.disabled}
										path={`${node.name}/realm`}
										name={node.name + ':' + $LL.graphql.objects.Permission.fields.realm.name()}
										on:goto
										{zIndex}
									/>
								{:else}
									<Td {zIndex}>
										<RealmTableDialog
											bind:value={node.realm}
											singleChoice={true}
											readonly={fields.realm.readonly}
											disabled={fields.realm.disabled}
											on:select={(e) =>
												dispatch('save', {
													value: { realm: node?.realm, where: { name: { val: node?.name } } }
												})}
											class="btn-xs"
										/>
									</Td>
								{/if}
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
