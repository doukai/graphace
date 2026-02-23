<script lang="ts">
	import { getContext } from 'svelte';
	import { nanoid } from 'nanoid';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('tr') || '';
	const id = nanoid();
</script>

<tr data-element="tr" data-part="root" class="{contextClass} {className}">
	<slot {id} />
</tr>
