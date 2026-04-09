<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, Funnel, ListBullet, XMark } from '@steeze-ui/heroicons';
	import { hasArguments, hasAsc, hasDesc } from '@graphace/graphql';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { SortSelect, StringFilter } from '@graphace/ui-graphql';
	import RealmSelectFilter from '~/lib/components/objects/realm/RealmSelectFilter.svelte';
	import { realmFields, type RealmFields, type RealmFieldsArgs } from '~/lib/components/objects/realm/RealmOption';
	import type { RealmExpression, RealmOrderBy } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: RealmExpression | null | undefined = undefined;
	export let orderBy: RealmOrderBy | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	export let fields: RealmFields | undefined = realmFields;
	export let fieldsPatch: RealmFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: RealmFieldsArgs | undefined = undefined;
	let className: string | undefined = '[&_[data-part=input]]:min-w-0';
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const contextClass = getContext<string>('ui.popover-content') || '';
	
	const dispatch = createEventDispatcher<{
		filter: {
			value?: RealmExpression | null | undefined;
			orderBy?: RealmOrderBy | null | undefined;
		};
	}>();

	let _value: RealmExpression = {
		id: undefined,
		name: undefined,
		description: undefined
	}

	let _orderBy: RealmOrderBy = {
		id: undefined,
		name: undefined,
		description: undefined
	}

	const filter = (): void => {
		value = _value;
		orderBy = _orderBy;
		dispatch('filter', { value, orderBy });
		$open = false;
	};

	const clear = (): void => {
		_value = {
			id: undefined,
			name: undefined,
			description: undefined
		};
		_orderBy = {
			id: undefined,
			name: undefined,
			description: undefined
		};
		value = _value;
		orderBy = _orderBy;
		dispatch('filter', { value, orderBy });
		$open = false;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true,
		onOpenChange: ({ curr, next }) => {
			if (curr !== next && next) {
				_value = { ..._value, ...value };
			}
			return next;
		}
	});

	$: filtered = value && hasArguments(value);
	$: asc = orderBy && hasAsc(orderBy);
	$: desc = orderBy && hasDesc(orderBy);
</script>

<slot trigger={$trigger}>
	<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
		<button data-part="button" class="btn btn-square" use:melt={$trigger}>
			{#if filtered || asc || desc}
				<Icon src={ListBullet} class="h-5 w-5" />
			{:else}
				<Icon src={Funnel} class="h-5 w-5" />
			{/if}
		</button>
	</div>
</slot>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="p-1 z-[{zIndex + 5}] {contextClass} {className}" use:melt={$content}>
		<div use:melt={$arrow} />
		<Form class="p-1 max-h-60 overflow-y-auto">
			<FormControl let:id>
				<Label {id} text={$LL.graphql.objects.Realm.name()} />
				<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
					<RealmSelectFilter {id} name="id" bind:value={_value.id} />
				</div>
				{#if !fields?.name?.hiddenFilter?.(_value, fieldsArgs?.name)}
					<Label {id} text={$LL.graphql.objects.Realm.fields.name.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="name" bind:value={_value.name} />
						<SortSelect {disabled} bind:value={_orderBy.name} />
					</div>
				{/if}
				{#if !fields?.description?.hiddenFilter?.(_value, fieldsArgs?.description)}
					<Label {id} text={$LL.graphql.objects.Realm.fields.description.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="description" bind:value={_value.description} />
						<SortSelect {disabled} bind:value={_orderBy.description} />
					</div>
				{/if}
			</FormControl>
		</Form>
		<div class="flex justify-center space-x-1 pt-1">
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.filter()}>
				<button
					{disabled}
					class="btn btn-square btn-primary"
					on:click|preventDefault={(e) => filter()}
				>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.cancel()}>
				<button
					{disabled}
					class="btn btn-square btn-outline btn-error"
					on:click|preventDefault={(e) => clear()}
				>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}