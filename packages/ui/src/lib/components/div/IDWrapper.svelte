<script lang="ts">
	import { nanoid } from 'nanoid';

	let className: string | undefined = '';
	export { className as class };
	const id = nanoid();
</script>

<div class={className}>
	<slot {id} />
</div>
