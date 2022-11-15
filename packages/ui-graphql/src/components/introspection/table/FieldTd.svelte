<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import type { __Field, __Type } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import FieldInput from '../FieldInput.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, X, Minus } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	export let id: string;
	export let __field: __Field;
	export let value: any;
	let content: HTMLElement;
	const dispatch = createEventDispatcher<{
		save: {
			id: string;
			__field: __Field;
			resolve: (value: any) => void;
			reject: (error: Error) => void;
		};
	}>();

	const manager: TypeManager = new TypeManager();
	let error: Error = null;

	let mutation = (): void => {
		if (manager.fieldIsList(__field.type)) {
			value = value.filter((item: any) => item);
		}
		dispatch('save', {
			id,
			__field,
			resolve: (savedValue) => {
				error = null;
				value = savedValue;
			},
			reject: (validError) => {
				error = validError;
			}
		});
	};

	let clean = (): void => {
		if (manager.fieldIsList(__field.type)) {
			value = [];
		} else {
			value = null;
		}
		dispatch('save', {
			id,
			__field,
			resolve: (savedValue) => {
				error = null;
				value = savedValue;
			},
			reject: (validError) => {
				error = validError;
			}
		});
	};
</script>

<div class="flex items-start space-x-1" bind:this={content}>
	<FieldInput {__field} placeholder={__field.name} bind:value {error} />
	<div class="tooltip" data-tip={$LL.components.graphql.table.td.save()}>
		<button class="btn btn-square btn-primary" on:click={() => mutation()}>
			<Icon src={Check} solid class="h-5 w-5" />
		</button>
	</div>
	<div class="tooltip" data-tip={$LL.components.graphql.table.td.clear()}>
		<button class="btn btn-square btn-outline btn-error" on:click={() => clean()}>
			<Icon src={X} solid class="h-5 w-5" />
		</button>
	</div>
</div>

<td>
	<a
		class="group link inline-flex"
		href={null}
		use:tippy={{
			content,
			placement: 'bottom',
			interactive: true,
			arrow: true,
			trigger: 'click',
			interactiveBorder: 30,
			theme: 'daisy',
			maxWidth: 'none',
			appendTo: () => document.body
		}}
	>
		{#if manager.fieldIsList(__field.type)}
			{#if value && value.length > 0}
				{#if value && value.length > 3}
					{value
						.filter((item) => item)
						.slice(0, 3)
						.join(',')
						.concat('...')}
				{:else}
					{value.filter((item) => item).join(',')}
				{/if}
			{:else}
				<Icon src={Minus} solid class="h-5 w-5" />
			{/if}
		{:else if value}
			{value}
		{:else}
			<Icon src={Minus} solid class="h-5 w-5" />
		{/if}
	</a>
</td>
