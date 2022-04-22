<script lang="ts">
	import { tippy } from '$lib/tippy';
	import type { __Field } from '$lib/types/__Field';
	import type { __FieldFilter } from '$lib/types/__FieldFilter';
	import FieldInput from './FieldInput.svelte';
	export let id: string;
	export let __field: __Field;
	export let value: string | number | boolean | null;
	export let mutationField: Function;
	let content: HTMLElement;

	let mutation = (): void => {
		mutationField(id, __field, value);
	};

	let clean = (): void => {
		value = null;
		mutationField(id, __field, value);
	};
</script>

<td>
	<div class="flex" bind:this={content}>
		<FieldInput {__field} placeholder={__field.name} bind:value />
		<button class="btn btn-square btn-primary ml-1" on:click={() => mutation()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
		<button class="btn btn-square btn-primary ml-1" on:click={() => clean()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
	</a>
</td>
