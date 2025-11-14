<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Minus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { type Option, FormControl, Td } from '@graphace/ui';
	import RoleSelect from './RoleSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { namedQueryStore } from '~/utils';
	import type { RoleInput } from '~/lib/types/schema';

	export let value: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let zIndex: number = 0;
	let className: string | undefined = 'p-1';
	export { className as class };
	
	const contextClass = getContext<string>('ui.popover-content') || '';
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		save: {};
	}>();

	const query = { fieldName: 'roleList', idName: 'id' };

	let selected: Option | Option[] | undefined;

	$: if (Array.isArray(value)) {
		if(value.some((item) => !item?.name)){
			namedQueryStore
				.fetch(query, {
					id: { opr: 'IN', arr: value?.map((item) => item?.id) }
				})
				.then((response) => {
					value = response.data?.roleList;
					selected = value?.map((item) => ({
						label: item?.name,
						value: item?.id
					}));
				});
		} else {
			selected = value?.map((item) => ({
				label: item?.name,
				value: item?.id
			}))
		}
	} else if (value) {
		if (!value.name) {
			namedQueryStore
				.fetch(query, { id: { opr: 'EQ', val: value.id } })
				.then((response) => {
					value = response.data?.roleList?.[0];
					selected = { label: value?.name, value: value?.id };
				});
		} else {
			selected = { label: value?.name, value: value.id };
		}
	}

	let mutation = (): void => {
		dispatch('save', {});
		$open = false;
	};

	let clean = (): void => {
		if (Array.isArray(value)) {
			value = [];
		} else {
			value = null;
		}
		dispatch('save', {});
		$open = false;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

<Td {errors} {zIndex}>
	<a class="link inline-flex truncate" href={null} use:melt={$trigger}>
		{#if list}
			{#if Array.isArray(selected)}
				{#if selected.length > 3}
					{selected
						.map((item) => item?.label)
						.slice(0, 3)
						.join(',')
						.concat('...')}
				{:else if selected.length > 0}
					{selected.map((item) => item?.label).join(',')}
				{:else}
					<Icon src={Minus} class="h-5 w-5" />
				{/if}
			{:else}
				<Icon src={Minus} class="h-5 w-5" />
			{/if}
		{:else if selected}
			{selected.label}
		{:else}
			<Icon src={Minus} class="h-5 w-5" />
		{/if}
	</a>
</Td>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="z-[{zIndex + 5}] {contextClass} {className}" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="flex items-start space-x-1" transition:fade={{ duration: 100 }}>
			<FormControl>
				<RoleSelect
					{name}
					{list}
					{disabled}
					{readonly}
					{placeholder}
					bind:value
					bind:selected
				/>
			</FormControl>
			{#if !readonly}
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.td.save()}>
					<button
						{disabled}
						class="btn btn-square btn-primary"
						on:click|preventDefault={(e) => mutation()}
					>
						<Icon src={Check} class="h-5 w-5" />
					</button>
				</div>
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.td.clear()}>
					<button
						{disabled}
						class="btn btn-square btn-outline btn-error"
						on:click|preventDefault={(e) => clean()}
					>
						<Icon src={XMark} class="h-5 w-5" />
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}