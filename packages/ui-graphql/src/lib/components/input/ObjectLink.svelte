<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let path: string;
	export let name: string | undefined = undefined;
	export let value: any = undefined;
	export let textFieldName: string | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let disabled = false;
	let className: string | undefined = 'btn-link p-0';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	export let text: string | undefined = $LL.ui_graphql.table.editBtn();

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
			} else {
				text = value
					.map((node) => node?.[textFieldName])
					.filter((name) => name !== null)
					.join(',');
			}
			value = undefined;
		}
	} else if (value) {
		if (textFieldName) {
			text = value?.[textFieldName] + '';
		}
		value = undefined;
	}
</script>

{#if disabled}
	{text}
{:else}
	<a
		{id}
		class="link truncate {errors ? 'link-error' : ''} {className}"
		href={null}
		on:click|preventDefault={(e) => {
			dispatch('goto', { path, name });
		}}
	>
		{text}
	</a>
{/if}
