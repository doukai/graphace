<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { getContext } from 'svelte';

	export let errors: Errors | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.td') || '';
</script>

<td data-element="td" data-part="root" class="{className} {contextClass}">
	<div
		data-part="tooltip"
		class={errors ? `tooltip tooltip-open tooltip-error hover:z-[${zIndex + 3}]` : undefined}
		data-tip={errors ? errors?.errors?.map((error) => error.message).join(', ') : undefined}
	>
		<slot />
	</div>
</td>
