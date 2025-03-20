<script lang="ts">
	import type { Errors } from '@graphace/commons';

	export let errors: Errors | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };
</script>

<td>
	<div
		class="{errors ? `tooltip tooltip-open tooltip-error hover:z-[${zIndex + 3}]` : ''} {className}"
		data-tip={errors?.errors?.map((error) => error.message).join(', ')}
	>
		<slot />
	</div>
</td>
