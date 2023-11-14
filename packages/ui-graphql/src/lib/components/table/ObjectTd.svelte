<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let path: string;
	export let name: string;
	export let namedStruct:
		| { name: string; description: string | null | undefined }
		| ({ name: string; description: string | null | undefined } | null | undefined)[]
		| null
		| undefined = undefined;
	export let errors: Errors | undefined = undefined;

	const dispatch = createEventDispatcher<{
		gotoField: { path: string; name: string };
	}>();
</script>

<td>
	<div
		class={errors ? 'tooltip tooltip-open tooltip-error hover:z-30' : ''}
		data-tip={errors?.errors?.map((error) => error.message).join(', ') ||
			Object.values(errors.iterms)
				.flatMap((error) => error.errors)
				.join(', ')}
	>
		<div class="tooltip hover:z-30" data-tip={$LL.uiGraphql.table.editBtn()}>
			{#if namedStruct}
				{#if Array.isArray(namedStruct)}
					{#if namedStruct.length > 0}
						<a
							class="group link inline-flex"
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
							class="btn btn-square btn-xs btn-ghost"
							on:click|preventDefault={(e) => {
								dispatch('gotoField', { path, name });
							}}
						>
							<Icon src={Link} class="h-5 w-5" />
						</button>
					{/if}
				{:else}
					<a
						class="group link inline-flex"
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
					class="btn btn-square btn-xs btn-ghost"
					on:click|preventDefault={(e) => {
						dispatch('gotoField', { path, name });
					}}
				>
					<Icon src={Link} class="h-5 w-5" />
				</button>
			{/if}
		</div>
	</div>
</td>
