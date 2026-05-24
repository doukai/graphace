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
	import { StringTh, StringInput, IntTh, IntInput, ObjectLink } from '@graphace/ui-graphql';
	import FileFilter from '~/lib/components/objects/file/FileFilter.svelte';
	import FileFormDialog from '~/lib/components/objects/file/FileFormDialog.svelte';
	import {
		fileTabs,
		fileTab,
		fileTabChange,
		fileFields,
		type FileFields,
		type FileFieldsArgs,
		validateAll
	} from '~/lib/components/objects/file/FileOption';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		FileOrderBy,
		QueryFileListArgs,
		FileInput
	} from '~/lib/types/schema';

	export let value: (FileInput | null | undefined)[] | null | undefined = undefined;
	export let args: QueryFileListArgs = {};
	export let orderBy: FileOrderBy = {};
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
	let className: string | undefined = '[&_[data-part=table]]:table-pin-rows [&_[data-part=table]]:table-pin-cols [&_[data-element=td]]:min-w-64';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryFileListArgs | undefined) => TabInfo[] | undefined) | undefined = fileTabs;
	export let tab: string | undefined = fileTab?.(args);
	export let fields: FileFields | undefined = fileFields;
	export let fieldsPatch: FileFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: FileFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryFileListArgs; orderBy: FileOrderBy };
		remove: {
			value: FileInput | (FileInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		unbind: {
			value: FileInput | (FileInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		edit: {
			value: FileInput | (FileInput | null | undefined)[] | null | undefined;
			row?: number[] | number | undefined;
		};
		save: { value: FileInput | (FileInput | null | undefined)[] | null | undefined };
		select: {
			value: FileInput | (FileInput | null | undefined)[] | null | undefined ;
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
				{$LL.graphql.objects.File.name()}
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
					fileTabChange(e.detail.value, args, value)
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
					<FileFilter
						bind:value={args}
						bind:orderBy
						on:filter={(e) => dispatch('query', { args, orderBy })}
					/>
				</div>
			{/if}
		</svelte:fragment>
		{#if showCreateDialog}
			<FileFormDialog
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
			</FileFormDialog>
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
				fileTabChange(e.detail.value, args, value)
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
						name={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.File.fields.name.name()}
						bind:value={args.name}
						bind:sort={orderBy.name}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.name?.required?.()}
						{zIndex}
						{...fields?.name?.props?.($LL, undefined, fieldsArgs?.name)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="contentType-th" {args} {orderBy} {fields}>
				{#if !fields?.contentType?.hiddenCol?.(args, tab, fieldsArgs?.contentType)}
					<StringTh
						name={fields?.contentType?.title?.($LL, fieldsArgs?.contentType) || $LL.graphql.objects.File.fields.contentType.name()}
						bind:value={args.contentType}
						bind:sort={orderBy.contentType}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.contentType?.required?.()}
						{zIndex}
						{...fields?.contentType?.props?.($LL, undefined, fieldsArgs?.contentType)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="contentLength-th" {args} {orderBy} {fields}>
				{#if !fields?.contentLength?.hiddenCol?.(args, tab, fieldsArgs?.contentLength)}
					<IntTh
						name={fields?.contentLength?.title?.($LL, fieldsArgs?.contentLength) || $LL.graphql.objects.File.fields.contentLength.name()}
						bind:value={args.contentLength}
						bind:sort={orderBy.contentLength}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.contentLength?.required?.()}
						{zIndex}
						{...fields?.contentLength?.props?.($LL, undefined, fieldsArgs?.contentLength)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="content-th" {args} {orderBy} {fields}>
				{#if !fields?.content?.hiddenCol?.(args, tab, fieldsArgs?.content)}
					<StringTh
						name={fields?.content?.title?.($LL, fieldsArgs?.content) || $LL.graphql.objects.File.fields.content.name()}
						bind:value={args.content}
						bind:sort={orderBy.content}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.content?.required?.()}
						{zIndex}
						{...fields?.content?.props?.($LL, undefined, fieldsArgs?.content)?.['th']}
					/>
				{/if}
			</slot>
			<slot name="url-th" {args} {orderBy} {fields}>
				{#if !fields?.url?.hiddenCol?.(args, tab, fieldsArgs?.url)}
					<StringTh
						name={fields?.url?.title?.($LL, fieldsArgs?.url) || $LL.graphql.objects.File.fields.url.name()}
						bind:value={args.url}
						bind:sort={orderBy.url}
						on:filter={(e) => dispatch('query', { args, orderBy })}
						required={fields?.url?.required?.()}
						{zIndex}
						{...fields?.url?.props?.($LL, undefined, fieldsArgs?.url)?.['th']}
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
						<slot name="contentType" {node} {errors} {fields} {row}>
							{#if !fields?.contentType?.hiddenCol?.(args, tab, fieldsArgs?.contentType)}
								<Td {zIndex} {...fields?.contentType?.props?.($LL, node, fieldsArgs?.contentType)?.['td']}>
									<StringInput
										name="contentType"
										bind:value={node.contentType}
										readonly={fields?.contentType?.readonly?.(node, fieldsArgs?.contentType)}
										disabled={fields?.contentType?.disabled?.(node, fieldsArgs?.contentType)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.contentType
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.contentType)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, contentType: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.contentType}
										{...fields?.contentType?.props?.($LL, node, fieldsArgs?.contentType)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="contentLength" {node} {errors} {fields} {row}>
							{#if !fields?.contentLength?.hiddenCol?.(args, tab, fieldsArgs?.contentLength)}
								<Td {zIndex} {...fields?.contentLength?.props?.($LL, node, fieldsArgs?.contentLength)?.['td']}>
									<IntInput
										name="contentLength"
										bind:value={node.contentLength}
										readonly={fields?.contentLength?.readonly?.(node, fieldsArgs?.contentLength)}
										disabled={fields?.contentLength?.disabled?.(node, fieldsArgs?.contentLength)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.contentLength
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.contentLength)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, contentLength: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.contentLength}
										{...fields?.contentLength?.props?.($LL, node, fieldsArgs?.contentLength)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="content" {node} {errors} {fields} {row}>
							{#if !fields?.content?.hiddenCol?.(args, tab, fieldsArgs?.content)}
								<Td {zIndex} {...fields?.content?.props?.($LL, node, fieldsArgs?.content)?.['td']}>
									<StringInput
										name="content"
										bind:value={node.content}
										readonly={fields?.content?.readonly?.(node, fieldsArgs?.content)}
										disabled={fields?.content?.disabled?.(node, fieldsArgs?.content)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.content
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.content)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, content: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.content}
										{...fields?.content?.props?.($LL, node, fieldsArgs?.content)?.['input']}
									/>
								</Td>
							{/if}
						</slot>
						<slot name="url" {node} {errors} {fields} {row}>
							{#if !fields?.url?.hiddenCol?.(args, tab, fieldsArgs?.url)}
								<Td {zIndex} {...fields?.url?.props?.($LL, node, fieldsArgs?.url)?.['td']}>
									<StringInput
										name="url"
										bind:value={node.url}
										readonly={fields?.url?.readonly?.(node, fieldsArgs?.url)}
										disabled={fields?.url?.disabled?.(node, fieldsArgs?.url)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.url
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.url)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, url: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.url}
										{...fields?.url?.props?.($LL, node, fieldsArgs?.url)?.['input']}
									/>
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
									<FileFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</FileFormDialog>
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
									<FileFormDialog
										text={$LL.graphence.components.table.editBtn()}
										class="btn btn-square btn-ghost btn-xs"
										bind:value={node}
										select
										{fields}
									>
										<Icon slot="sm" src={PencilSquare} solid />
										<Icon src={PencilSquare} solid />
									</FileFormDialog>
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
										text={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.File.fields.name.name()}
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
					<slot name="contentType-sm" {node} {errors} {fields} {row}>
						{#if !fields?.contentType?.hiddenCol?.(args, tab, fieldsArgs?.contentType)}
							<Tr class="hover" let:id {...fields?.contentType?.props?.($LL, node, fieldsArgs?.contentType)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.contentType?.title?.($LL, fieldsArgs?.contentType) || $LL.graphql.objects.File.fields.contentType.name()}
										required={fields?.contentType?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.contentType?.props?.($LL, node, fieldsArgs?.contentType)?.['td']}>
									<StringInput
										{id}
										name="contentType"
										bind:value={node.contentType}
										readonly={fields?.contentType?.readonly?.(node, fieldsArgs?.contentType)}
										disabled={fields?.contentType?.disabled?.(node, fieldsArgs?.contentType)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.contentType
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.contentType)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, contentType: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.contentType}
										{...fields?.contentType?.props?.($LL, node, fieldsArgs?.contentType)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="contentLength-sm" {node} {errors} {fields} {row}>
						{#if !fields?.contentLength?.hiddenCol?.(args, tab, fieldsArgs?.contentLength)}
							<Tr class="hover" let:id {...fields?.contentLength?.props?.($LL, node, fieldsArgs?.contentLength)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.contentLength?.title?.($LL, fieldsArgs?.contentLength) || $LL.graphql.objects.File.fields.contentLength.name()}
										required={fields?.contentLength?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.contentLength?.props?.($LL, node, fieldsArgs?.contentLength)?.['td']}>
									<IntInput
										{id}
										name="contentLength"
										bind:value={node.contentLength}
										readonly={fields?.contentLength?.readonly?.(node, fieldsArgs?.contentLength)}
										disabled={fields?.contentLength?.disabled?.(node, fieldsArgs?.contentLength)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.contentLength
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.contentLength)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, contentLength: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.contentLength}
										{...fields?.contentLength?.props?.($LL, node, fieldsArgs?.contentLength)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="content-sm" {node} {errors} {fields} {row}>
						{#if !fields?.content?.hiddenCol?.(args, tab, fieldsArgs?.content)}
							<Tr class="hover" let:id {...fields?.content?.props?.($LL, node, fieldsArgs?.content)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.content?.title?.($LL, fieldsArgs?.content) || $LL.graphql.objects.File.fields.content.name()}
										required={fields?.content?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.content?.props?.($LL, node, fieldsArgs?.content)?.['td']}>
									<StringInput
										{id}
										name="content"
										bind:value={node.content}
										readonly={fields?.content?.readonly?.(node, fieldsArgs?.content)}
										disabled={fields?.content?.disabled?.(node, fieldsArgs?.content)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.content
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.content)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, content: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.content}
										{...fields?.content?.props?.($LL, node, fieldsArgs?.content)?.['input']}
									/>
								</Td>
							</Tr>
						{/if}
					</slot>
					<slot name="url-sm" {node} {errors} {fields} {row}>
						{#if !fields?.url?.hiddenCol?.(args, tab, fieldsArgs?.url)}
							<Tr class="hover" let:id {...fields?.url?.props?.($LL, node, fieldsArgs?.url)?.['tr']}>
								<td>
									<Label
										{id}
										text={fields?.url?.title?.($LL, fieldsArgs?.url) || $LL.graphql.objects.File.fields.url.name()}
										required={fields?.url?.required?.(node)}
										class="truncate"
									/>
								</td>
								<Td {zIndex} {...fields?.url?.props?.($LL, node, fieldsArgs?.url)?.['td']}>
									<StringInput
										{id}
										name="url"
										bind:value={node.url}
										readonly={fields?.url?.readonly?.(node, fieldsArgs?.url)}
										disabled={fields?.url?.disabled?.(node, fieldsArgs?.url)}
										on:change={(e) => {
											if (!Array.isArray(e.detail.value) || e.detail.value == null) {
												fields?.url
													?.onChange?.($LL, e.detail.value, node, fieldsArgs?.url)
													.then((next) => (node = next))
													.catch(
														(e) =>
															(errors = {
																...errors,
																[row]: {
																	...errors?.[row],
																	iterms: { ...errors?.[row]?.iterms, url: e }
																}
															})
													);
											}
										}}
										errors={errors?.[row]?.iterms?.url}
										{...fields?.url?.props?.($LL, node, fieldsArgs?.url)?.['input']}
									/>
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