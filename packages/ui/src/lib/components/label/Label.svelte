<script lang="ts">
	import { getContext } from 'svelte';

	export let text: string;
	export let id: string;
	export let required: boolean | undefined = false;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.label') || '';
</script>

<label data-element="label" data-part="root" for={id} class="label {contextClass} {className}">
	<span data-part="label-text" class="label-text">
		{#if required}
			<span data-part="label-required" class="text-error">*</span>
		{/if}
		{text}
	</span>
</label>
