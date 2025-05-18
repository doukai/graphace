<script lang="ts">
	import type { Errors } from '@graphace/commons';

	export let errors: Errors | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };
</script>

<td class={className}>
	<div
		class={errors ? `tooltip tooltip-open tooltip-error hover:z-[${zIndex + 3}]` : undefined}
		data-tip={errors ? errors?.errors?.map((error) => error.message).join(', ') : undefined}
	>
		<slot />
	</div>
</td>
