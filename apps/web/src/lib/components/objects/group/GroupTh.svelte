<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui';
	import { OperatorSelect, StringInput, IntInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import type { StringExpression, IntExpression } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import type { GroupExpression } from '$houdini';
	import { permissions } from '~/lib/utils/auth-util';

	export let name: string;
	export let expression: GroupExpression | null | undefined;

	let _expression: {
		name: StringExpression;
		description: StringExpression;
		path: StringExpression;
		deep: IntExpression;
		parentId: StringExpression;
	} = {
		name: {},
		description: {},
		path: {},
		deep: {},
		parentId: {},
	};

	let content: HTMLElement;
	let tippyElement: any;
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.name.val || (_expression.name.in && _expression.name.in.length > 0)) {
			expression = { ...expression, name: _expression.name };
		} else {
			expression = { ...expression, name: undefined };
		}
		if (_expression.description.val || (_expression.description.in && _expression.description.in.length > 0)) {
			expression = { ...expression, description: _expression.description };
		} else {
			expression = { ...expression, description: undefined };
		}
		if (_expression.path.val || (_expression.path.in && _expression.path.in.length > 0)) {
			expression = { ...expression, path: _expression.path };
		} else {
			expression = { ...expression, path: undefined };
		}
		if (_expression.deep.val || (_expression.deep.in && _expression.deep.in.length > 0)) {
			expression = { ...expression, deep: _expression.deep };
		} else {
			expression = { ...expression, deep: undefined };
		}
		if (_expression.parentId.val || (_expression.parentId.in && _expression.parentId.in.length > 0)) {
			expression = { ...expression, parentId: _expression.parentId };
		} else {
			expression = { ...expression, parentId: undefined };
		}

		if (Object.keys(expression).length > 0) {
			dispatch('filter');
		} else {
			expression = undefined;
		}
		tippyElement._tippy.hide();
	};

	const clear = (): void => {
		_expression.name = {};
		_expression.description = {};
		_expression.path = {};
		_expression.deep = {};
		_expression.parentId = {};
		expression = undefined;
		dispatch('filter');
		tippyElement._tippy.hide();
	};
	const nameOprChange = (): void => {
		_expression.name.in = [];
		_expression.name.val = undefined;
	};
	const descriptionOprChange = (): void => {
		_expression.description.in = [];
		_expression.description.val = undefined;
	};
	const pathOprChange = (): void => {
		_expression.path.in = [];
		_expression.path.val = undefined;
	};
	const deepOprChange = (): void => {
		_expression.deep.in = [];
		_expression.deep.val = undefined;
	};
	const parentIdOprChange = (): void => {
		_expression.parentId.in = [];
		_expression.parentId.val = undefined;
	};
</script>
<div class="hidden">
	<div class="space-y-2" bind:this={content}>
		<div class="grid grid-cols-2 gap-2">
			{#if permissions.auth('Group::name::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Group.fields.name.name()}
				</button>
				<OperatorSelect
					className="join-item w-2/3"
					bind:value={_expression.name.opr}
					on:change={(e) => nameOprChange()}
				/>
			</div>
			{#if _expression.name.opr === 'IN' || _expression.name.opr === 'NIN' || _expression.name.opr === 'BT' || _expression.name.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::description::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Group.fields.description.name()}
				</button>
				<OperatorSelect
					className="join-item w-2/3"
					bind:value={_expression.description.opr}
					on:change={(e) => descriptionOprChange()}
				/>
			</div>
			{#if _expression.description.opr === 'IN' || _expression.description.opr === 'NIN' || _expression.description.opr === 'BT' || _expression.description.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.description.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.description.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::path::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Group.fields.path.name()}
				</button>
				<OperatorSelect
					className="join-item w-2/3"
					bind:value={_expression.path.opr}
					on:change={(e) => pathOprChange()}
				/>
			</div>
			{#if _expression.path.opr === 'IN' || _expression.path.opr === 'NIN' || _expression.path.opr === 'BT' || _expression.path.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.path.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.path.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::deep::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Group.fields.deep.name()}
				</button>
				<OperatorSelect
					className="join-item w-2/3"
					bind:value={_expression.deep.opr}
					on:change={(e) => deepOprChange()}
				/>
			</div>
			{#if _expression.deep.opr === 'IN' || _expression.deep.opr === 'NIN' || _expression.deep.opr === 'BT' || _expression.deep.opr === 'NBT'}
				<IntInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.deep.in}
				/>
			{:else}
				<IntInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.deep.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::parentId::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Group.fields.parentId.name()}
				</button>
				<OperatorSelect
					className="join-item w-2/3"
					bind:value={_expression.parentId.opr}
					on:change={(e) => parentIdOprChange()}
				/>
			</div>
			{#if _expression.parentId.opr === 'IN' || _expression.parentId.opr === 'NIN' || _expression.parentId.opr === 'BT' || _expression.parentId.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.parentId.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.parentId.val}
				/>
			{/if}
			{/if}
		</div>
		<div class="flex justify-center space-x-2">
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.filter()}>
				<button class="btn btn-square btn-primary" on:click={(e) => filter()}>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.cancel()}>
				<button class="btn btn-square btn-outline btn-error" on:click={(e) => clear()}>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
</div>

<td>
	<a
		class="link group inline-flex"
		href={null}
		use:tippy={{
			content,
			placement: 'bottom',
			interactive: true,
			arrow: true,
			trigger: 'click',
			interactiveBorder: 30,
			theme: 'daisy',
			maxWidth: 'none',
			appendTo: () => document.body
		}}
		bind:this={tippyElement}
	>
		{name}
		{#if expression && Object.keys(expression).length > 0}
			<span class="flex-none">
				<Icon src={Funnel} class="h-5 w-5" />
			</span>
		{/if}
	</a>
</td>
