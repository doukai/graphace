<script lang="ts">
	import { getContext } from 'svelte';

	let open: boolean | undefined = true;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.details') || '';
</script>

<details data-part="menu-details" {open} class="{contextClass} {className}">
	<summary><slot name="summary" /></summary>
	<ul>
		<slot />
	</ul>
</details>
