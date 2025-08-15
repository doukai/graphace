<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark, Funnel, Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Loading, SearchInput, Table, Td } from '@graphace/ui';
	import { type Option, StringTh, StringTd, BooleanTh, BooleanTd, ObjectLink } from '@graphace/ui-graphql';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import UserFormDialog from '~/lib/components/objects/user/UserFormDialog.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelectTd from '~/lib/components/objects/group/GroupSelectTd.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		UserOrderBy,
		QueryUserListArgs,
		UserInput
	} from '~/lib/types/schema';

	export let value: (UserInput | null | undefined)[] | null | undefined = undefined;
	export let args: QueryUserListArgs = {};
	export let orderBy: UserOrderBy = {};
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
		lastName?: Option | undefined;
		login?: Option | undefined;
		email?: Option | undefined;
		phones?: Option | undefined;
		disable?: Option | undefined;
		groups?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		lastName: { readonly: false, disabled: false, hidden: false },
		login: { readonly: false, disabled: false, hidden: false },
		email: { readonly: false, disabled: false, hidden: false },
		phones: { readonly: false, disabled: false, hidden: false },
		disable: { readonly: false, disabled: false, hidden: false },
		groups: { readonly: false, disabled: false, hidden: false },
		roles: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryUserListArgs; orderBy: UserOrderBy };
		remove: { 
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		unbind: { 
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		edit: { 
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
			row?: number | undefined;
		};
		save: { value: UserInput | (UserInput | null | undefined)[] | null | undefined };
		select: { value: UserInput | (UserInput | null | undefined)[] | null | undefined };
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
			{$LL.graphql.objects.User.name()}
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
				<UserFilter
					bind:value={args}
					let:trigger
					on:filter={(e) => dispatch('query', { args, orderBy })}
				>
					<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
						<button class="btn btn-square" use:melt={trigger}>
							<Icon src={Funnel} class="h-5 w-5" />
						</button>
					</div>
				</UserFilter>
			</div>
		</svelte:fragment>
		{#if showCreateDialog}
			<UserFormDialog
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
			</UserFormDialog>
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
					name={$LL.graphql.objects.User.fields.name.name()}
					bind:value={args.name}
					bind:sort={orderBy.name}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.description?.hidden}
				<StringTh
					name={$LL.graphql.objects.User.fields.description.name()}
					bind:value={args.description}
					bind:sort={orderBy.description}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.lastName?.hidden}
				<StringTh
					name={$LL.graphql.objects.User.fields.lastName.name()}
					bind:value={args.lastName}
					bind:sort={orderBy.lastName}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.login?.hidden}
				<StringTh
					name={$LL.graphql.objects.User.fields.login.name()}
					bind:value={args.login}
					bind:sort={orderBy.login}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.email?.hidden}
				<StringTh
					name={$LL.graphql.objects.User.fields.email.name()}
					bind:value={args.email}
					bind:sort={orderBy.email}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.phones?.hidden}
				<StringTh
					name={$LL.graphql.objects.User.fields.phones.name()}
					bind:value={args.phones}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.disable?.hidden}
				<BooleanTh
					name={$LL.graphql.objects.User.fields.disable.name()}
					bind:value={args.disable}
					bind:sort={orderBy.disable}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.groups?.hidden}
				<GroupTh
					name={$LL.graphql.objects.User.fields.groups.name()}
					bind:value={args.groups}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.roles?.hidden}
				<RoleTh
					name={$LL.graphql.objects.User.fields.roles.name()}
					bind:value={args.roles}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.realm?.hidden}
				<RealmTh
					name={$LL.graphql.objects.User.fields.realm.name()}
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
						<slot name="lastName">
							{#if !fields.lastName?.hidden}
								<StringTd
									name="lastName"
									bind:value={node.lastName}
									on:save={(e) =>
										dispatch('save', {
											value: { lastName: node?.lastName, where: { id: { val: node?.id } } }
										})}
									readonly={fields.lastName?.readonly}
									disabled={fields.lastName?.disabled}
									errors={errors?.[row]?.iterms?.lastName}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="login">
							{#if !fields.login?.hidden}
								<StringTd
									name="login"
									bind:value={node.login}
									on:save={(e) =>
										dispatch('save', {
											value: { login: node?.login, where: { id: { val: node?.id } } }
										})}
									readonly={fields.login?.readonly}
									disabled={fields.login?.disabled}
									errors={errors?.[row]?.iterms?.login}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="email">
							{#if !fields.email?.hidden}
								<StringTd
									name="email"
									bind:value={node.email}
									on:save={(e) =>
										dispatch('save', {
											value: { email: node?.email, where: { id: { val: node?.id } } }
										})}
									readonly={fields.email?.readonly}
									disabled={fields.email?.disabled}
									errors={errors?.[row]?.iterms?.email}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="phones">
							{#if !fields.phones?.hidden}
								<StringTd
									name="phones"
									bind:value={node.phones}
									list
									on:save={(e) =>
										dispatch('save', {
											value: { phones: node?.phones, where: { id: { val: node?.id } } }
										})}
									readonly={fields.phones?.readonly}
									disabled={fields.phones?.disabled}
									errors={errors?.[row]?.iterms?.phones}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="disable">
							{#if !fields.disable?.hidden}
								<BooleanTd
									name="disable"
									bind:value={node.disable}
									on:save={(e) =>
										dispatch('save', {
											value: { disable: node?.disable, where: { id: { val: node?.id } } }
										})}
									readonly={fields.disable?.readonly}
									disabled={fields.disable?.disabled}
									errors={errors?.[row]?.iterms?.disable}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="groups">
							{#if !fields.groups?.hidden}
								<GroupSelectTd
									name="groups"
									bind:value={node.groups}
									list
									errors={errors?.[row]?.iterms?.groups}
									readonly={fields.groups?.readonly}
									disabled={fields.groups?.disabled}
									on:save={(e) =>
										dispatch('save', {
											value: { groups: node?.groups, where: { id: { val: node?.id } } }
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
											name={$LL.graphql.objects.User.fields.realm.name()}
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
									<UserFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</UserFormDialog>
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
										<UserFormDialog
											text={$LL.graphence.components.table.editBtn()}
											class="btn btn-square btn-ghost btn-xs"
											bind:value={node}
											select
											{fields}
										>
											<Icon slot="sm" src={PencilSquare} solid />
											<Icon src={PencilSquare} solid />
										</UserFormDialog>
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
									<td>{$LL.graphql.objects.User.fields.name.name()}</td>
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
									<td>{$LL.graphql.objects.User.fields.description.name()}</td>
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
						<slot name="lastName">
							{#if !fields.lastName?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.User.fields.lastName.name()}</td>
									<StringTd
										name="lastName"
										bind:value={node.lastName}
										on:save={(e) =>
											dispatch('save', {
												value: { lastName: node?.lastName, where: { id: { val: node?.id } } }
											})}
										readonly={fields.lastName?.readonly}
										disabled={fields.lastName?.disabled}
										errors={errors?.[row]?.iterms?.lastName}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="login">
							{#if !fields.login?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.User.fields.login.name()}</td>
									<StringTd
										name="login"
										bind:value={node.login}
										on:save={(e) =>
											dispatch('save', {
												value: { login: node?.login, where: { id: { val: node?.id } } }
											})}
										readonly={fields.login?.readonly}
										disabled={fields.login?.disabled}
										errors={errors?.[row]?.iterms?.login}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="email">
							{#if !fields.email?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.User.fields.email.name()}</td>
									<StringTd
										name="email"
										bind:value={node.email}
										on:save={(e) =>
											dispatch('save', {
												value: { email: node?.email, where: { id: { val: node?.id } } }
											})}
										readonly={fields.email?.readonly}
										disabled={fields.email?.disabled}
										errors={errors?.[row]?.iterms?.email}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="phones">
							{#if !fields.phones?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.User.fields.phones.name()}</td>
									<StringTd
										name="phones"
										bind:value={node.phones}
										list
										on:save={(e) =>
											dispatch('save', {
												value: { phones: node?.phones, where: { id: { val: node?.id } } }
											})}
										readonly={fields.phones?.readonly}
										disabled={fields.phones?.disabled}
										errors={errors?.[row]?.iterms?.phones}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="disable">
							{#if !fields.disable?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.User.fields.disable.name()}</td>
									<BooleanTd
										name="disable"
										bind:value={node.disable}
										on:save={(e) =>
											dispatch('save', {
												value: { disable: node?.disable, where: { id: { val: node?.id } } }
											})}
										readonly={fields.disable?.readonly}
										disabled={fields.disable?.disabled}
										errors={errors?.[row]?.iterms?.disable}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="groups">
							{#if !fields.groups?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.User.fields.groups.name()}</td>
									<GroupSelectTd
										name="groups"
										bind:value={node.groups}
										list
										errors={errors?.[row]?.iterms?.groups}
										readonly={fields.groups?.readonly}
										disabled={fields.groups?.disabled}
										on:save={(e) =>
											dispatch('save', {
												value: { groups: node?.groups, where: { id: { val: node?.id } } }
											})}
										{zIndex}
									/>
							{/if}
						</slot>
						<slot name="roles">
							{#if !fields.roles?.hidden}
								<tr class="hover">
									<td>{$LL.graphql.objects.User.fields.roles.name()}</td>
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
									<td>{$LL.graphql.objects.User.fields.realm.name()}</td>
									<Td errors={errors?.[row]?.iterms?.realm} {zIndex}>
										{#if node.id}
											<ObjectLink
												bind:value={node.realm}
												textFieldName="name"
												path={`${node.id}/realm`}
												name={$LL.graphql.objects.User.fields.realm.name()}
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