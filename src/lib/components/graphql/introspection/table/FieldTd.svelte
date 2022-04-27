<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '$lib/tippy';
	import type { __Field, __FieldFilter } from '$lib/types';
	import FieldInput from '$lib/components/graphql/introspection/FieldInput.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, X, Minus } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let id: string;
	export let __field: __Field;
	export let value: string | number | boolean | null;
	let content: HTMLElement;
	const dispatch = createEventDispatcher<{
		submit: { id: string; __field: __Field; value: string | number | boolean | null };
	}>();

	let mutation = (): void => {
		dispatch('submit', {
			id,
			__field,
			value
		});
	};

	let clean = (): void => {
		dispatch('submit', {
			id,
			__field,
			value: null
		});
	};
</script>

<td>
	<div class="flex" bind:this={content}>
		<FieldInput {__field} placeholder={__field.name} bind:value />
		<div class="tooltip" data-tip={$LL.components.graphql.table.td.save()}>
			<button class="btn btn-square btn-primary ml-1" on:click={() => mutation()}>
				<Icon src={Check} solid class="h-5 w-5" />
			</button>
		</div>
		<div class="tooltip" data-tip={$LL.components.graphql.table.td.clear()}>
			<button class="btn btn-square btn-primary ml-1" on:click={() => clean()}>
				<Icon src={X} solid class="h-5 w-5" />
			</button>
		</div>
	</div>
	<a
		class="group link inline-flex"
		href={null}
		use:tippy={{
			content: content,
			interactive: true,
			arrow: true,
			trigger: 'click',
			interactiveBorder: 30,
			theme: 'daisy',
			maxWidth: 'none'
		}}
	>
		{#if value}
			{value}
		{:else}
			<Icon src={Minus} solid class="h-5 w-5" />
		{/if}
	</a>
</td>
