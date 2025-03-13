<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import type { NamedStruct } from '@graphace/graphql';
	import ObjectLink from './ObjectLink.svelte';

	export let id: string = undefined;
	export let path: string;
	export let name: string;
	export let namedStruct: NamedStruct | (NamedStruct | null | undefined)[] | null | undefined =
		undefined;
	export let errors: Errors | undefined = undefined;
	export let disabled = false;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<ObjectLink {path} {name} {namedStruct} {errors} {disabled} class={className} on:gotoField />
{#if errors}
	<label for={id} class="label">
		{#each (errors?.errors || [])
			.concat((errors?.iterms ? Object.values(errors?.iterms) : []).flatMap((error) => error.errors))
			?.slice(0, 2) as error}
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		{/each}
	</label>
{/if}
