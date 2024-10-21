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
	import RealmSelect from '~/lib/components/objects/realm/RealmSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { Operator } from '$houdini';
	import type { RealmInput, RealmExpression } from '$houdini';

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
		if (
			_expression.id.val ||
			(_expression.id.arr && _expression.id.arr.length > 0) ||
			_expression.id.opr ==='NIL' ||
			_expression.id.opr ==='NNIL'
		) {
			expression = { ...expression, id: _expression.id };
		} else {
			expression = { ...expression, id: undefined };
		}
		if (
			_expression.name.val ||
			(_expression.name.arr && _expression.name.arr.length > 0) ||
			_expression.name.opr ==='NIL' ||
			_expression.name.opr ==='NNIL'
		) {
			expression = { ...expression, name: _expression.name };
		} else {
			expression = { ...expression, name: undefined };
		}
		if (
			_expression.description.val ||
			(_expression.description.arr && _expression.description.arr.length > 0) ||
			_expression.description.opr ==='NIL' ||
			_expression.description.opr ==='NNIL'
		) {
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

<slot trigger={$trigger} />

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[100]" />
	<div class="p-1 rounded-xl bg-base-200 shadow z-[100]" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="space-y-1 max-h-60 overflow-y-auto">
			{#if permissions.auth('Realm::id::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Realm.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.id.opr}
								on:change={(e) => idOprChange()}
							/>
						</label>
					</div>
					{#if _expression.id.opr === 'IN' || _expression.id.opr === 'NIN' || _expression.id.opr === 'BT' || _expression.id.opr === 'NBT'}
						<RealmSelect
							name="id"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<RealmSelect
							name="id"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Realm::name::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Realm.fields.name.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
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
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Realm::description::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Realm.fields.description.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.description.opr}
								on:change={(e) => descriptionOprChange()}
							/>
						</label>
					</div>
					{#if _expression.description.opr === 'IN' || _expression.description.opr === 'NIN' || _expression.description.opr === 'BT' || _expression.description.opr === 'NBT'}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="description"
							bind:value={_expression.description.arr}
							list
						/>
					{:else}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="description"
							bind:value={_expression.description.val}
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
		</div>
		<div class="flex justify-center space-x-1 pt-1">
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