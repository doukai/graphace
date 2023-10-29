<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { tippy, DateTimeInput, DateTimeInputList } from '@graphace/ui';
	import OperatorSelect from '../input/OperatorSelect.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel, BarsArrowDown, BarsArrowUp } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	let _expression: StringExpression = { opr: 'EQ', val: undefined, in: [] };
	let _sort: Sort | undefined = undefined;

	let content: HTMLElement;
	let tippyElement: any;
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.val || (_expression.in && _expression.in.length > 0)) {
			expression = _expression;
		} else {
			expression = undefined;
		}
		sort = _sort;
		dispatch('filter');
		tippyElement._tippy.hide();
	};

	const clear = (): void => {
		_expression.opr = 'EQ';
		_expression.in = [];
		_expression.val = undefined;
		_sort = undefined;
		expression = undefined;
		sort = undefined;
		dispatch('filter');
		tippyElement._tippy.hide();
	};

	const oprChange = (): void => {
		_expression.in = [];
		_expression.val = undefined;
	};
</script>

<div class="hidden">
	<div class="flex items-start space-x-1" bind:this={content}>
		<OperatorSelect bind:value={_expression.opr} on:change={(e) => oprChange()} />
		{#if _expression.opr === 'IN' || _expression.opr === 'NIN' || _expression.opr === 'BT' || _expression.opr === 'NBT'}
			<DateTimeInputList
				placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
				{name}
				bind:value={_expression.in}
			/>
		{:else}
			<DateTimeInput
				placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
				{name}
				bind:value={_expression.val}
			/>
		{/if}
		<select class="select select-bordered" bind:value={_sort}>
			<option value={undefined} selected>{$LL.uiGraphql.table.th.noSort()}</option>
			<option value="ASC">{$LL.uiGraphql.table.th.asc()}</option>
			<option value="DESC">{$LL.uiGraphql.table.th.desc()}</option>
		</select>
		<div class="tooltip" data-tip={$LL.uiGraphql.table.th.filter()}>
			<button class="btn btn-square btn-primary" on:click|preventDefault={(e) => filter()}>
				<Icon src={Check} class="h-5 w-5" />
			</button>
		</div>
		<div class="tooltip" data-tip={$LL.uiGraphql.table.th.cancel()}>
			<button class="btn btn-square btn-outline btn-error" on:click|preventDefault={(e) => clear()}>
				<Icon src={XMark} class="h-5 w-5" />
			</button>
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
		{#if expression?.val || (expression?.in && expression.in.length > 0)}
			<span class="ml-1 flex-none">
				<Icon src={Funnel} class="h-5 w-5" />
			</span>
		{/if}
		{#if sort && sort === 'ASC'}
			<span class="ml-1 flex-none">
				<Icon src={BarsArrowDown} class="h-5 w-5" />
			</span>
		{/if}
		{#if sort && sort === 'DESC'}
			<span class="ml-1 flex-none">
				<Icon src={BarsArrowUp} class="h-5 w-5" />
			</span>
		{/if}
	</a>
</td>
