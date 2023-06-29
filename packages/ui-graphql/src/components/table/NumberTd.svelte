<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import type { __Field, __Type } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { NumberInput, NumberInputList } from '@graphace/ui/components/input';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Minus } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';

	export let value: number | (number | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	let content: HTMLElement;
	const dispatch = createEventDispatcher<{
		save: {};
	}>();

	let mutation = (): void => {
		if (Array.isArray(value)) {
			value = value.filter((item) => item);
		}
		dispatch('save');
	};

	let clean = (): void => {
		if (Array.isArray(value)) {
			value = [];
		} else {
			value = null;
		}
		dispatch('save');
	};
</script>

<div class="flex items-start space-x-1" bind:this={content}>
	{#if Array.isArray(value) || (list && (value === null || value === undefined))}
		<NumberInputList {placeholder} {name} bind:value {errors} {readonly} {disabled} />
	{:else}
		<NumberInput {placeholder} {name} bind:value {errors} {readonly} {disabled} />
	{/if}
	{#if !readonly && !disabled}
		<div class="tooltip" data-tip={$LL.components.graphql.table.td.save()}>
			<button class="btn btn-square btn-primary" on:click={() => mutation()}>
				<Icon src={Check} class="h-5 w-5" />
			</button>
		</div>
		<div class="tooltip" data-tip={$LL.components.graphql.table.td.clear()}>
			<button class="btn btn-square btn-outline btn-error" on:click={() => clean()}>
				<Icon src={XMark} class="h-5 w-5" />
			</button>
		</div>
	{/if}
</div>

<td>
	<div class={errors ? 'border-2 border-error rounded' : ''}>
		<a
			class="group link inline-flex"
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
		>
			{#if Array.isArray(value) || (list && (value === null || value === undefined))}
				{#if value && value.length > 0}
					{#if value && value.length > 3}
						{value
							.filter((item) => item)
							.slice(0, 3)
							.join(',')
							.concat('...')}
					{:else}
						{value.filter((item) => item).join(',')}
					{/if}
				{:else}
					<Icon src={Minus} class="h-5 w-5" />
				{/if}
			{:else if value}
				{value}
			{:else}
				<Icon src={Minus} class="h-5 w-5" />
			{/if}
		</a>
	</div>
</td>
