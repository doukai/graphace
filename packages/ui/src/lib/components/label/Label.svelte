<script lang="ts">
	import { getContext } from 'svelte';

	export let text: string;
	export let id: string;
	export let required: boolean | undefined = false;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.label') || '';
</script>

<label for={id} class="label">
	<span class="label-text {className} {contextClass}">
		{#if required}
			<span class="text-error">*</span>
		{/if}
		{text}
	</span>
</label>
