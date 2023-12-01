<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui';
	import { OperatorSelect, StringInput, IntInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import type { StringExpression, IntExpression } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import type { GroupInput, GroupExpression } from '$houdini';
	import GroupSelect from './GroupSelect.svelte';
	import { permissions } from '~/lib/utils/auth-util';

	export let name: string;
	export let expression: GroupExpression | null | undefined;
	let value: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	let parent: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;

	let _expression: {
		id: StringExpression;
		description: StringExpression;
		path: StringExpression;
		deep: IntExpression;
		parentId: StringExpression;
		parent: { id: StringExpression };
	} = {
		id: {},
		description: {},
		path: {},
		deep: {},
		parentId: {},
		parent: { id: {} }
	};

	$: if (Array.isArray(value)) {
		_expression.id.in = value?.map((item) => item?.where?.id?.val);
	} else if (value) {
		_expression.id.val = value?.where?.id?.val;
	}

	$: if (Array.isArray(parent)) {
		_expression.parent.id.in = parent?.map((item) => item?.where?.id?.val);
	} else if (parent) {
		_expression.parent.id.val = parent?.where?.id?.val;
	}

	let content: HTMLElement;
	let tippyElement: any;
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.id.val || (_expression.id.in && _expression.id.in.length > 0)) {
			expression = { ...expression, id: _expression.id };
		} else {
			expression = { ...expression, id: undefined };
		}
		if (
			_expression.description.val ||
			(_expression.description.in && _expression.description.in.length > 0)
		) {
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
		if (
			_expression.parentId.val ||
			(_expression.parentId.in && _expression.parentId.in.length > 0)
		) {
			expression = { ...expression, parentId: _expression.parentId };
		} else {
			expression = { ...expression, parentId: undefined };
		}
		console.log(_expression);
		if (
			_expression.parent.id?.val ||
			(_expression.parent.id?.in && _expression.parent.id?.in.length > 0)
		) {
			expression = { ...expression, parent: _expression.parent };
		} else {
			expression = { ...expression, parent: undefined };
		}

		if (Object.values(expression).filter((item) => item).length === 0) {
			expression = undefined;
		}
		dispatch('filter');
		tippyElement._tippy.hide();
	};

	const clear = (): void => {
		value = undefined;
		_expression.id = {};
		_expression.description = {};
		_expression.path = {};
		_expression.deep = {};
		_expression.parentId = {};
		_expression.parent = { id: {} };
		expression = undefined;
		dispatch('filter');
		tippyElement._tippy.hide();
	};
	const nameOprChange = (): void => {
		_expression.id.in = [];
		_expression.id.val = undefined;
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
		{#if permissions.auth('Group::name::*')}
			<div class="flex space-x-2">
				<div class="join">
					<button class="btn btn-active btn-ghost join-item w-16">
						{$LL.graphql.objects.Group.fields.name.name()}
					</button>
					<OperatorSelect
						className="join-item w-32"
						bind:value={_expression.id.opr}
						on:change={(e) => nameOprChange()}
					/>
				</div>
				{#if _expression.id.opr === 'IN' || _expression.id.opr === 'NIN' || _expression.id.opr === 'BT' || _expression.id.opr === 'NBT'}
					<GroupSelect {name} list={true} bind:value />
				{:else}
					<GroupSelect {name} bind:value />
				{/if}
			</div>
		{/if}
		{#if permissions.auth('Group::description::*')}
			<div class="flex space-x-2">
				<div class="join">
					<button class="btn btn-active btn-ghost join-item w-16">
						{$LL.graphql.objects.Group.fields.description.name()}
					</button>
					<OperatorSelect
						className="join-item w-32"
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
			</div>
		{/if}
		{#if permissions.auth('Group::path::*')}
			<div class="flex space-x-2">
				<div class="join">
					<button class="btn btn-active btn-ghost join-item w-16">
						{$LL.graphql.objects.Group.fields.path.name()}
					</button>
					<OperatorSelect
						className="join-item w-32"
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
			</div>
		{/if}
		{#if permissions.auth('Group::deep::*')}
			<div class="flex space-x-2">
				<div class="join">
					<button class="btn btn-active btn-ghost join-item w-16">
						{$LL.graphql.objects.Group.fields.deep.name()}
					</button>
					<OperatorSelect
						className="join-item w-32"
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
			</div>
		{/if}
		{#if permissions.auth('Group::parentId::*')}
			<div class="flex space-x-2">
				<div class="join">
					<button class="btn btn-active btn-ghost join-item w-16">
						{$LL.graphql.objects.Group.fields.parentId.name()}
					</button>
					<OperatorSelect
						className="join-item w-32"
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
			</div>
		{/if}
		{#if permissions.auth('Group::parent::*')}
			<div class="flex space-x-2">
				<div class="join">
					<button class="btn btn-active btn-ghost join-item w-16">
						{$LL.graphql.objects.Group.fields.parent.name()}
					</button>
					<OperatorSelect className="join-item w-32" bind:value={_expression.parent.id.opr} />
				</div>
				{#if _expression.parent.id.opr === 'IN' || _expression.parent.id.opr === 'NIN' || _expression.parent.id.opr === 'BT' || _expression.parent.id.opr === 'NBT'}
					<GroupSelect {name} list={true} bind:value={parent} />
				{:else}
					<GroupSelect {name} bind:value={parent} />
				{/if}
			</div>
		{/if}
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
