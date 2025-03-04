<script lang="ts">
	import { getContext } from 'svelte';

	export let title: string;
	let className: string | undefined = 'text-xl font-semibold';
	export { className as class };

	const contextClass = getContext<string>('ui.title') || '';
</script>

<div class="hidden md:flex md:items-center">
	<span class="{className} {contextClass}">{title}</span>
</div>
