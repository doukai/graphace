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
	import { StringTh, StringTd, BooleanTh, BooleanTd, ObjectLink } from '@graphace/ui-graphql';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import UserFormDialog from '~/lib/components/objects/user/UserFormDialog.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelectTd from '~/lib/components/objects/group/GroupSelectTd.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		userTabs,
		userTab,
		userTabChange,
		userFields,
		type UserFields
	} from '~/lib/components/objects/user/UserOption';
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
	let className: string | undefined = '[&_[data-part=table]]:table-pin-rows [&_[data-part=table]]:table-pin-cols';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryUserListArgs | undefined) => TabInfo[] | undefined) | undefined = userTabs;
	export let tab: ((args?: QueryUserListArgs | undefined) => string | undefined) | undefined = userTab;
	export let fields: UserFields | undefined = userFields;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryUserListArgs; orderBy: UserOrderBy };
		remove: {
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		unbind: {
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		edit: {
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		save: { value: UserInput | (UserInput | null | undefined)[] | null | undefined };
		select: {
			value: UserInput | (UserInput | null | undefined)[] | null | undefined ;
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
				resolve: (data: (UserInput | null | undefined)[] | null | undefined) => void,
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

	const validateRow = async (value: UserInput) => {
		const errors: Record<string, Errors> = {};
		const nameErrors = await fields?.name?.validate?.(value);
		if (nameErrors && nameErrors.length > 0) {
			errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
		}
		const descriptionErrors = await fields?.description?.validate?.(value);
		if (descriptionErrors && descriptionErrors.length > 0) {
			errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
		}
		const lastNameErrors = await fields?.lastName?.validate?.(value);
		if (lastNameErrors && lastNameErrors.length > 0) {
			errors['lastName'] = { errors: lastNameErrors.map((message) => ({ message })) };
		}
		const loginErrors = await fields?.login?.validate?.(value);
		if (loginErrors && loginErrors.length > 0) {
			errors['login'] = { errors: loginErrors.map((message) => ({ message })) };
		}
		const emailErrors = await fields?.email?.validate?.(value);
		if (emailErrors && emailErrors.length > 0) {
			errors['email'] = { errors: emailErrors.map((message) => ({ message })) };
		}
		const phonesErrors = await fields?.phones?.validate?.(value);
		if (phonesErrors && phonesErrors.length > 0) {
			errors['phones'] = { errors: phonesErrors.map((message) => ({ message })) };
		}
		const disableErrors = await fields?.disable?.validate?.(value);
		if (disableErrors && disableErrors.length > 0) {
			errors['disable'] = { errors: disableErrors.map((message) => ({ message })) };
		}
		const groupsErrors = await fields?.groups?.validate?.(value);
		if (groupsErrors && groupsErrors.length > 0) {
			errors['groups'] = { errors: groupsErrors.map((message) => ({ message })) };
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
				{$LL.graphql.objects.User.name()}
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
<div class="divider my-0" />
{#if tabs?.($LL, args)}
	<Tabs
		value={tab?.(args)}
		tabs={tabs?.($LL, args)}
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				userTabChange(e.detail.value, args).then((args) => {
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
						name={$LL.graphql.objects.User.fields.name.name()}
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
						name={$LL.graphql.objects.User.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{zIndex}
						{...fields?.description?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="lastName-th" {args} {orderBy} {fields}>
				{#if !fields?.lastName?.hiddenCol?.(args, tab?.(args))}
					<StringTh
						name={$LL.graphql.objects.User.fields.lastName.name()}
						bind:value={args.lastName}
						bind:sort={orderBy.lastName}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.lastName?.required?.()}
						{zIndex}
						{...fields?.lastName?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="login-th" {args} {orderBy} {fields}>
				{#if !fields?.login?.hiddenCol?.(args, tab?.(args))}
					<StringTh
						name={$LL.graphql.objects.User.fields.login.name()}
						bind:value={args.login}
						bind:sort={orderBy.login}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.login?.required?.()}
						{zIndex}
						{...fields?.login?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="email-th" {args} {orderBy} {fields}>
				{#if !fields?.email?.hiddenCol?.(args, tab?.(args))}
					<StringTh
						name={$LL.graphql.objects.User.fields.email.name()}
						bind:value={args.email}
						bind:sort={orderBy.email}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.email?.required?.()}
						{zIndex}
						{...fields?.email?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="phones-th" {args} {orderBy} {fields}>
				{#if !fields?.phones?.hiddenCol?.(args, tab?.(args))}
					<StringTh
						name={$LL.graphql.objects.User.fields.phones.name()}
						bind:value={args.phones}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.phones?.required?.()}
						{zIndex}
						{...fields?.phones?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="disable-th" {args} {orderBy} {fields}>
				{#if !fields?.disable?.hiddenCol?.(args, tab?.(args))}
					<BooleanTh
						name={$LL.graphql.objects.User.fields.disable.name()}
						bind:value={args.disable}
						bind:sort={orderBy.disable}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.disable?.required?.()}
						{zIndex}
						{...fields?.disable?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="groups-th" {args} {orderBy} {fields}>
				{#if !fields?.groups?.hiddenCol?.(args, tab?.(args))}
					<GroupTh
						name={$LL.graphql.objects.User.fields.groups.name()}
						bind:value={args.groups}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.groups?.required?.()}
						{zIndex}
						{...fields?.groups?.props?.()?.['th']}
					/>
				{/if}
			</slot>
			<slot name="roles-th" {args} {orderBy} {fields}>
				{#if !fields?.roles?.hiddenCol?.(args, tab?.(args))}
					<RoleTh
						name={$LL.graphql.objects.User.fields.roles.name()}
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
						name={$LL.graphql.objects.User.fields.realm.name()}
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
						<slot name="lastName" {node} {errors} {fields} {row}>
							{#if !fields?.lastName?.hiddenCol?.(args, tab?.(args))}
								<StringTd
									name="lastName"
									bind:value={node.lastName}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { lastName: node?.lastName, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.lastName?.readonly?.(node)}
									disabled={fields?.lastName?.disabled?.(node)}
									on:change={(e) => fields?.lastName?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.lastName}
									{zIndex}
									{...fields?.lastName?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="login" {node} {errors} {fields} {row}>
							{#if !fields?.login?.hiddenCol?.(args, tab?.(args))}
								<StringTd
									name="login"
									bind:value={node.login}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { login: node?.login, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.login?.readonly?.(node)}
									disabled={fields?.login?.disabled?.(node)}
									on:change={(e) => fields?.login?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.login}
									{zIndex}
									{...fields?.login?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="email" {node} {errors} {fields} {row}>
							{#if !fields?.email?.hiddenCol?.(args, tab?.(args))}
								<StringTd
									name="email"
									bind:value={node.email}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { email: node?.email, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.email?.readonly?.(node)}
									disabled={fields?.email?.disabled?.(node)}
									on:change={(e) => fields?.email?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.email}
									{zIndex}
									{...fields?.email?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="phones" {node} {errors} {fields} {row}>
							{#if !fields?.phones?.hiddenCol?.(args, tab?.(args))}
								<StringTd
									name="phones"
									bind:value={node.phones}
									list
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { phones: node?.phones, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.phones?.readonly?.(node)}
									disabled={fields?.phones?.disabled?.(node)}
									on:change={(e) => fields?.phones?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.phones}
									{zIndex}
									{...fields?.phones?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="disable" {node} {errors} {fields} {row}>
							{#if !fields?.disable?.hiddenCol?.(args, tab?.(args))}
								<BooleanTd
									name="disable"
									bind:value={node.disable}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { disable: node?.disable, where: { id: { val: node?.id } } }
											})
										)}
									readonly={fields?.disable?.readonly?.(node)}
									disabled={fields?.disable?.disabled?.(node)}
									on:change={(e) => fields?.disable?.onChange?.(e.detail.value, node).then((next) => node = next)}
									errors={errors?.[row]?.iterms?.disable}
									{zIndex}
									{...fields?.disable?.props?.(node)?.['td']}
								/>
							{/if}
						</slot>
						<slot name="groups" {node} {errors} {fields} {row}>
							{#if !fields?.groups?.hiddenCol?.(args, tab?.(args))}
								<GroupSelectTd
									name="groups"
									bind:value={node.groups}
									list
									errors={errors?.[row]?.iterms?.groups}
									readonly={fields?.groups?.readonly?.(node)}
									disabled={fields?.groups?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { groups: node?.groups, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.groups?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.groups?.props?.(node)?.['td']}
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
				<tbody class="border">
					<slot name="name-sm" {node} {errors} {fields} {row}>
						{#if !fields?.name?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.name?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.User.fields.name.name()}
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
										text={$LL.graphql.objects.User.fields.description.name()}
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
					<slot name="lastName-sm" {node} {errors} {fields} {row}>
						{#if !fields?.lastName?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.lastName?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.User.fields.lastName.name()}
										required={fields?.lastName?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="lastName"
									bind:value={node.lastName}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { lastName: node?.lastName, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.lastName?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.lastName?.readonly?.(node)}
									disabled={fields?.lastName?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.lastName}
									{zIndex}
									{...fields?.lastName?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="login-sm" {node} {errors} {fields} {row}>
						{#if !fields?.login?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.login?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.User.fields.login.name()}
										required={fields?.login?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="login"
									bind:value={node.login}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { login: node?.login, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.login?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.login?.readonly?.(node)}
									disabled={fields?.login?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.login}
									{zIndex}
									{...fields?.login?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="email-sm" {node} {errors} {fields} {row}>
						{#if !fields?.email?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.email?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.User.fields.email.name()}
										required={fields?.email?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="email"
									bind:value={node.email}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { email: node?.email, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.email?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.email?.readonly?.(node)}
									disabled={fields?.email?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.email}
									{zIndex}
									{...fields?.email?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="phones-sm" {node} {errors} {fields} {row}>
						{#if !fields?.phones?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.phones?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.User.fields.phones.name()}
										required={fields?.phones?.required?.(node)}
										class="truncate"
									/>
								</td>
								<StringTd
									{id}
									name="phones"
									bind:value={node.phones}
									list
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { phones: node?.phones, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.phones?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.phones?.readonly?.(node)}
									disabled={fields?.phones?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.phones}
									{zIndex}
									{...fields?.phones?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="disable-sm" {node} {errors} {fields} {row}>
						{#if !fields?.disable?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.disable?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.User.fields.disable.name()}
										required={fields?.disable?.required?.(node)}
										class="truncate"
									/>
								</td>
								<BooleanTd
									{id}
									name="disable"
									bind:value={node.disable}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { disable: node?.disable, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.disable?.onChange?.(e.detail.value, node).then((next) => node = next)}
									readonly={fields?.disable?.readonly?.(node)}
									disabled={fields?.disable?.disabled?.(node)}
									errors={errors?.[row]?.iterms?.disable}
									{zIndex}
									{...fields?.disable?.props?.(node)?.['td']}
								/>
							</Tr>
						{/if}
					</slot>
					<slot name="groups-sm" {node} {errors} {fields} {row}>
						{#if !fields?.groups?.hiddenCol?.(args, tab?.(args))}
							<Tr class="hover" let:id {...fields?.groups?.props?.(node)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.User.fields.groups.name()}
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
									readonly={fields?.groups?.readonly?.(node)}
									disabled={fields?.groups?.disabled?.(node)}
									on:save={(e) =>
										validate().then(() =>
											dispatch('save', {
												value: { groups: node?.groups, where: { id: { val: node?.id } } }
											})
										)}
									on:change={(e) => fields?.groups?.onChange?.(e.detail.value, node).then((next) => node = next)}
									{zIndex}
									{...fields?.groups?.props?.(node)?.['td']}
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
										text={$LL.graphql.objects.User.fields.roles.name()}
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
										text={$LL.graphql.objects.User.fields.realm.name()}
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