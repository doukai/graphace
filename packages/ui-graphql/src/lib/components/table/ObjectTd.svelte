<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import type { NamedStruct } from '@graphace/graphql';
	import ObjectLink from '../input/ObjectLink.svelte';
	import { Td } from '@graphace/ui';

	export let path: string;
	export let name: string;
	export let namedStruct: NamedStruct | (NamedStruct | null | undefined)[] | null | undefined =
		undefined;
	export let errors: Errors | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'btn-xs';
	export { className as class };
</script>

<Td {errors} {zIndex}>
	<ObjectLink {path} {name} {namedStruct} {errors} class={className} {zIndex} on:goto />
</Td>
