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
	import { StringTh, StringInput, BooleanTh, BooleanInput, ObjectLink } from '@graphace/ui-graphql';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import UserFormDialog from '~/lib/components/objects/user/UserFormDialog.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		userTabs,
		userTab,
		userTabChange,
		userFields,
		type UserFields,
		type UserFieldsArgs,
		validateAll
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
	export let showFilter: boolean = false;
	export let title: string | undefined = undefined;
	export let zIndex: number = 0;
	let className: string | undefined = '[&_[data-part=table]]:table-pin-rows [&_[data-part=table]]:table-pin-cols [&_[data-element=td]]:max-w-64';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryUserListArgs | undefined) => TabInfo[] | undefined) | undefined = userTabs;
	export let tab: string | undefined = userTab?.(args);
	export let fields: UserFields | undefined = userFields;
	export let fieldsPatch: UserFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: UserFieldsArgs | undefined = undefined;

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
		class="flex space-x-1 justify-end max-sm:w-full"
		{zIndex}
		on:save={(e) =>
			validateAll($LL, value)
				.then((value) => dispatch('save', { value }))
				.catch((e) => (errors = e))}
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
			<slot name="search">
				{#if showSearchInput}
					<SearchInput class="max-sm:w-full max-sm:[&_[data-part=input]]:w-full" on:search />
				{/if}
			</slot>
			{#if showFilter}
				<div class="sm:hidden">
					<UserFilter
						bind:value={args}
						bind:orderBy
						on:filter={(e) => dispatch('query', { args, orderBy })}
					/>
				</div>
			{/if}
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
		bind:value={tab}
		tabs={tabs?.($LL, args)}
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				userTabChange(e.detail.value, args, value)
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
			<slot name="name-th" {args} {orderBy} {fields}>
				{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
					<StringTh
						name={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.User.fields.name.name()}
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
						name={fields?.description?.title?.($LL, fieldsArgs?.description) || $LL.graphql.objects.User.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{zIndex}
						{...fields?.description?.props?.($LL, undefined, fieldsArgs?.description)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="lastName-th" {args} {orderBy} {fields}>
				{#if !fields?.lastName?.hiddenCol?.(args, tab, fieldsArgs?.lastName)}
					<StringTh
						name={fields?.lastName?.title?.($LL, fieldsArgs?.lastName) || $LL.graphql.objects.User.fields.lastName.name()}
						bind:value={args.lastName}
						bind:sort={orderBy.lastName}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.lastName?.required?.()}
						{zIndex}
						{...fields?.lastName?.props?.($LL, undefined, fieldsArgs?.lastName)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="login-th" {args} {orderBy} {fields}>
				{#if !fields?.login?.hiddenCol?.(args, tab, fieldsArgs?.login)}
					<StringTh
						name={fields?.login?.title?.($LL, fieldsArgs?.login) || $LL.graphql.objects.User.fields.login.name()}
						bind:value={args.login}
						bind:sort={orderBy.login}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.login?.required?.()}
						{zIndex}
						{...fields?.login?.props?.($LL, undefined, fieldsArgs?.login)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="email-th" {args} {orderBy} {fields}>
				{#if !fields?.email?.hiddenCol?.(args, tab, fieldsArgs?.email)}
					<StringTh
						name={fields?.email?.title?.($LL, fieldsArgs?.email) || $LL.graphql.objects.User.fields.email.name()}
						bind:value={args.email}
						bind:sort={orderBy.email}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.email?.required?.()}
						{zIndex}
						{...fields?.email?.props?.($LL, undefined, fieldsArgs?.email)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="phones-th" {args} {orderBy} {fields}>
				{#if !fields?.phones?.hiddenCol?.(args, tab, fieldsArgs?.phones)}
					<StringTh
						name={fields?.phones?.title?.($LL, fieldsArgs?.phones) || $LL.graphql.objects.User.fields.phones.name()}
						bind:value={args.phones}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.phones?.required?.()}
						{zIndex}
						{...fields?.phones?.props?.($LL, undefined, fieldsArgs?.phones)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="disable-th" {args} {orderBy} {fields}>
				{#if !fields?.disable?.hiddenCol?.(args, tab, fieldsArgs?.disable)}
					<BooleanTh
						name={fields?.disable?.title?.($LL, fieldsArgs?.disable) || $LL.graphql.objects.User.fields.disable.name()}
						bind:value={args.disable}
						bind:sort={orderBy.disable}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.disable?.required?.()}
						{zIndex}
						{...fields?.disable?.props?.($LL, undefined, fieldsArgs?.disable)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="groups-th" {args} {orderBy} {fields}>
				{#if !fields?.groups?.hiddenCol?.(args, tab, fieldsArgs?.groups)}
					<GroupTh
						name={fields?.groups?.title?.($LL, fieldsArgs?.groups) || $LL.graphql.objects.User.fields.groups.name()}
						bind:value={args.groups}
						bind:orderBy={orderBy.groups}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.groups?.required?.()}
						{zIndex}
						{...fields?.groups?.props?.($LL, undefined, fieldsArgs?.groups)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="roles-th" {args} {orderBy} {fields}>
				{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
					<RoleTh
						name={fields?.roles?.title?.($LL, fieldsArgs?.roles) || $LL.graphql.objects.User.fields.roles.name()}
						bind:value={args.roles}
						bind:orderBy={orderBy.roles}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.roles?.required?.()}
						{zIndex}
						{...fields?.roles?.props?.($LL, undefined, fieldsArgs?.roles)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="realm-th" {args} {orderBy} {fields}>
				{#if !fields?.realm?.hiddenCol?.(args, tab, fieldsArgs?.realm)}
					<RealmTh
						name={fields?.realm?.title?.($LL, fieldsArgs?.realm) || $LL.graphql.objects.User.fields.realm.name()}
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
						<slot name="name" {node} {errors} {fields} {row}>
							{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
								<Td {zIndex} {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['td']}>
									<StringInput
										name="name"
										bind:value={node.name}
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
										{...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="description" {node} {errors} {fields} {row}>
							{#if !fields?.description?.hiddenCol?.(args, tab, fieldsArgs?.description)}
								<Td {zIndex} {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['td']}>
									<StringInput
										name="description"
										bind:value={node.description}
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
										{...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="lastName" {node} {errors} {fields} {row}>
							{#if !fields?.lastName?.hiddenCol?.(args, tab, fieldsArgs?.lastName)}
								<Td {zIndex} {...fields?.lastName?.props?.($LL, node, fieldsArgs?.lastName)?.['td']}>
									<StringInput
										name="lastName"
										bind:value={node.lastName}
										readonly={fields?.lastName?.readonly?.(node, fieldsArgs?.lastName)}
										disabled={fields?.lastName?.disabled?.(node, fieldsArgs?.lastName)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.lastName
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.lastName)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, lastName: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.lastName}
										{...fields?.lastName?.props?.($LL, node, fieldsArgs?.lastName)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="login" {node} {errors} {fields} {row}>
							{#if !fields?.login?.hiddenCol?.(args, tab, fieldsArgs?.login)}
								<Td {zIndex} {...fields?.login?.props?.($LL, node, fieldsArgs?.login)?.['td']}>
									<StringInput
										name="login"
										bind:value={node.login}
										readonly={fields?.login?.readonly?.(node, fieldsArgs?.login)}
										disabled={fields?.login?.disabled?.(node, fieldsArgs?.login)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.login
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.login)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, login: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.login}
										{...fields?.login?.props?.($LL, node, fieldsArgs?.login)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="email" {node} {errors} {fields} {row}>
							{#if !fields?.email?.hiddenCol?.(args, tab, fieldsArgs?.email)}
								<Td {zIndex} {...fields?.email?.props?.($LL, node, fieldsArgs?.email)?.['td']}>
									<StringInput
										name="email"
										bind:value={node.email}
										readonly={fields?.email?.readonly?.(node, fieldsArgs?.email)}
										disabled={fields?.email?.disabled?.(node, fieldsArgs?.email)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.email
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.email)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, email: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.email}
										{...fields?.email?.props?.($LL, node, fieldsArgs?.email)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="phones" {node} {errors} {fields} {row}>
							{#if !fields?.phones?.hiddenCol?.(args, tab, fieldsArgs?.phones)}
								<Td {zIndex} {...fields?.phones?.props?.($LL, node, fieldsArgs?.phones)?.['td']}>
									<StringInput
										name="phones"
										bind:value={node.phones}
										list
										readonly={fields?.phones?.readonly?.(node, fieldsArgs?.phones)}
										disabled={fields?.phones?.disabled?.(node, fieldsArgs?.phones)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.phones
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.phones)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, phones: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.phones}
										{...fields?.phones?.props?.($LL, node, fieldsArgs?.phones)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="disable" {node} {errors} {fields} {row}>
							{#if !fields?.disable?.hiddenCol?.(args, tab, fieldsArgs?.disable)}
								<Td {zIndex} {...fields?.disable?.props?.($LL, node, fieldsArgs?.disable)?.['td']}>
									<BooleanInput
										name="disable"
										bind:value={node.disable}
										readonly={fields?.disable?.readonly?.(node, fieldsArgs?.disable)}
										disabled={fields?.disable?.disabled?.(node, fieldsArgs?.disable)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.disable
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.disable)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, disable: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.disable}
										{...fields?.disable?.props?.($LL, node, fieldsArgs?.disable)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="groups" {node} {errors} {fields} {row}>
							{#if !fields?.groups?.hiddenCol?.(args, tab, fieldsArgs?.groups)}
								<Td {zIndex} {...fields?.groups?.props?.($LL, node, fieldsArgs?.groups)?.['td']}>
									<GroupSelect
										name="groups"
										bind:value={node.groups}
										list
										errors={errors?.[row]?.iterms?.groups}
										readonly={fields?.groups?.readonly?.(node, fieldsArgs?.groups)}
										disabled={fields?.groups?.disabled?.(node, fieldsArgs?.groups)}
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
										{...fields?.groups?.props?.($LL, node, fieldsArgs?.groups)?.['combobox']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="roles" {node} {errors} {fields} {row}>
							{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
								<Td {zIndex} {...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['td']}>
									<RoleSelect
										name="roles"
										bind:value={node.roles}
										list
										errors={errors?.[row]?.iterms?.roles}
										readonly={fields?.roles?.readonly?.(node, fieldsArgs?.roles)}
										disabled={fields?.roles?.disabled?.(node, fieldsArgs?.roles)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.roles
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.roles)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, roles: e }
																}
															})
													);
											}
										}}
										{...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['combobox']}
									/>
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
				<thead>
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
					<slot name="name-sm" {node} {errors} {fields} {row}>
						{#if !fields?.name?.hiddenCol?.(args, tab, fieldsArgs?.name)}
							<Tr class="hover" let:id {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.User.fields.name.name()}
										required={fields?.name?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['td']}>
									<StringInput
										{id}
										name="name"
										bind:value={node.name}
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
										{...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="description-sm" {node} {errors} {fields} {row}>
						{#if !fields?.description?.hiddenCol?.(args, tab, fieldsArgs?.description)}
							<Tr class="hover" let:id {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.description?.title?.($LL, fieldsArgs?.description) || $LL.graphql.objects.User.fields.description.name()}
										required={fields?.description?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['td']}>
									<StringInput
										{id}
										name="description"
										bind:value={node.description}
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
										{...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="lastName-sm" {node} {errors} {fields} {row}>
						{#if !fields?.lastName?.hiddenCol?.(args, tab, fieldsArgs?.lastName)}
							<Tr class="hover" let:id {...fields?.lastName?.props?.($LL, node, fieldsArgs?.lastName)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.lastName?.title?.($LL, fieldsArgs?.lastName) || $LL.graphql.objects.User.fields.lastName.name()}
										required={fields?.lastName?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.lastName?.props?.($LL, node, fieldsArgs?.lastName)?.['td']}>
									<StringInput
										{id}
										name="lastName"
										bind:value={node.lastName}
										readonly={fields?.lastName?.readonly?.(node, fieldsArgs?.lastName)}
										disabled={fields?.lastName?.disabled?.(node, fieldsArgs?.lastName)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.lastName
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.lastName)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, lastName: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.lastName}
										{...fields?.lastName?.props?.($LL, node, fieldsArgs?.lastName)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="login-sm" {node} {errors} {fields} {row}>
						{#if !fields?.login?.hiddenCol?.(args, tab, fieldsArgs?.login)}
							<Tr class="hover" let:id {...fields?.login?.props?.($LL, node, fieldsArgs?.login)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.login?.title?.($LL, fieldsArgs?.login) || $LL.graphql.objects.User.fields.login.name()}
										required={fields?.login?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.login?.props?.($LL, node, fieldsArgs?.login)?.['td']}>
									<StringInput
										{id}
										name="login"
										bind:value={node.login}
										readonly={fields?.login?.readonly?.(node, fieldsArgs?.login)}
										disabled={fields?.login?.disabled?.(node, fieldsArgs?.login)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.login
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.login)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, login: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.login}
										{...fields?.login?.props?.($LL, node, fieldsArgs?.login)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="email-sm" {node} {errors} {fields} {row}>
						{#if !fields?.email?.hiddenCol?.(args, tab, fieldsArgs?.email)}
							<Tr class="hover" let:id {...fields?.email?.props?.($LL, node, fieldsArgs?.email)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.email?.title?.($LL, fieldsArgs?.email) || $LL.graphql.objects.User.fields.email.name()}
										required={fields?.email?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.email?.props?.($LL, node, fieldsArgs?.email)?.['td']}>
									<StringInput
										{id}
										name="email"
										bind:value={node.email}
										readonly={fields?.email?.readonly?.(node, fieldsArgs?.email)}
										disabled={fields?.email?.disabled?.(node, fieldsArgs?.email)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.email
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.email)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, email: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.email}
										{...fields?.email?.props?.($LL, node, fieldsArgs?.email)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="phones-sm" {node} {errors} {fields} {row}>
						{#if !fields?.phones?.hiddenCol?.(args, tab, fieldsArgs?.phones)}
							<Tr class="hover" let:id {...fields?.phones?.props?.($LL, node, fieldsArgs?.phones)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.phones?.title?.($LL, fieldsArgs?.phones) || $LL.graphql.objects.User.fields.phones.name()}
										required={fields?.phones?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.phones?.props?.($LL, node, fieldsArgs?.phones)?.['td']}>
									<StringInput
										{id}
										name="phones"
										bind:value={node.phones}
										list
										readonly={fields?.phones?.readonly?.(node, fieldsArgs?.phones)}
										disabled={fields?.phones?.disabled?.(node, fieldsArgs?.phones)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.phones
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.phones)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, phones: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.phones}
										{...fields?.phones?.props?.($LL, node, fieldsArgs?.phones)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="disable-sm" {node} {errors} {fields} {row}>
						{#if !fields?.disable?.hiddenCol?.(args, tab, fieldsArgs?.disable)}
							<Tr class="hover" let:id {...fields?.disable?.props?.($LL, node, fieldsArgs?.disable)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.disable?.title?.($LL, fieldsArgs?.disable) || $LL.graphql.objects.User.fields.disable.name()}
										required={fields?.disable?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.disable?.props?.($LL, node, fieldsArgs?.disable)?.['td']}>
									<BooleanInput
										{id}
										name="disable"
										bind:value={node.disable}
										readonly={fields?.disable?.readonly?.(node, fieldsArgs?.disable)}
										disabled={fields?.disable?.disabled?.(node, fieldsArgs?.disable)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.disable
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.disable)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, disable: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.disable}
										{...fields?.disable?.props?.($LL, node, fieldsArgs?.disable)?.['input']}
									/>
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
										text={fields?.groups?.title?.($LL, fieldsArgs?.groups) || $LL.graphql.objects.User.fields.groups.name()}
										required={fields?.groups?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.groups?.props?.($LL, node, fieldsArgs?.groups)?.['td']}>
									<GroupSelect
										{id}
										name="groups"
										bind:value={node.groups}
										list
										errors={errors?.[row]?.iterms?.groups}
										readonly={fields?.groups?.readonly?.(node, fieldsArgs?.groups)}
										disabled={fields?.groups?.disabled?.(node, fieldsArgs?.groups)}
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
										{...fields?.groups?.props?.($LL, node, fieldsArgs?.groups)?.['combobox']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="roles-sm" {node} {errors} {fields} {row}>
						{#if !fields?.roles?.hiddenCol?.(args, tab, fieldsArgs?.roles)}
							<Tr class="hover" let:id {...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.roles?.title?.($LL, fieldsArgs?.roles) || $LL.graphql.objects.User.fields.roles.name()}
										required={fields?.roles?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['td']}>
									<RoleSelect
										{id}
										name="roles"
										bind:value={node.roles}
										list
										errors={errors?.[row]?.iterms?.roles}
										readonly={fields?.roles?.readonly?.(node, fieldsArgs?.roles)}
										disabled={fields?.roles?.disabled?.(node, fieldsArgs?.roles)}
										on:change={(e) => {
											if (Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.roles
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.roles)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, roles: e }
																}
															})
													);
											}
										}}
										{...fields?.roles?.props?.($LL, node, fieldsArgs?.roles)?.['combobox']}
									/>
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
										text={fields?.realm?.title?.($LL, fieldsArgs?.realm) || $LL.graphql.objects.User.fields.realm.name()}
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