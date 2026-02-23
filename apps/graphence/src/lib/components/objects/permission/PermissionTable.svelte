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
	import { StringTh, StringTd, ObjectLink } from '@graphace/ui-graphql';
	import PermissionFilter from '~/lib/components/objects/permission/PermissionFilter.svelte';
	import PermissionFormDialog from '~/lib/components/objects/permission/PermissionFormDialog.svelte';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		permissionTabs,
		permissionTab,
		permissionTabChange,
		permissionFields,
		type PermissionFields
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
	export let tabs: TabInfo[] | undefined = permissionTabs;
	export let tab: string | undefined = permissionTab;
	export let fields: PermissionFields | undefined = permissionFields;

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
				resolve: (data: (PermissionInput | null | undefined)[] | null | undefined) => void,
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

	const validateRow = async (value: PermissionInput) => {
		const errors: Record<string, Errors> = {};
		const nameErrors = await fields?.name.validate?.(value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await fields?.description.validate?.(value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
		const fieldErrors = await fields?.field.validate?.(value);
		if (fieldErrors && fieldErrors.length > 0) {
			errors['field'] = { errors: fieldErrors.map((message) => ({ message })) };
		}
		const typeErrors = await fields?.type.validate?.(value);
		if (typeErrors && typeErrors.length > 0) {
			errors['type'] = { errors: typeErrors.map((message) => ({ message })) };
		}
		const permissionTypeErrors = await fields?.permissionType.validate?.(value);
		if (permissionTypeErrors && permissionTypeErrors.length > 0) {
			errors['permissionType'] = { errors: permissionTypeErrors.map((message) => ({ message })) };
		}
		const rolesErrors = await fields?.roles.validate?.(value);
		if (rolesErrors && rolesErrors.length > 0) {
			errors['roles'] = { errors: rolesErrors.map((message) => ({ message })) };
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
			{$LL.graphql.objects.Permission.name()}
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
				<SearchInput class="max-sm:w-full" on:search />
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
<div class="divider my-0" />
{#if tabs}
	<Tabs
		value={tab}
		{tabs}
		on:change={(e) => {
			if (e.detail.value !== e.detail.origin) {
				permissionTabChange(e.detail.value, args).then((args) => {
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
			<slot name="name-th">
				{#if !fields?.name?.hiddenCol?.(args, tab)}
					<StringTh
						name={$LL.graphql.objects.Permission.fields.name.name()}
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
						name={$LL.graphql.objects.Permission.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{...fields?.description?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="field-th">
				{#if !fields?.field?.hiddenCol?.(args, tab)}
					<StringTh
						name={$LL.graphql.objects.Permission.fields.field.name()}
						bind:value={args.field}
						bind:sort={orderBy.field}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.field?.required?.()}
						{...fields?.field?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="type-th">
				{#if !fields?.type?.hiddenCol?.(args, tab)}
					<StringTh
						name={$LL.graphql.objects.Permission.fields.type.name()}
						bind:value={args.type}
						bind:sort={orderBy.type}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.type?.required?.()}
						{...fields?.type?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="permissionType-th">
				{#if !fields?.permissionType?.hiddenCol?.(args, tab)}
					<PermissionTypeTh
						name={$LL.graphql.objects.Permission.fields.permissionType.name()}
						bind:value={args.permissionType}
						bind:sort={orderBy.permissionType}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.permissionType?.required?.()}
						{...fields?.permissionType?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="roles-th">
				{#if !fields?.roles?.hiddenCol?.(args, tab)}
					<RoleTh
						name={$LL.graphql.objects.Permission.fields.roles.name()}
						bind:value={args.roles}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.roles?.required?.()}
						{...fields?.roles?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="realm-th">
				{#if !fields?.realm?.hiddenCol?.(args, tab)}
					<RealmTh
						name={$LL.graphql.objects.Permission.fields.realm.name()}
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
									bind:group={selectedIdList}
									value={node.id}
								/>
							</label>
						</th>
						<slot name="name">
							{#if !fields?.name?.hiddenCol?.(args, tab)}
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
									on:change={(e) => fields?.name.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.name}
									{zIndex}
									{...fields?.name?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="description">
							{#if !fields?.description?.hiddenCol?.(args, tab)}
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
									on:change={(e) => fields?.description.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.description}
									{zIndex}
									{...fields?.description?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="field">
							{#if !fields?.field?.hiddenCol?.(args, tab)}
								<StringTd
									name="field"
									bind:value={node.field}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { field: node?.field, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.field?.readonly?.(node)}
									disabled={fields?.field?.disabled?.(node)}
									on:change={(e) => fields?.field.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.field}
									{zIndex}
									{...fields?.field?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="type">
							{#if !fields?.type?.hiddenCol?.(args, tab)}
								<StringTd
									name="type"
									bind:value={node.type}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { type: node?.type, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.type?.readonly?.(node)}
									disabled={fields?.type?.disabled?.(node)}
									on:change={(e) => fields?.type.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.type}
									{zIndex}
									{...fields?.type?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="permissionType">
							{#if !fields?.permissionType?.hiddenCol?.(args, tab)}
								<PermissionTypeTd
									name="permissionType"
									bind:value={node.permissionType}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { permissionType: node?.permissionType, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.permissionType?.readonly?.(node)}
									disabled={fields?.permissionType?.disabled?.(node)}
									on:change={(e) => fields?.permissionType.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.permissionType}
									{zIndex}
									{...fields?.permissionType?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="roles">
							{#if !fields?.roles?.hiddenCol?.(args, tab)}
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
									on:change={(e) => fields?.roles.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.roles?.props?.(node)?.['td']}
								/>
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
				<tbody class="border">
					<slot name="name-sm">
						{#if !fields?.name?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.name?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.name.name()}
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
									on:change={(e) => fields?.name.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.name?.readonly?.(node)}
									disabled={fields?.name?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.name}
									{zIndex}
									{...fields?.name?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="description-sm">
						{#if !fields?.description?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.description?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.description.name()}
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
									on:change={(e) => fields?.description.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.description?.readonly?.(node)}
									disabled={fields?.description?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.description}
									{zIndex}
									{...fields?.description?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="field-sm">
						{#if !fields?.field?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.field?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.field.name()}
										required={fields?.field?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="field"
									bind:value={node.field}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { field: node?.field, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.field.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.field?.readonly?.(node)}
									disabled={fields?.field?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.field}
									{zIndex}
									{...fields?.field?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="type-sm">
						{#if !fields?.type?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.type?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.type.name()}
										required={fields?.type?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="type"
									bind:value={node.type}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { type: node?.type, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.type.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.type?.readonly?.(node)}
									disabled={fields?.type?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.type}
									{zIndex}
									{...fields?.type?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="permissionType-sm">
						{#if !fields?.permissionType?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.permissionType?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.permissionType.name()}
										required={fields?.permissionType?.required?.(node)}
										class="truncate"
									/>
								</td>
								<PermissionTypeTd
									{id}
									name="permissionType"
									bind:value={node.permissionType}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { permissionType: node?.permissionType, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.permissionType.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.permissionType?.readonly?.(node)}
									disabled={fields?.permissionType?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.permissionType}
									{zIndex}
									{...fields?.permissionType?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="roles-sm">
						{#if !fields?.roles?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.roles?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.roles.name()}
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
									on:change={(e) => fields?.roles.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.roles?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="realm-sm">
						{#if !fields?.realm?.hiddenCol?.(args, tab)}
							<Tr class="hover" let:id {...fields?.realm?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Permission.fields.realm.name()}
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