<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark, Funnel, Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Loading, SearchInput, Table, Td } from '@graphace/ui';
	import { type Option, StringTh, StringTd, ObjectLink } from '@graphace/ui-graphql';
	import PermissionFilter from '~/lib/components/objects/permission/PermissionFilter.svelte';
	import PermissionFormDialog from '~/lib/components/objects/permission/PermissionFormDialog.svelte';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
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
		field?: Option | undefined;
		type?: Option | undefined;
		permissionType?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
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
		remove: { 
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		unbind: { 
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		edit: { 
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		save: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
		select: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
		create: {};
		back: {};
	}>();

	let selectAll: boolean;
</script>

<div class="flex sm:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{#if title}
			{title}
		{:else}
			{$LL.graphql.objects.Permission.name()}
		{/if}
	</span>
	<Buttons
		class="flex space-x-1 max-sm:w-full"
		showRemoveButton={showRemoveButton && selectedIdList.length > 0}
		showUnbindButton={showUnbindButton && selectedIdList.length > 0}
		{showSaveButton}
		{showCreateButton}
		{showSelectButton}
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
					name={$LL.graphql.objects.Permission.fields.name.name()}
					bind:value={args.name}
					bind:sort={orderBy.name}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.description?.hidden}
				<StringTh
					name={$LL.graphql.objects.Permission.fields.description.name()}
					bind:value={args.description}
					bind:sort={orderBy.description}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.field?.hidden}
				<StringTh
					name={$LL.graphql.objects.Permission.fields.field.name()}
					bind:value={args.field}
					bind:sort={orderBy.field}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.type?.hidden}
				<StringTh
					name={$LL.graphql.objects.Permission.fields.type.name()}
					bind:value={args.type}
					bind:sort={orderBy.type}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.permissionType?.hidden}
				<PermissionTypeTh
					name={$LL.graphql.objects.Permission.fields.permissionType.name()}
					bind:value={args.permissionType}
					bind:sort={orderBy.permissionType}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.roles?.hidden}
				<RoleTh
					name={$LL.graphql.objects.Permission.fields.roles.name()}
					bind:value={args.roles}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.realm?.hidden}
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
						<slot name="field">
							{#if !fields.field?.hidden}
								<StringTd
									name="field"
									bind:value={node.field}
									on:save={(e) =>
										dispatch('save', {
											value: { field: node?.field, where: { id: { val: node?.id } } }
										})}
									readonly={fields.field?.readonly}
									disabled={fields.field?.disabled}
									errors={errors?.[row]?.iterms?.field}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="type">
							{#if !fields.type?.hidden}
								<StringTd
									name="type"
									bind:value={node.type}
									on:save={(e) =>
										dispatch('save', {
											value: { type: node?.type, where: { id: { val: node?.id } } }
										})}
									readonly={fields.type?.readonly}
									disabled={fields.type?.disabled}
									errors={errors?.[row]?.iterms?.type}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="permissionType">
							{#if !fields.permissionType?.hidden}
								<PermissionTypeTd
									name="permissionType"
									bind:value={node.permissionType}
									on:save={(e) =>
										dispatch('save', {
											value: { permissionType: node?.permissionType, where: { id: { val: node?.id } } }
										})}
									readonly={fields.permissionType?.readonly}
									disabled={fields.permissionType?.disabled}
									errors={errors?.[row]?.iterms?.permissionType}
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
											name={$LL.graphql.objects.Permission.fields.realm.name()}
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
					<tbody>
						<slot name="name">
							{#if !fields.name?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Permission.fields.name.name()}</td>
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
									<td>{$LL.graphql.objects.Permission.fields.description.name()}</td>
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
						<slot name="field">
							{#if !fields.field?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Permission.fields.field.name()}</td>
									<StringTd
										name="field"
										bind:value={node.field}
										on:save={(e) =>
											dispatch('save', {
												value: { field: node?.field, where: { id: { val: node?.id } } }
											})}
										readonly={fields.field?.readonly}
										disabled={fields.field?.disabled}
										errors={errors?.[row]?.iterms?.field}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="type">
							{#if !fields.type?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Permission.fields.type.name()}</td>
									<StringTd
										name="type"
										bind:value={node.type}
										on:save={(e) =>
											dispatch('save', {
												value: { type: node?.type, where: { id: { val: node?.id } } }
											})}
										readonly={fields.type?.readonly}
										disabled={fields.type?.disabled}
										errors={errors?.[row]?.iterms?.type}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="permissionType">
							{#if !fields.permissionType?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Permission.fields.permissionType.name()}</td>
									<PermissionTypeTd
										name="permissionType"
										bind:value={node.permissionType}
										on:save={(e) =>
											dispatch('save', {
												value: { permissionType: node?.permissionType, where: { id: { val: node?.id } } }
											})}
										readonly={fields.permissionType?.readonly}
										disabled={fields.permissionType?.disabled}
										errors={errors?.[row]?.iterms?.permissionType}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="roles">
							{#if !fields.roles?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.Permission.fields.roles.name()}</td>
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
									<td>{$LL.graphql.objects.Permission.fields.realm.name()}</td>
									<Td errors={errors?.[row]?.iterms?.realm} {zIndex}>
										{#if node.id}
											<ObjectLink
												bind:value={node.realm}
												textFieldName="name"
												path={`${node.id}/realm`}
												name={$LL.graphql.objects.Permission.fields.realm.name()}
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