<script lang="ts">
	import { getContext } from 'svelte';

	export let text: string | undefined = '';
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.button') || '';
</script>

<div class="tooltip" data-tip={text}>
	<button class="btn {className} {contextClass} md:hidden" on:click>
		<slot name="sm">
			{text}
		</slot>
	</button>
</div>
<button class="btn {className} {contextClass} max-md:hidden" on:click>
	<slot>
		{text}
	</slot>
</button>
