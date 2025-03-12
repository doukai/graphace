<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Toggle } from '@graphace/ui';

	export let id: string = undefined;
	export let name: string = undefined;
	export let value: boolean | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };
</script>

<Toggle {id} {name} bind:value {errors} {readonly} {disabled} class={className} on:change />
