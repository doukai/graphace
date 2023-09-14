<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import { IDInput, StringInput } from '@graphace/ui-graphql/components/input';
	import PermissionTypeInput from '~/lib/components/enums/permission-type/PermissionTypeInput.svelte';
	import type { IDExpression, StringExpression } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import type { PermissionTypeExpression, PermissionExpression } from '$houdini';

	export let name: string;
	export let expression: PermissionExpression | null | undefined;

	let _expression: {
		name: IDExpression;
		field: StringExpression;
		type: StringExpression;
		permissionType: PermissionTypeExpression;
		description: StringExpression;
	} = {
		name: {},
		field: {},
		type: {},
		permissionType: {},
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
		if (_expression.field.val || (_expression.field.in && _expression.field.in.length > 0)) {
			expression = { ...expression, field: _expression.field };
		} else {
			expression = { ...expression, field: undefined };
		}
		if (_expression.type.val || (_expression.type.in && _expression.type.in.length > 0)) {
			expression = { ...expression, type: _expression.type };
		} else {
			expression = { ...expression, type: undefined };
		}
		if (_expression.permissionType.val || (_expression.permissionType.in && _expression.permissionType.in.length > 0)) {
			expression = { ...expression, permissionType: _expression.permissionType };
		} else {
			expression = { ...expression, permissionType: undefined };
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
		_expression.field = {};
		_expression.type = {};
		_expression.permissionType = {};
		_expression.description = {};
		expression = undefined;
		dispatch('filter');
		tippyElement._tippy.hide();
	};
	const nameOprChange = (): void => {
		_expression.name.in = [];
		_expression.name.val = undefined;
	};
	const fieldOprChange = (): void => {
		_expression.field.in = [];
		_expression.field.val = undefined;
	};
	const typeOprChange = (): void => {
		_expression.type.in = [];
		_expression.type.val = undefined;
	};
	const permissionTypeOprChange = (): void => {
		_expression.permissionType.in = [];
		_expression.permissionType.val = undefined;
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
					{$LL.graphql.objects.Permission.fields.name.name()}
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
				<IDInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.in}
				/>
			{:else}
				<IDInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.val}
				/>
			{/if}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Permission.fields.field.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.field.opr}
					on:change={fieldOprChange}
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
			{#if _expression.field.opr === 'IN' || _expression.field.opr === 'NIN' || _expression.field.opr === 'BT' || _expression.field.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.field.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.field.val}
				/>
			{/if}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Permission.fields.type.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.type.opr}
					on:change={typeOprChange}
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
			{#if _expression.type.opr === 'IN' || _expression.type.opr === 'NIN' || _expression.type.opr === 'BT' || _expression.type.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.type.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.type.val}
				/>
			{/if}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Permission.fields.permissionType.name()}
				</button>
				<select
					class="select select-bordered join-item w-2/3"
					bind:value={_expression.permissionType.opr}
					on:change={permissionTypeOprChange}
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
			{#if _expression.permissionType.opr === 'IN' || _expression.permissionType.opr === 'NIN' || _expression.permissionType.opr === 'BT' || _expression.permissionType.opr === 'NBT'}
				<PermissionTypeInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.permissionType.in}
				/>
			{:else}
				<PermissionTypeInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.permissionType.val}
				/>
			{/if}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-1/3">
					{$LL.graphql.objects.Permission.fields.description.name()}
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
