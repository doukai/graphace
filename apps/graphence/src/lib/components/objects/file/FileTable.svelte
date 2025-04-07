<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Loading, SearchInput, Table, Td } from '@graphace/ui';
	import { type Option, StringTh, StringTd, ObjectTd } from '@graphace/ui-graphql';
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
		contentType: Option;
		content: Option;
		url: Option;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		contentType: { readonly: false, disabled: false, hidden: false },
		content: { readonly: false, disabled: false, hidden: false },
		url: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
		query: { args: QueryFileListArgs; orderBy: FileOrderBy };
		remove: { value: FileInput | (FileInput | null | undefined)[] | null | undefined };
		unbind: { value: FileInput | (FileInput | null | undefined)[] | null | undefined };
		edit: { value: FileInput | (FileInput | null | undefined)[] | null | undefined };
		save: { value: FileInput | (FileInput | null | undefined)[] | null | undefined };
		select: { value: FileInput | (FileInput | null | undefined)[] | null | undefined };
		create: {};
		back: {};
	}>();

	let selectAll: boolean;
</script>

<div class="flex md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.File.name()}
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
			<th class="w-0">
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
					name={$LL.graphql.objects.File.fields.name.name()}
					bind:value={args.name}
					bind:sort={orderBy.name}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.contentType.hidden}
				<StringTh
					name={$LL.graphql.objects.File.fields.contentType.name()}
					bind:value={args.contentType}
					bind:sort={orderBy.contentType}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.content.hidden}
				<StringTh
					name={$LL.graphql.objects.File.fields.content.name()}
					bind:value={args.content}
					bind:sort={orderBy.content}
					on:filter={(e) => dispatch('query', { args, orderBy })}
				/>
			{/if}
			{#if !fields.url.hidden}
				<StringTh
					name={$LL.graphql.objects.File.fields.url.name()}
					bind:value={args.url}
					bind:sort={orderBy.url}
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
						<slot name="contentType">
							{#if !fields.contentType.hidden}
								<StringTd
									name="contentType"
									bind:value={node.contentType}
									on:save={(e) =>
										dispatch('save', {
											value: { contentType: node?.contentType, where: { id: { val: node?.id } } }
										})}
									readonly={fields.contentType.readonly}
									disabled={fields.contentType.disabled}
									errors={errors?.[row]?.iterms?.contentType}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="content">
							{#if !fields.content.hidden}
								<StringTd
									name="content"
									bind:value={node.content}
									on:save={(e) =>
										dispatch('save', {
											value: { content: node?.content, where: { id: { val: node?.id } } }
										})}
									readonly={fields.content.readonly}
									disabled={fields.content.disabled}
									errors={errors?.[row]?.iterms?.content}
									{zIndex}
								/>
							{/if}
						</slot>
						<slot name="url">
							{#if !fields.url.hidden}
								<StringTd
									name="url"
									bind:value={node.url}
									on:save={(e) =>
										dispatch('save', {
											value: { url: node?.url, where: { id: { val: node?.id } } }
										})}
									readonly={fields.url.readonly}
									disabled={fields.url.disabled}
									errors={errors?.[row]?.iterms?.url}
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
