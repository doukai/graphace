<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import { StringInput, BooleanInput } from '@graphace/ui-graphql/components/input';
	import type { StringExpression, BooleanExpression } from '@graphace/graphql/types';
	import LL from '$i18n/i18n-svelte';
	import type { UserExpression } from '$houdini';

	export let name: string;
	export let expression: UserExpression | null | undefined;

	let _expression: {
		name: StringExpression;
		lastName: StringExpression;
		login: StringExpression;
		email: StringExpression;
		phones: StringExpression;
		disable: BooleanExpression;
	} = {
		name: {},
		lastName: {},
		login: {},
		email: {},
		phones: {},
		disable: {},
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
		if (_expression.lastName.val || (_expression.lastName.in && _expression.lastName.in.length > 0)) {
			expression = { ...expression, lastName: _expression.lastName };
		} else {
			expression = { ...expression, lastName: undefined };
		}
		if (_expression.login.val || (_expression.login.in && _expression.login.in.length > 0)) {
			expression = { ...expression, login: _expression.login };
		} else {
			expression = { ...expression, login: undefined };
		}
		if (_expression.email.val || (_expression.email.in && _expression.email.in.length > 0)) {
			expression = { ...expression, email: _expression.email };
		} else {
			expression = { ...expression, email: undefined };
		}
		if (_expression.phones.val || (_expression.phones.in && _expression.phones.in.length > 0)) {
			expression = { ...expression, phones: _expression.phones };
		} else {
			expression = { ...expression, phones: undefined };
		}
		if (_expression.disable.val || (_expression.disable.in && _expression.disable.in.length > 0)) {
			expression = { ...expression, disable: _expression.disable };
		} else {
			expression = { ...expression, disable: undefined };
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
		_expression.lastName = {};
		_expression.login = {};
		_expression.email = {};
		_expression.phones = {};
		_expression.disable = {};
		expression = undefined;
		dispatch('filter');
		tippyElement._tippy.hide();
	};
	const nameOprChange = (): void => {
		_expression.name.in = [];
		_expression.name.val = undefined;
	};
	const lastNameOprChange = (): void => {
		_expression.lastName.in = [];
		_expression.lastName.val = undefined;
	};
	const loginOprChange = (): void => {
		_expression.login.in = [];
		_expression.login.val = undefined;
	};
	const emailOprChange = (): void => {
		_expression.email.in = [];
		_expression.email.val = undefined;
	};
	const phonesOprChange = (): void => {
		_expression.phones.in = [];
		_expression.phones.val = undefined;
	};
	const disableOprChange = (): void => {
		_expression.disable.in = [];
		_expression.disable.val = undefined;
	};
</script>
<div class="hidden">
	<div class="space-y-2" bind:this={content}>
		<div class="grid grid-cols-2 gap-2">
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.User.fields.name.name()}
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
					{$LL.graphql.objects.User.fields.lastName.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.lastName.opr}
					on:change={lastNameOprChange}
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
			{#if _expression.lastName.opr === 'IN' || _expression.lastName.opr === 'NIN' || _expression.lastName.opr === 'BT' || _expression.lastName.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.lastName.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.lastName.val}
				/>
			{/if}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.User.fields.login.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.login.opr}
					on:change={loginOprChange}
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
			{#if _expression.login.opr === 'IN' || _expression.login.opr === 'NIN' || _expression.login.opr === 'BT' || _expression.login.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.login.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.login.val}
				/>
			{/if}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.User.fields.email.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.email.opr}
					on:change={emailOprChange}
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
			{#if _expression.email.opr === 'IN' || _expression.email.opr === 'NIN' || _expression.email.opr === 'BT' || _expression.email.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.email.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.email.val}
				/>
			{/if}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.User.fields.phones.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.phones.opr}
					on:change={phonesOprChange}
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
			{#if _expression.phones.opr === 'IN' || _expression.phones.opr === 'NIN' || _expression.phones.opr === 'BT' || _expression.phones.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.phones.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.phones.val}
				/>
			{/if}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.User.fields.disable.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.disable.opr}
					on:change={disableOprChange}
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
			{#if _expression.disable.opr === 'IN' || _expression.disable.opr === 'NIN' || _expression.disable.opr === 'BT' || _expression.disable.opr === 'NBT'}
				<BooleanInput
					{name}
					bind:value={_expression.disable.in}
				/>
			{:else}
				<BooleanInput
					{name}
					bind:value={_expression.disable.val}
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