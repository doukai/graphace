<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { FormItem } from '@graphace/ui';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';

	export let path: string;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	const dispatch = createEventDispatcher<{
		gotoField: { path: string; name: string };
	}>();
</script>

<FormItem {label} let:id>
	<div {id} class="justify-start">
		<div class="tooltip" data-tip={$LL.uiGraphql.table.editBtn()}>
			<button
				class="btn btn-square btn-outline {errors ? 'btn-error' : ''}"
				on:click|preventDefault={(e) => {
					dispatch('gotoField', { path, name });
				}}
			>
				<Icon src={Link} class="h-5 w-5" />
			</button>
		</div>
	</div>
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</FormItem>
