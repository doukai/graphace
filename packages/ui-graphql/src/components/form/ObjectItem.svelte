<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Error } from '@graphace/commons/types';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';
	import { FormItem } from '@graphace/ui/components/form';
	import LL from '~/i18n/i18n-svelte';

	export let path: string;
	export let label: string;
	export let error: Error | undefined = undefined;

	const dispatch = createEventDispatcher<{
		gotoField: { path: string };
	}>();
</script>

<FormItem {label} let:id>
	<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
		<button
			class="btn btn-square btn-outline"
			on:click={(e) => {
				e.preventDefault();
				dispatch('gotoField', { path: path });
			}}
		>
			<Icon src={Link} solid class="h-5 w-5" />
		</button>
	</div>
	{#if error && error.message}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</FormItem>
