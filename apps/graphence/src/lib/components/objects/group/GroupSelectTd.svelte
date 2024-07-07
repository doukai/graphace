<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import type { Option } from '@graphace/ui';
	import GroupSelect from './GroupSelect.svelte';
	import type { GroupInput } from '$houdini';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Minus } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	const dispatch = createEventDispatcher<{
		save: {};
	}>();

	let selected: Option | Option[] | undefined;

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
		selected = value?.map((item) => ({
			label: item?.name,
			value: item?.id
		}));
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
	} else if (value) {
		selected = { label: value.name, value: value.id };
		value = { where: { id: { val: value.id } } };
	}
</script>

<td>
	<div
		class={errors ? 'tooltip tooltip-open tooltip-error hover:z-30' : ''}
		data-tip={errors?.errors?.map((error) => error.message).join(', ')}
	>
		<a class="group link inline-flex" href={null} use:melt={$trigger}>
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
	</div>
</td>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[50]" />
	<div class="p-1 rounded-xl bg-base-100 shadow z-[50]" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="flex items-start space-x-1" transition:fade={{ duration: 100 }}>
			<GroupSelect
				{name}
				{list}
				{disabled}
				{readonly}
				{placeholder}
				className="md:input-xs"
				containerClassName="max-w-96 md:textarea-sm"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				bind:value
				bind:selected
			/>
			{#if !readonly && !disabled}
				<div class="tooltip flex items-center" data-tip={$LL.uiGraphql.table.td.save()}>
					<button
						class="btn btn-square btn-primary md:btn-sm"
						on:click|preventDefault={(e) => mutation()}
					>
						<Icon src={Check} class="h-5 w-5" />
					</button>
				</div>
				<div class="tooltip flex items-center" data-tip={$LL.uiGraphql.table.td.clear()}>
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