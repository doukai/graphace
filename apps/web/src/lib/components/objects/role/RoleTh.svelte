<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import { StringInput } from '@graphace/ui-graphql/components/input';
	import type { StringExpression } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import type { RoleExpression } from '$houdini';

	export let name: string;
	export let expression: RoleExpression | null | undefined;

	let _expression: {
		name: StringExpression;
		description: StringExpression;
	} = {
		name: {},
		description: {},
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
</script>
<div class="hidden">
	<div class="space-y-2" bind:this={content}>
		<div class="grid grid-cols-2 gap-2">
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Role.fields.name.name()}
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
					{$LL.graphql.objects.Role.fields.description.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.description.opr}
					on:change={descriptionOprChange}
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
