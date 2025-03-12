<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ToggleList } from '@graphace/ui';

	export let id: string = undefined;
	export let name: string = undefined;
	export let value: (boolean | null | undefined)[] | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };
</script>

<ToggleList {id} bind:value {errors} {readonly} {disabled} class={className} on:change />
