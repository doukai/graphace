<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons'; 
	import { OperatorSelect, StringInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import type { StringExpression } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { Operator } from '$houdini';
	import type { FileExpression } from '$houdini';

	export let expression: FileExpression | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;

	let _expression: {
		name: StringExpression;
		contentType: StringExpression;
		content: StringExpression;
		url: StringExpression;
	} = {
		name: { opr: Operator.EQ },
		contentType: { opr: Operator.EQ },
		content: { opr: Operator.EQ },
		url: { opr: Operator.EQ }
	};
	
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.name.val || (_expression.name.arr && _expression.name.arr.length > 0)) {
			expression = { ...expression, name: _expression.name };
		} else {
			expression = { ...expression, name: undefined };
		}
		if (_expression.contentType.val || (_expression.contentType.arr && _expression.contentType.arr.length > 0)) {
			expression = { ...expression, contentType: _expression.contentType };
		} else {
			expression = { ...expression, contentType: undefined };
		}
		if (_expression.content.val || (_expression.content.arr && _expression.content.arr.length > 0)) {
			expression = { ...expression, content: _expression.content };
		} else {
			expression = { ...expression, content: undefined };
		}
		if (_expression.url.val || (_expression.url.arr && _expression.url.arr.length > 0)) {
			expression = { ...expression, url: _expression.url };
		} else {
			expression = { ...expression, url: undefined };
		}
		
		if (Object.values(expression).filter((item) => item).length === 0) {
			expression = undefined;
		}
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		_expression.name = { opr: Operator.EQ };
		_expression.contentType = { opr: Operator.EQ };
		_expression.content = { opr: Operator.EQ };
		_expression.url = { opr: Operator.EQ };
		expression = undefined;
		dispatch('filter', {});
		$open = false;
	};
	const nameOprChange = (): void => {
		_expression.name.arr = [];
		_expression.name.val = undefined;
	};
	const contentTypeOprChange = (): void => {
		_expression.contentType.arr = [];
		_expression.contentType.val = undefined;
	};
	const contentOprChange = (): void => {
		_expression.content.arr = [];
		_expression.content.val = undefined;
	};
	const urlOprChange = (): void => {
		_expression.url.arr = [];
		_expression.url.val = undefined;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

<slot trigger={$trigger} />

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[50]" />
	<div class="space-y-2 md:space-y-1 p-1 rounded-xl bg-base-100 shadow z-[50]" use:melt={$content}>
		<div use:melt={$arrow} />
			{#if permissions.auth('File::name::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.File.fields.name.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
							bind:value={_expression.name.opr}
							on:change={(e) => nameOprChange()}
						/>
					</label>
				</div>
				{#if _expression.name.opr === 'IN' || _expression.name.opr === 'NIN' || _expression.name.opr === 'BT' || _expression.name.opr === 'NBT'}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="name"
						bind:value={_expression.name.arr}
						list
					/>
				{:else}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="name"
						bind:value={_expression.name.val}
					/>
				{/if}
			</div>
			{/if}
			{#if permissions.auth('File::contentType::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.File.fields.contentType.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
							bind:value={_expression.contentType.opr}
							on:change={(e) => contentTypeOprChange()}
						/>
					</label>
				</div>
				{#if _expression.contentType.opr === 'IN' || _expression.contentType.opr === 'NIN' || _expression.contentType.opr === 'BT' || _expression.contentType.opr === 'NBT'}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="contentType"
						bind:value={_expression.contentType.arr}
						list
					/>
				{:else}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="contentType"
						bind:value={_expression.contentType.val}
					/>
				{/if}
			</div>
			{/if}
			{#if permissions.auth('File::content::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.File.fields.content.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
							bind:value={_expression.content.opr}
							on:change={(e) => contentOprChange()}
						/>
					</label>
				</div>
				{#if _expression.content.opr === 'IN' || _expression.content.opr === 'NIN' || _expression.content.opr === 'BT' || _expression.content.opr === 'NBT'}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="content"
						bind:value={_expression.content.arr}
						list
					/>
				{:else}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="content"
						bind:value={_expression.content.val}
					/>
				{/if}
			</div>
			{/if}
			{#if permissions.auth('File::url::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.File.fields.url.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
							bind:value={_expression.url.opr}
							on:change={(e) => urlOprChange()}
						/>
					</label>
				</div>
				{#if _expression.url.opr === 'IN' || _expression.url.opr === 'NIN' || _expression.url.opr === 'BT' || _expression.url.opr === 'NBT'}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="url"
						bind:value={_expression.url.arr}
						list
					/>
				{:else}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="url"
						bind:value={_expression.url.val}
					/>
				{/if}
			</div>
			{/if}
		<div class="flex justify-center space-x-2">
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.filter()}>
				<button class="btn btn-square btn-primary md:btn-sm" on:click={(e) => filter()}>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.cancel()}>
				<button class="btn btn-square btn-outline btn-error md:btn-sm" on:click={(e) => clear()}>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}