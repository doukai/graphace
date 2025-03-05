<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.form') || '';
</script>

<form>
	<div class="{className} {contextClass}">
		<slot />
	</div>
</form>
