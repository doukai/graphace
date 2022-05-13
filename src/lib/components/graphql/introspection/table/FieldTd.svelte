<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '$lib/tippy';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Field, __FieldFilter } from '$lib/types';
	import FieldInput from '$lib/components/graphql/introspection/FieldInput.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, X, Minus } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let id: string;
	export let __field: __Field;
	export let value: any;
	let content: HTMLElement;
	const dispatch = createEventDispatcher<{
		submit: {
			id: string;
			__field: __Field;
			value: string | number | boolean | string[] | number[] | boolean[];
		};
	}>();

	const manager: TypeManager = new TypeManager();

	let mutation = (): void => {
		if (manager.fieldIsList(__field.type)) {
			value = value.filter((item) => item);
		}
		dispatch('submit', {
			id,
			__field,
			value
		});
	};

	let clean = (): void => {
		if (manager.fieldIsList(__field.type)) {
			value = [];
		} else {
			value = null;
		}
		dispatch('submit', {
			id,
			__field,
			value
		});
	};
</script>

<div class="flex items-start space-x-1" bind:this={content}>
	<FieldInput {__field} placeholder={__field.name} bind:value />
	<div class="tooltip" data-tip={$LL.components.graphql.table.td.save()}>
		<button class="btn btn-square btn-primary" on:click={() => mutation()}>
			<Icon src={Check} solid class="h-5 w-5" />
		</button>
	</div>
	<div class="tooltip" data-tip={$LL.components.graphql.table.td.clear()}>
		<button class="btn btn-square btn-outline btn-error" on:click={() => clean()}>
			<Icon src={X} solid class="h-5 w-5" />
		</button>
	</div>
</div>

<td>
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
		{#if manager.fieldIsList(__field.type)}
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
				<Icon src={Minus} solid class="h-5 w-5" />
			{/if}
		{:else if value}
			{value}
		{:else}
			<Icon src={Minus} solid class="h-5 w-5" />
		{/if}
	</a>
</td>
