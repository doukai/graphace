<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.form') || '';
</script>

<form data-element="form" data-part="root" class="z-[{zIndex}] {className} {contextClass}">
	<slot />
</form>
