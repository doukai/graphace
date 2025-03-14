<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { z_index } from '@graphace/ui';
	import RealmSelect from './RealmSelect.svelte';
	import type { RealmInput } from '~/lib/types/schema';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Minus } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		save: {};
	}>();

	const z_class3 = z_index.top(3);
	const z_class9 = z_index.top(9);

	let selected: RealmInput | (RealmInput | null | undefined)[] | null | undefined;
	selected = value;

	let mutation = (): void => {
		dispatch('save', {});
		$open = false;
	};

	let clean = (): void => {
		if (Array.isArray(value)) {
			value = [];
			selected = [];
		} else {
			value = null;
			selected = undefined;
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

	if (Array.isArray(value)) {
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
	} else if (value) {
		value = { where: { id: { val: value.id } } };
	}
</script>

<td>
	<div
		class={errors ? 'tooltip tooltip-open tooltip-error hover:{z_class3}' : ''}
		data-tip={errors?.errors?.map((error) => error.message).join(', ')}
	>
		<a class="group link inline-flex" href={null} use:melt={$trigger}>
			{#if list}
				{#if Array.isArray(selected)}
					{#if selected.length > 3}
						{selected
							.map((item) => item?.name)
							.slice(0, 3)
							.join(',')
							.concat('...')}
					{:else if selected.length > 0}
						{selected.map((item) => item?.name).join(',')}
					{:else}
						<Icon src={Minus} class="h-5 w-5" />
					{/if}
				{:else}
					<Icon src={Minus} class="h-5 w-5" />
				{/if}
			{:else if selected}
				{selected.name}
			{:else}
				<Icon src={Minus} class="h-5 w-5" />
			{/if}
		</a>
	</div>
</td>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 {z_class9}" />
	<div class="p-1 rounded-xl bg-base-100 shadow {z_class9}" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="flex items-start space-x-1" transition:fade={{ duration: 100 }}>
			<RealmSelect
				{name}
				{list}
				{disabled}
				{readonly}
				{placeholder}
				className="md:input-xs"
				containerClassName="md:textarea-sm md:min-h-6"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				bind:value={selected}
				on:change={(e) => {
					if (Array.isArray(e.detail.value)) {
						value = e.detail.value.map((item) => ({ where: { id: { val: item?.id } } }));
					} else if (e.detail.value && !Array.isArray(e.detail.value)) {
						value = { where: { id: { val: e.detail.value.id } } };
					} else {
						value = undefined;
					}
				}}
			/>
			{#if !readonly && !disabled}
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.td.save()}>
					<button
						class="btn btn-square btn-primary md:btn-sm"
						on:click|preventDefault={(e) => mutation()}
					>
						<Icon src={Check} class="h-5 w-5" />
					</button>
				</div>
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.td.clear()}>
					<button
						class="btn btn-square btn-outline btn-error md:btn-sm"
						on:click|preventDefault={(e) => clean()}
					>
						<Icon src={XMark} class="h-5 w-5" />
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}