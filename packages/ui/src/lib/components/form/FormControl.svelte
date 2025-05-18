<script lang="ts">
	import { getContext } from 'svelte';
	import { nanoid } from 'nanoid';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.form-control') || '';
	const id = nanoid();
</script>

<div class="form-control {className} {contextClass}">
	<slot {id} />
</div>
