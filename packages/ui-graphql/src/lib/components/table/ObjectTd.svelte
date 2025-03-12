<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import type { NamedStruct } from '@graphace/graphql';
	import ObjectLink from '../input/ObjectLink.svelte';

	export let path: string;
	export let name: string;
	export let namedStruct: NamedStruct | (NamedStruct | null | undefined)[] | null | undefined =
		undefined;
	export let errors: Errors | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'btn-xs';
	export { className as class };
</script>

<td>
	<div
		class="{errors ? `tooltip tooltip-open tooltip-error hover:z-[${zIndex + 3}]` : ''} {className}"
		data-tip={errors?.errors?.map((error) => error.message).join(', ')}
	>
		<ObjectLink {path} {name} {namedStruct} {errors} class={className} on:gotoField />
	</div>
</td>
