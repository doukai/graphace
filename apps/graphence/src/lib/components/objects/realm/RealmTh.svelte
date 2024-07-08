<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons'; 
	import { OperatorSelect, StringInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import type { StringExpression } from '~/lib/types/schema';
	import RealmSelect from '~/lib/components/objects/realm/RealmSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { Operator } from '$houdini';
	import type { RealmInput, RealmExpression } from '$houdini';

	export let name: string;
	export let expression: RealmExpression | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;

	let _expression: {
		id: StringExpression;
		name: StringExpression;
		description: StringExpression;
	} = {
		id: { opr: Operator.EQ },
		name: { opr: Operator.EQ },
		description: { opr: Operator.EQ }
	};
	$: if (Array.isArray(value)) {
		_expression.id.arr = value?.map((item) => item?.id);
	} else if (value) {
		_expression.id.val = value?.id;
	}
	
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.id.val || (_expression.id.arr && _expression.id.arr.length > 0)) {
			expression = { ...expression, id: _expression.id };
		} else {
			expression = { ...expression, id: undefined };
		}
		if (_expression.name.val || (_expression.name.arr && _expression.name.arr.length > 0)) {
			expression = { ...expression, name: _expression.name };
		} else {
			expression = { ...expression, name: undefined };
		}
		if (_expression.description.val || (_expression.description.arr && _expression.description.arr.length > 0)) {
			expression = { ...expression, description: _expression.description };
		} else {
			expression = { ...expression, description: undefined };
		}
		
		if (Object.values(expression).filter((item) => item).length === 0) {
			expression = undefined;
		}
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		_expression.id = { opr: Operator.EQ };
		if (Array.isArray(value)) {
			value= [];
		} else if (value) {
			value = undefined;
		}
		_expression.name = { opr: Operator.EQ };
		_expression.description = { opr: Operator.EQ };
		expression = undefined;
		dispatch('filter', {});
		$open = false;
	};
	const idOprChange = (): void => {
		_expression.id.arr = [];
		_expression.id.val = undefined;
		if (Array.isArray(value)) {
			value = [];
		} else if (value) {
			value = undefined;
		}
	};
	const nameOprChange = (): void => {
		_expression.name.arr = [];
		_expression.name.val = undefined;
	};
	const descriptionOprChange = (): void => {
		_expression.description.arr = [];
		_expression.description.val = undefined;
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
		{#if expression && Object.keys(expression).length > 0}
			<span class="flex-none">
				<Icon src={Funnel} class="h-5 w-5" />
			</span>
		{/if}
	</a>
</td>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[50]" />
	<div class="space-y-2 md:space-y-1 p-1 rounded-xl bg-base-100 shadow z-[50]" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="grid grid-cols-2 gap-2 md:gap-1 items-center" transition:fade={{ duration: 100 }}>
			{#if permissions.auth('Realm::id::*')}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<div class="form-control">
				<label class="input-group md:input-group-sm">
					<span class="w-20 whitespace-nowrap">
						{$LL.graphql.objects.Realm.name()}
					</span>
					<OperatorSelect
						className="md:select-sm"
						bind:value={_expression.id.opr}
						on:change={(e) => idOprChange()}
					/>
				</label>
			</div>
			{#if _expression.id.opr === 'IN' || _expression.id.opr === 'NIN' || _expression.id.opr === 'BT' || _expression.id.opr === 'NBT'}
				<RealmSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value
					className="md:input-xs"
					containerClassName="md:textarea-sm md:px-1"
					tagClassName="md:badge-sm"
					menuClassName="md:mt-1 md:menu-sm"
				/>
			{:else}
				<RealmSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					bind:value
					className="md:input-xs"
					containerClassName="md:textarea-sm md:px-1"
					tagClassName="md:badge-sm"
					menuClassName="md:mt-1 md:menu-sm"
				/>
			{/if}
			{/if}
			{#if permissions.auth('Realm::name::*')}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<div class="form-control">
				<label class="input-group md:input-group-sm">
					<span class="w-20 whitespace-nowrap">
						{$LL.graphql.objects.Realm.fields.name.name()}
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
					{name}
					bind:value={_expression.name.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					className="md:input-sm"
					{name}
					bind:value={_expression.name.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Realm::description::*')}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<div class="form-control">
				<label class="input-group md:input-group-sm">
					<span class="w-20 whitespace-nowrap">
						{$LL.graphql.objects.Realm.fields.description.name()}
					</span>
					<OperatorSelect
						className="md:select-sm"
						bind:value={_expression.description.opr}
						on:change={(e) => descriptionOprChange()}
					/>
				</label>
			</div>
			{#if _expression.description.opr === 'IN' || _expression.description.opr === 'NIN' || _expression.description.opr === 'BT' || _expression.description.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					className="md:input-sm"
					{name}
					bind:value={_expression.description.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					className="md:input-sm"
					{name}
					bind:value={_expression.description.val}
				/>
			{/if}
			{/if}
		</div>
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