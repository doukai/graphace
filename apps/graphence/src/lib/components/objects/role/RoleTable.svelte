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
	import { StringTh, StringTd, ObjectLink } from '@graphace/ui-graphql';
	import RoleFilter from '~/lib/components/objects/role/RoleFilter.svelte';
	import RoleFormDialog from '~/lib/components/objects/role/RoleFormDialog.svelte';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import PermissionTh from '~/lib/components/objects/permission/PermissionTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelectTd from '~/lib/components/objects/group/GroupSelectTd.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import UserTableDialog from '~/lib/components/objects/user/UserTableDialog.svelte';
	import PermissionTableDialog from '~/lib/components/objects/permission/PermissionTableDialog.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		roleTabs,
		roleTab,
		roleTabChange,
		roleFields,
		type RoleFieldsArgs,
		type RoleFields,
		validate,
		validateAll
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
	export let tabs: (($LL: TranslationFunctions, args?: QueryRoleListArgs | undefined) => TabInfo[] | undefined) | undefined = roleTabs;
	export let tab: string | undefined = roleTab?.(args);
	export let fields: RoleFields | undefined = roleFields;
	export let fieldsPatch: RoleFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: RoleFieldsArgs | undefined = undefined;

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
				{$LL.graphql.objects.Role.name()}
			{/if}
		</span>
	</slot>
	{#if tabs?.($LL, args)}
		<Tabs
			bind:value={tab}
			tabs={tabs?.($LL, args)}
			class="max-md:hidden"
			on:change={(e) => {
				dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
				if (e.detail.value !== e.detail.origin) {
					roleTabChange(e.detail.value, args, value)
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
					<RoleFilter
						bind:value={args}
						bind:orderBy
						on:filter={(e) => dispatch('query', { args, orderBy })}
					/>
				</div>
			{/if}
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
{#if tabs?.($LL, args)}
	<Tabs
		bind:value={tab}
		tabs={tabs?.($LL, args)}
		class="md:hidden"
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				roleTabChange(e.detail.value, args, value)
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
						name={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.Role.fields.name.name()}
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
						name={fields?.description?.title?.($LL, fieldsArgs?.description) || $LL.graphql.objects.Role.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{zIndex}
						{...fields?.description?.props?.($LL, undefined, fieldsArgs?.description)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="users-th" {args} {orderBy} {fields}>
				{#if !fields?.users?.hiddenCol?.(args, tab, fieldsArgs?.users)}
					<UserTh
						name={fields?.users?.title?.($LL, fieldsArgs?.users) || $LL.graphql.objects.Role.fields.users.name()}
						bind:value={args.users}
						bind:orderBy={orderBy.users}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.users?.required?.()}
						{zIndex}
						{...fields?.users?.props?.($LL, undefined, fieldsArgs?.users)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="groups-th" {args} {orderBy} {fields}>
				{#if !fields?.groups?.hiddenCol?.(args, tab, fieldsArgs?.groups)}
					<GroupTh
						name={fields?.groups?.title?.($LL, fieldsArgs?.groups) || $LL.graphql.objects.Role.fields.groups.name()}
						bind:value={args.groups}
						bind:orderBy={orderBy.groups}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.groups?.required?.()}
						{zIndex}
						{...fields?.groups?.props?.($LL, undefined, fieldsArgs?.groups)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="composites-th" {args} {orderBy} {fields}>
				{#if !fields?.composites?.hiddenCol?.(args, tab, fieldsArgs?.composites)}
					<RoleTh
						name={fields?.composites?.title?.($LL, fieldsArgs?.composites) || $LL.graphql.objects.Role.fields.composites.name()}
						bind:value={args.composites}
						bind:orderBy={orderBy.composites}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.composites?.required?.()}
						{zIndex}
						{...fields?.composites?.props?.($LL, undefined, fieldsArgs?.composites)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="permissions-th" {args} {orderBy} {fields}>
				{#if !fields?.permissions?.hiddenCol?.(args, tab, fieldsArgs?.permissions)}
					<PermissionTh
						name={fields?.permissions?.title?.($LL, fieldsArgs?.permissions) || $LL.graphql.objects.Role.fields.permissions.name()}
						bind:value={args.permissions}
						bind:orderBy={orderBy.permissions}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.permissions?.required?.()}
						{zIndex}
						{...fields?.permissions?.props?.($LL, undefined, fieldsArgs?.permissions)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="realm-th" {args} {orderBy} {fields}>
				{#if !fields?.realm?.hiddenCol?.(args, tab, fieldsArgs?.realm)}
					<RealmTh
						name={fields?.realm?.title?.($LL, fieldsArgs?.realm) || $LL.graphql.objects.Role.fields.realm.name()}
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
						<slot name="users" {node} {errors} {fields} {row}>
							{#if !fields?.users?.hiddenCol?.(args, tab, fieldsArgs?.users)}
								<Td errors={errors?.[row]?.iterms?.users} {zIndex} {...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.users}
											textFieldName="name"
											path={`${node.id}/users`}
											on:goto
											{...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['link']}
										/>
									{:else}
										<UserTableDialog
											fieldsPatch={fields?.users?.fields?.(node, fieldsArgs?.users)}
											bind:value={node.users}
											textFieldName="name"
											class="btn-link"
											readonly={fields?.users?.readonly?.(node, fieldsArgs?.users)}
											disabled={fields?.users?.disabled?.(node, fieldsArgs?.users)}
											on:select={(e) => {
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
											{...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['dialog']}
										/>
									{/if}
								</Td>
							{/if}
						</slot>
						<slot name="groups" {node} {errors} {fields} {row}>
							{#if !fields?.groups?.hiddenCol?.(args, tab, fieldsArgs?.groups)}
								<GroupSelectTd
									name="groups"
									bind:value={node.groups}
									list
									errors={errors?.[row]?.iterms?.groups}
									readonly={fields?.groups?.readonly?.(node, fieldsArgs?.groups)}
									disabled={fields?.groups?.disabled?.(node, fieldsArgs?.groups)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { groups: node?.groups, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
									on:change={(e) => {
										if (Array.isArray(e.detail.value) || e.detail.value == null) {
											fields?.groups
												?.onChange?.($LL, e.detail.value, node, fieldsArgs?.groups)
												.then((next) => (node = next))
												.catch(
													(e) =>
														(errors = {
															...errors,
															[row]: {
																...errors?.[row],
																iterms: { ...errors?.[row]?.iterms, groups: e }
															}
														})
												);
										}
									}}
									{zIndex}
									{...fields?.groups?.props?.($LL, node, fieldsArgs?.groups)?.['combobox']}
								/>
							{/if}
						</slot>
						<slot name="composites" {node} {errors} {fields} {row}>
							{#if !fields?.composites?.hiddenCol?.(args, tab, fieldsArgs?.composites)}
								<RoleSelectTd
									name="composites"
									bind:value={node.composites}
									list
									errors={errors?.[row]?.iterms?.composites}
									readonly={fields?.composites?.readonly?.(node, fieldsArgs?.composites)}
									disabled={fields?.composites?.disabled?.(node, fieldsArgs?.composites)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { composites: node?.composites, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
									on:change={(e) => {
										if (Array.isArray(e.detail.value) || e.detail.value == null) {
											fields?.composites
												?.onChange?.($LL, e.detail.value, node, fieldsArgs?.composites)
												.then((next) => (node = next))
												.catch(
													(e) =>
														(errors = {
															...errors,
															[row]: {
																...errors?.[row],
																iterms: { ...errors?.[row]?.iterms, composites: e }
															}
														})
												);
										}
									}}
									{zIndex}
									{...fields?.composites?.props?.($LL, node, fieldsArgs?.composites)?.['combobox']}
								/>
							{/if}
						</slot>
						<slot name="permissions" {node} {errors} {fields} {row}>
							{#if !fields?.permissions?.hiddenCol?.(args, tab, fieldsArgs?.permissions)}
								<Td errors={errors?.[row]?.iterms?.permissions} {zIndex} {...fields?.permissions?.props?.($LL, node, fieldsArgs?.permissions)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.permissions}
											path={`${node.id}/permissions`}
											on:goto
											{...fields?.permissions?.props?.($LL, node, fieldsArgs?.permissions)?.['link']}
										/>
									{:else}
										<PermissionTableDialog
											fieldsPatch={fields?.permissions?.fields?.(node, fieldsArgs?.permissions)}
											bind:value={node.permissions}
											class="btn-link"
											readonly={fields?.permissions?.readonly?.(node, fieldsArgs?.permissions)}
											disabled={fields?.permissions?.disabled?.(node, fieldsArgs?.permissions)}
											on:select={(e) => {
												if (Array.isArray(e.detail.value) || e.detail.value == null) {
													fields?.permissions
														?.onChange?.($LL, e.detail.value, node, fieldsArgs?.permissions)
														.then((next) => (node = next))
														.catch(
															(e) =>
																(errors = {
																	...errors,
																	[row]: {
																		...errors?.[row],
																		iterms: { ...errors?.[row]?.iterms, permissions: e }
																	}
																})
														);
												}
											}}
											{...fields?.permissions?.props?.($LL, node, fieldsArgs?.permissions)?.['dialog']}
										/>
									{/if}
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
				<tbody>
					<slot name="name-sm" {node} {errors} {fields} {row}>
						{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
							<Tr class="hover" let:id {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.name?.title?.($LL, fieldsArgs?.name) || 
											$LL.graphql.objects.Role.fields.name.name()}
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
											$LL.graphql.objects.Role.fields.description.name()}
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
					<slot name="users-sm" {node} {errors} {fields} {row}>
						{#if !fields?.users?.hiddenCol?.(args, tab, fieldsArgs?.users)}
							<Tr class="hover" let:id {...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.users?.title?.($LL, fieldsArgs?.users) || 
											$LL.graphql.objects.Role.fields.users.name()}
										required={fields?.users?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td errors={errors?.[row]?.iterms?.users} {zIndex} {...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.users}
											textFieldName="name"
											path={`${node.id}/users`}
											on:goto
											{...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['link']}
										/>
									{:else}
										<UserTableDialog
											fieldsPatch={fields?.users?.fields?.(node, fieldsArgs?.users)}
											bind:value={node.users}
											textFieldName="name"
											class="btn-link"
											readonly={fields?.users?.readonly?.(node, fieldsArgs?.users)}
											disabled={fields?.users?.disabled?.(node, fieldsArgs?.users)}
											on:select={(e) => {
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
											{...fields?.users?.props?.($LL, node, fieldsArgs?.users)?.['dialog']}
										/>
									{/if}
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="groups-sm" {node} {errors} {fields} {row}>
						{#if !fields?.groups?.hiddenCol?.(args, tab, fieldsArgs?.groups)}
							<Tr class="hover" let:id {...fields?.groups?.props?.($LL, node, fieldsArgs?.groups)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.groups?.title?.($LL, fieldsArgs?.groups) || 
											$LL.graphql.objects.Role.fields.groups.name()}
										required={fields?.groups?.required?.(node)}
										class="truncate"
									/>
								</td>
								<GroupSelectTd
									{id}
									name="groups"
									bind:value={node.groups}
									list
									errors={errors?.[row]?.iterms?.groups}
									readonly={fields?.groups?.readonly?.(node, fieldsArgs?.groups)}
									disabled={fields?.groups?.disabled?.(node, fieldsArgs?.groups)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { groups: node?.groups, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
									on:change={(e) => {
										if (Array.isArray(e.detail.value) || e.detail.value == null) {
											fields?.groups
												?.onChange?.($LL, e.detail.value, node, fieldsArgs?.groups)
												.then((next) => (node = next))
												.catch(
													(e) =>
														(errors = {
															...errors,
															[row]: {
																...errors?.[row],
																iterms: { ...errors?.[row]?.iterms, groups: e }
															}
														})
												);
										}
									}}
									{zIndex}
									{...fields?.groups?.props?.($LL, node, fieldsArgs?.groups)?.['combobox']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="composites-sm" {node} {errors} {fields} {row}>
						{#if !fields?.composites?.hiddenCol?.(args, tab, fieldsArgs?.composites)}
							<Tr class="hover" let:id {...fields?.composites?.props?.($LL, node, fieldsArgs?.composites)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.composites?.title?.($LL, fieldsArgs?.composites) || 
											$LL.graphql.objects.Role.fields.composites.name()}
										required={fields?.composites?.required?.(node)}
										class="truncate"
									/>
								</td>
								<RoleSelectTd
									{id}
									name="composites"
									bind:value={node.composites}
									list
									errors={errors?.[row]?.iterms?.composites}
									readonly={fields?.composites?.readonly?.(node, fieldsArgs?.composites)}
									disabled={fields?.composites?.disabled?.(node, fieldsArgs?.composites)}
									on:save={(e) =>
										validate($LL, node)
											.then((node) =>
												dispatch('save', {
													value: { composites: node?.composites, where: { id: { val: node?.id } } }
												})
											)
											.catch((e) => (errors = e))}
									on:change={(e) => {
										if (Array.isArray(e.detail.value) || e.detail.value == null) {
											fields?.composites
												?.onChange?.($LL, e.detail.value, node, fieldsArgs?.composites)
												.then((next) => (node = next))
												.catch(
													(e) =>
														(errors = {
															...errors,
															[row]: {
																...errors?.[row],
																iterms: { ...errors?.[row]?.iterms, composites: e }
															}
														})
												);
										}
									}}
									{zIndex}
									{...fields?.composites?.props?.($LL, node, fieldsArgs?.composites)?.['combobox']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="permissions-sm" {node} {errors} {fields} {row}>
						{#if !fields?.permissions?.hiddenCol?.(args, tab, fieldsArgs?.permissions)}
							<Tr class="hover" let:id {...fields?.permissions?.props?.($LL, node, fieldsArgs?.permissions)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.permissions?.title?.($LL, fieldsArgs?.permissions) || 
											$LL.graphql.objects.Role.fields.permissions.name()}
										required={fields?.permissions?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td errors={errors?.[row]?.iterms?.permissions} {zIndex} {...fields?.permissions?.props?.($LL, node, fieldsArgs?.permissions)?.['td']}>
									{#if node.id}
										<ObjectLink
											bind:value={node.permissions}
											path={`${node.id}/permissions`}
											on:goto
											{...fields?.permissions?.props?.($LL, node, fieldsArgs?.permissions)?.['link']}
										/>
									{:else}
										<PermissionTableDialog
											fieldsPatch={fields?.permissions?.fields?.(node, fieldsArgs?.permissions)}
											bind:value={node.permissions}
											class="btn-link"
											readonly={fields?.permissions?.readonly?.(node, fieldsArgs?.permissions)}
											disabled={fields?.permissions?.disabled?.(node, fieldsArgs?.permissions)}
											on:select={(e) => {
												if (Array.isArray(e.detail.value) || e.detail.value == null) {
													fields?.permissions
														?.onChange?.($LL, e.detail.value, node, fieldsArgs?.permissions)
														.then((next) => (node = next))
														.catch(
															(e) =>
																(errors = {
																	...errors,
																	[row]: {
																		...errors?.[row],
																		iterms: { ...errors?.[row]?.iterms, permissions: e }
																	}
																})
														);
												}
											}}
											{...fields?.permissions?.props?.($LL, node, fieldsArgs?.permissions)?.['dialog']}
										/>
									{/if}
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
										text={fields?.realm?.title?.($LL, fieldsArgs?.realm) || 
											$LL.graphql.objects.Role.fields.realm.name()}
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