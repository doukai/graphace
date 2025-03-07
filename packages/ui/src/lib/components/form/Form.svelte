<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.form') || '';
</script>

<form>
	<div style="z-index: {zIndex || 'auto'};" class="{className} {contextClass}">
		<slot />
	</div>
</form>
