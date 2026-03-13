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
	import RealmFilter from '~/lib/components/objects/realm/RealmFilter.svelte';
	import RealmFormDialog from '~/lib/components/objects/realm/RealmFormDialog.svelte';
	import {
		realmTabs,
		realmTab,
		realmTabChange,
		realmFields,
		type RealmFieldsArgs,
		type RealmFields,
		validate,
		validateAll
	} from '~/lib/components/objects/realm/RealmOption';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		RealmOrderBy,
		QueryRealmListArgs,
		RealmInput
	} from '~/lib/types/schema';

	export let value: (RealmInput | null | undefined)[] | null | undefined = undefined;
	export let args: QueryRealmListArgs = {};
	export let orderBy: RealmOrderBy = {};
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
	export let tabs: (($LL: TranslationFunctions, args?: QueryRealmListArgs | undefined) => TabInfo[] | undefined) | undefined = realmTabs;
	export let tab: ((args?: QueryRealmListArgs | undefined) => string | undefined) | undefined = realmTab;
	export let fields: RealmFields | undefined = realmFields;
	export let fieldsPatch: RealmFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: RealmFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryRealmListArgs; orderBy: RealmOrderBy };
		remove: {
			value: RealmInput | (RealmInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		unbind: {
			value: RealmInput | (RealmInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		edit: {
			value: RealmInput | (RealmInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		save: { value: RealmInput | (RealmInput | null | undefined)[] | null | undefined };
		select: {
			value: RealmInput | (RealmInput | null | undefined)[] | null | undefined ;
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
				{$LL.graphql.objects.Realm.name()}
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
					<SearchInput class="max-sm:w-full" on:search />
				{/if}
			</slot>
			<div class="sm:hidden">
				<RealmFilter
					bind:value={args}
					let:trigger
					on:filter={(e) => dispatch('query', { args, orderBy })}
				>
					<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
						<button class="btn btn-square" use:melt={trigger}>
							<Icon src={Funnel} class="h-5 w-5" />
						</button>
					</div>
				</RealmFilter>
			</div>
		</svelte:fragment>
		{#if showCreateDialog}
			<RealmFormDialog
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
			</RealmFormDialog>
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
				realmTabChange(e.detail.value, args, value)
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
				{#if !fields?.name?.hiddenCol?.(args, tab?.(args), fieldsArgs?.name)}
					<StringTh
						name={$LL.graphql.objects.Realm.fields.name.name()}
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
				{#if !fields?.description?.hiddenCol?.(args, tab?.(args), fieldsArgs?.description)}
					<StringTh
						name={$LL.graphql.objects.Realm.fields.description.name()}
						bind:value={args.description}
						bind:sort={orderBy.description}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.description?.required?.()}
						{zIndex}
						{...fields?.description?.props?.($LL, undefined, fieldsArgs?.description)?.['th']}
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
							{#if !fields?.name?.hiddenCol?.(args, tab?.(args), fieldsArgs?.name)}
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
							{#if !fields?.description?.hiddenCol?.(args, tab?.(args), fieldsArgs?.description)}
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
									<RealmFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</RealmFormDialog>
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
									<RealmFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</RealmFormDialog>
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
						{#if !fields?.name?.hiddenCol?.(args, tab?.(args), fieldsArgs?.name)}
							<Tr class="hover" let:id {...fields?.name?.props?.($LL, node, fieldsArgs?.name)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Realm.fields.name.name()}
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
						{#if !fields?.description?.hiddenCol?.(args, tab?.(args), fieldsArgs?.description)}
							<Tr class="hover" let:id {...fields?.description?.props?.($LL, node, fieldsArgs?.description)?.['tr']}>
								<td>
									<Label
										{id}
										text={$LL.graphql.objects.Realm.fields.description.name()}
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
				</tbody>
			{/if}
		{/each}
	{:else}
		<Empty />
	{/if}
</Table>
<slot name="table-bottom" />