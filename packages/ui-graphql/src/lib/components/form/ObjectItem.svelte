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
	export let namedStruct:
		| { name: string; description: string | null | undefined }
		| ({ name: string; description: string | null | undefined } | null | undefined)[]
		| null
		| undefined = undefined;
	export let errors: Errors | undefined = undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	const dispatch = createEventDispatcher<{
		gotoField: { path: string; name: string };
	}>();
</script>

<FormItem {label} let:id>
	<div {id} class="justify-start">
		<div class="tooltip" data-tip={$LL.uiGraphql.table.editBtn()}>
			{#if namedStruct}
				{#if Array.isArray(namedStruct)}
					{#if namedStruct.length > 0}
						<a
							class="group link inline-flex {errors ? 'link-error' : ''}"
							href={null}
							on:click|preventDefault={(e) => {
								dispatch('gotoField', { path, name });
							}}
						>
							{#if namedStruct && namedStruct.length > 3}
								{namedStruct
									.map((item) => item.name)
									.slice(0, 3)
									.join(',')
									.concat('...')}
							{:else}
								{namedStruct.map((item) => item.name).join(',')}
							{/if}
						</a>
					{:else}
						<button
							class="btn btn-square btn-outline {errors ? 'btn-error' : ''}"
							on:click|preventDefault={(e) => {
								dispatch('gotoField', { path, name });
							}}
						>
							<Icon src={Link} class="h-5 w-5" />
						</button>
					{/if}
				{:else}
					<a
						class="group link inline-flex {errors ? 'link-error' : ''}"
						href={null}
						on:click|preventDefault={(e) => {
							dispatch('gotoField', { path, name });
						}}
					>
						{namedStruct.name}
					</a>
				{/if}
			{:else}
				<button
					class="btn btn-square btn-outline {errors ? 'btn-error' : ''}"
					on:click|preventDefault={(e) => {
						dispatch('gotoField', { path, name });
					}}
				>
					<Icon src={Link} class="h-5 w-5" />
				</button>
			{/if}
		</div>
	</div>
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
	{#if errors?.iterms}
		<label for={id} class="label">
			{#each Object.values(errors?.iterms) as itermErrors}
				{#if itermErrors?.errors}
					{#each itermErrors.errors as error}
						<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
					{/each}
				{/if}
			{/each}
		</label>
	{/if}
</FormItem>
