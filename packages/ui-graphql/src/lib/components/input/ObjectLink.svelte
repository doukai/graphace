<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Minus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';

	export let id: string | undefined = undefined;
	export let path: string;
	export let name: string | undefined = undefined;
	export let value: any = undefined;
	export let textFieldName: string | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	let className: string | undefined = 'h-full content-center self-center';
	export { className as class };

	export let text: string | undefined = undefined;

	const dispatch = createEventDispatcher<{
		goto: { path: string; name: string | undefined };
	}>();

	$: if (Array.isArray(value)) {
		if (textFieldName) {
			if (value.length > 3) {
				text = value
					.slice(0, 3)
					.map((node) => node?.[textFieldName])
					.filter((name) => name !== null)
					.join(',')
					.concat('...');
			} else if (value.length > 0) {
				text = value
					.map((node) => node?.[textFieldName])
					.filter((name) => name !== null)
					.join(',');
			}
		}
	} else if (value) {
		if (textFieldName) {
			text = value?.[textFieldName];
		}
	}
</script>

<a
	{id}
	class="link truncate {errors ? 'link-error' : ''} {className}"
	href={null}
	on:click|preventDefault={(e) => {
		dispatch('goto', { path, name });
	}}
>
	{#if text !== null && text !== undefined}
		{text}
	{:else}
		<Icon src={Minus} class="h-5 w-5" />
	{/if}
</a>
