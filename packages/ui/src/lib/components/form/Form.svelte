<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.form') || '';
</script>

<form>
	<div class="z-[{zIndex}] {className} {contextClass}">
		<slot />
	</div>
</form>
