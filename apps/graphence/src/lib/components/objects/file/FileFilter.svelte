<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, Funnel, ListBullet, XMark } from '@steeze-ui/heroicons';
	import { hasArguments, hasAsc, hasDesc } from '@graphace/graphql';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { SortSelect, StringFilter, IntFilter } from '@graphace/ui-graphql';
	import { fileFields, type FileFields, type FileFieldsArgs } from '~/lib/components/objects/file/FileOption';
	import type { FileExpression, FileOrderBy } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: FileExpression | null | undefined = undefined;
	export let orderBy: FileOrderBy | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	export let fields: FileFields | undefined = fileFields;
	export let fieldsPatch: FileFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: FileFieldsArgs | undefined = undefined;
	let className: string | undefined = '[&_[data-part=input]]:min-w-0';
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const contextClass = getContext<string>('ui.popover-content') || '';
	
	const dispatch = createEventDispatcher<{
		filter: {
			value?: FileExpression | null | undefined;
			orderBy?: FileOrderBy | null | undefined;
		};
	}>();

	let _value: FileExpression = {
		id: undefined,
		name: undefined,
		contentType: undefined,
		contentLength: undefined,
		content: undefined,
		url: undefined
	}

	let _orderBy: FileOrderBy = {
		id: undefined,
		name: undefined,
		contentType: undefined,
		contentLength: undefined,
		content: undefined,
		url: undefined
	}

	const filter = (): void => {
		value = _value;
		orderBy = _orderBy;
		dispatch('filter', { value, orderBy });
		$open = false;
	};

	const clear = (): void => {
		_value = {
			id: undefined,
			name: undefined,
			contentType: undefined,
			contentLength: undefined,
			content: undefined,
			url: undefined
		};
		_orderBy = {
			id: undefined,
			name: undefined,
			contentType: undefined,
			contentLength: undefined,
			content: undefined,
			url: undefined
		};
		value = _value;
		orderBy = _orderBy;
		dispatch('filter', { value, orderBy });
		$open = false;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true,
		onOpenChange: ({ curr, next }) => {
			if (curr !== next && next) {
				_value = { ..._value, ...value };
			}
			return next;
		}
	});

	$: filtered = value && hasArguments(value);
	$: asc = orderBy && hasAsc(orderBy);
	$: desc = orderBy && hasDesc(orderBy);
</script>

<slot trigger={$trigger}>
	<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
		<button data-part="button" class="btn btn-square" use:melt={$trigger}>
			{#if filtered || asc || desc}
				<Icon src={ListBullet} class="h-5 w-5" />
			{:else}
				<Icon src={Funnel} class="h-5 w-5" />
			{/if}
		</button>
	</div>
</slot>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="p-1 z-[{zIndex + 5}] {contextClass} {className}" use:melt={$content}>
		<div use:melt={$arrow} />
		<Form class="p-1 max-h-60 overflow-y-auto">
			<FormControl let:id>
				{#if !fields?.name?.hiddenFilter?.(_value, fieldsArgs?.name)}
					<Label {id} text={$LL.graphql.objects.File.fields.name.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="name" bind:value={_value.name} />
						<SortSelect {disabled} bind:value={_orderBy.name} />
					</div>
				{/if}
				{#if !fields?.contentType?.hiddenFilter?.(_value, fieldsArgs?.contentType)}
					<Label {id} text={$LL.graphql.objects.File.fields.contentType.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="contentType" bind:value={_value.contentType} />
						<SortSelect {disabled} bind:value={_orderBy.contentType} />
					</div>
				{/if}
				{#if !fields?.contentLength?.hiddenFilter?.(_value, fieldsArgs?.contentLength)}
					<Label {id} text={$LL.graphql.objects.File.fields.contentLength.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<IntFilter {id} name="contentLength" bind:value={_value.contentLength} />
						<SortSelect {disabled} bind:value={_orderBy.contentLength} />
					</div>
				{/if}
				{#if !fields?.content?.hiddenFilter?.(_value, fieldsArgs?.content)}
					<Label {id} text={$LL.graphql.objects.File.fields.content.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="content" bind:value={_value.content} />
						<SortSelect {disabled} bind:value={_orderBy.content} />
					</div>
				{/if}
				{#if !fields?.url?.hiddenFilter?.(_value, fieldsArgs?.url)}
					<Label {id} text={$LL.graphql.objects.File.fields.url.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="url" bind:value={_value.url} />
						<SortSelect {disabled} bind:value={_orderBy.url} />
					</div>
				{/if}
			</FormControl>
		</Form>
		<div class="flex justify-center space-x-1 pt-1">
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.filter()}>
				<button
					{disabled}
					class="btn btn-square btn-primary"
					on:click|preventDefault={(e) => filter()}
				>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.cancel()}>
				<button
					{disabled}
					class="btn btn-square btn-outline btn-error"
					on:click|preventDefault={(e) => clear()}
				>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}