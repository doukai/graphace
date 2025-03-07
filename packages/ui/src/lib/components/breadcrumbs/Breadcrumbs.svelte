<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = 'text-sm';
	export { className as class };

	const contextClass = getContext<string>('ui.breadcrumbs') || '';
</script>

<div class="breadcrumbs {className} {contextClass}">
	<ul>
		<slot />
	</ul>
</div>
