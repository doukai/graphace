<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { Input, InputList } from '@graphace/ui';
	import OperatorSelect from '../input/OperatorSelect.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel, BarsArrowDown, BarsArrowUp } from '@steeze-ui/heroicons';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	let _expression: StringExpression = { opr: 'EQ', val: undefined, in: [] };
	let _sort: Sort | undefined = undefined;

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
		$open = false;
	};

	const clear = (): void => {
		_expression.opr = 'EQ';
		_expression.in = [];
		_expression.val = undefined;
		_sort = undefined;
		expression = undefined;
		sort = undefined;
		dispatch('filter');
		$open = false;
	};

	const oprChange = (): void => {
		_expression.in = [];
		_expression.val = undefined;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

<td>
	<a class="link group inline-flex" href={null} use:melt={$trigger}>
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

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[50]" />
	<div class="p-1 rounded-xl bg-base-100 shadow z-[50]" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="flex items-center space-x-1" transition:fade={{ duration: 100 }}>
			<OperatorSelect
				bind:value={_expression.opr}
				on:change={(e) => oprChange()}
				className="md:select-sm"
			/>
			{#if _expression.opr === 'IN' || _expression.opr === 'NIN' || _expression.opr === 'BT' || _expression.opr === 'NBT'}
				<InputList
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.in}
					className="md:input-sm"
					addBtnClassName="md:btn-sm"
				/>
			{:else}
				<Input
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.val}
					className="md:input-sm"
				/>
			{/if}
			<select class="select select-bordered md:select-sm" bind:value={_sort}>
				<option value={undefined} selected>{$LL.uiGraphql.table.th.noSort()}</option>
				<option value="ASC">{$LL.uiGraphql.table.th.asc()}</option>
				<option value="DESC">{$LL.uiGraphql.table.th.desc()}</option>
			</select>
			<div class="tooltip flex items-center" data-tip={$LL.uiGraphql.table.th.filter()}>
				<button
					class="btn btn-square btn-primary md:btn-sm"
					on:click|preventDefault={(e) => filter()}
				>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip flex items-center" data-tip={$LL.uiGraphql.table.th.cancel()}>
				<button
					class="btn btn-square btn-outline btn-error md:btn-sm"
					on:click|preventDefault={(e) => clear()}
				>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}
