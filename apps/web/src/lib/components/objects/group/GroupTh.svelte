<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import { StringInput, IntInput } from '@graphace/ui-graphql/components/input';
	import type { StringExpression, NumberExpression } from '@graphace/graphql/types';
	import LL from '$i18n/i18n-svelte';
	import type { GroupExpression } from '$houdini';

	export let name: string;
	export let expression: GroupExpression | null | undefined;

	let _expression: {
		name: StringExpression;
		path: StringExpression;
		deep: IntExpression;
	} = {
		name: {},
		path: {},
		deep: {},
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

		if (Object.keys(expression).length > 0) {
			dispatch('filter');
		} else {
			expression = undefined;
		}
		tippyElement._tippy.hide();
	};

	const clear = (): void => {
		_expression.name = {};
		_expression.path = {};
		_expression.deep = {};
		expression = undefined;
		dispatch('filter');
		tippyElement._tippy.hide();
	};
	const nameOprChange = (): void => {
		_expression.name.in = [];
		_expression.name.val = undefined;
	};
	const pathOprChange = (): void => {
		_expression.path.in = [];
		_expression.path.val = undefined;
	};
	const deepOprChange = (): void => {
		_expression.deep.in = [];
		_expression.deep.val = undefined;
	};
</script>
<div class="hidden">
	<div class="space-y-2" bind:this={content}>
		<div class="grid grid-cols-2 gap-2">
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Group.fields.name.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.name.opr}
					on:change={nameOprChange}
				>
					<option value="EQ" selected>{$LL.uiGraphql.table.th.eq()}</option>
					<option value="NEQ">{$LL.uiGraphql.table.th.neq()}</option>
					<option value="LK">{$LL.uiGraphql.table.th.lk()}</option>
					<option value="NLK">{$LL.uiGraphql.table.th.nlk()}</option>
					<option value="GT">{$LL.uiGraphql.table.th.gt()}</option>
					<option value="GTE">{$LL.uiGraphql.table.th.gte()}</option>
					<option value="LT">{$LL.uiGraphql.table.th.lt()}</option>
					<option value="LTE">{$LL.uiGraphql.table.th.lte()}</option>
					<option value="NIL">{$LL.uiGraphql.table.th.nil()}</option>
					<option value="NNIL">{$LL.uiGraphql.table.th.nnil()}</option>
					<option value="IN">{$LL.uiGraphql.table.th.in()}</option>
					<option value="NIN">{$LL.uiGraphql.table.th.nin()}</option>
					<option value="BT">{$LL.uiGraphql.table.th.bt()}</option>
					<option value="NBT">{$LL.uiGraphql.table.th.nbt()}</option>
				</select>
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
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Group.fields.path.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.path.opr}
					on:change={pathOprChange}
				>
					<option value="EQ" selected>{$LL.uiGraphql.table.th.eq()}</option>
					<option value="NEQ">{$LL.uiGraphql.table.th.neq()}</option>
					<option value="LK">{$LL.uiGraphql.table.th.lk()}</option>
					<option value="NLK">{$LL.uiGraphql.table.th.nlk()}</option>
					<option value="GT">{$LL.uiGraphql.table.th.gt()}</option>
					<option value="GTE">{$LL.uiGraphql.table.th.gte()}</option>
					<option value="LT">{$LL.uiGraphql.table.th.lt()}</option>
					<option value="LTE">{$LL.uiGraphql.table.th.lte()}</option>
					<option value="NIL">{$LL.uiGraphql.table.th.nil()}</option>
					<option value="NNIL">{$LL.uiGraphql.table.th.nnil()}</option>
					<option value="IN">{$LL.uiGraphql.table.th.in()}</option>
					<option value="NIN">{$LL.uiGraphql.table.th.nin()}</option>
					<option value="BT">{$LL.uiGraphql.table.th.bt()}</option>
					<option value="NBT">{$LL.uiGraphql.table.th.nbt()}</option>
				</select>
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
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Group.fields.deep.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.deep.opr}
					on:change={deepOprChange}
				>
					<option value="EQ" selected>{$LL.uiGraphql.table.th.eq()}</option>
					<option value="NEQ">{$LL.uiGraphql.table.th.neq()}</option>
					<option value="LK">{$LL.uiGraphql.table.th.lk()}</option>
					<option value="NLK">{$LL.uiGraphql.table.th.nlk()}</option>
					<option value="GT">{$LL.uiGraphql.table.th.gt()}</option>
					<option value="GTE">{$LL.uiGraphql.table.th.gte()}</option>
					<option value="LT">{$LL.uiGraphql.table.th.lt()}</option>
					<option value="LTE">{$LL.uiGraphql.table.th.lte()}</option>
					<option value="NIL">{$LL.uiGraphql.table.th.nil()}</option>
					<option value="NNIL">{$LL.uiGraphql.table.th.nnil()}</option>
					<option value="IN">{$LL.uiGraphql.table.th.in()}</option>
					<option value="NIN">{$LL.uiGraphql.table.th.nin()}</option>
					<option value="BT">{$LL.uiGraphql.table.th.bt()}</option>
					<option value="NBT">{$LL.uiGraphql.table.th.nbt()}</option>
				</select>
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
		<div class="flex justify-center space-x-2">
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.filter()}>
				<button class="btn btn-square btn-primary" on:click={filter}>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.cancel()}>
				<button class="btn btn-square btn-outline btn-error" on:click={clear}>
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
