<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import type { NamedStruct } from '@graphace/graphql';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let path: string;
	export let name: string;
	export let namedStruct: NamedStruct | (NamedStruct | null | undefined)[] | null | undefined =
		undefined;
	export let errors: Errors | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	let _namedStruct = namedStruct;
	namedStruct = undefined;

	const dispatch = createEventDispatcher<{
		gotoField: { path: string; name: string };
	}>();
</script>

<td>
	<div
		class="{errors ? `tooltip tooltip-open tooltip-error hover:z-[${zIndex + 3}]` : ''} {className}"
		data-tip={(errors?.errors || [])
			.concat(
				(errors?.iterms ? Object.values(errors?.iterms) : []).flatMap((error) => error.errors)
			)
			?.slice(0, 2)
			.map((error) => error.message)
			.join(', ')}
	>
		<div class="tooltip hover:z-[${zIndex + 3}]" data-tip={$LL.ui_graphql.table.editBtn()}>
			{#if _namedStruct}
				{#if Array.isArray(_namedStruct)}
					{#if _namedStruct.length > 0 && _namedStruct.some((item) => item.name)}
						<a
							class="link"
							href={null}
							on:click|preventDefault={(e) => {
								dispatch('gotoField', { path, name });
							}}
						>
							{#if _namedStruct && _namedStruct.length > 3}
								{_namedStruct
									.map((item) => item.name)
									.slice(0, 3)
									.join(',')
									.concat('...')}
							{:else}
								{_namedStruct.map((item) => item.name).join(',')}
							{/if}
						</a>
					{:else}
						<button
							class="btn btn-square btn-xs btn-ghost"
							on:click|preventDefault={(e) => {
								dispatch('gotoField', { path, name });
							}}
						>
							<slot>
								<Icon src={Link} class="h-5 w-5" />
							</slot>
						</button>
					{/if}
				{:else if _namedStruct.name}
					<a
						class="link"
						href={null}
						on:click|preventDefault={(e) => {
							dispatch('gotoField', { path, name });
						}}
					>
						{_namedStruct.name}
					</a>
				{:else}
					<button
						class="btn btn-square btn-xs btn-ghost"
						on:click|preventDefault={(e) => {
							dispatch('gotoField', { path, name });
						}}
					>
						<slot>
							<Icon src={Link} class="h-5 w-5" />
						</slot>
					</button>
				{/if}
			{:else}
				<button
					class="btn btn-square btn-xs btn-ghost"
					on:click|preventDefault={(e) => {
						dispatch('gotoField', { path, name });
					}}
				>
					<slot>
						<Icon src={Link} class="h-5 w-5" />
					</slot>
				</button>
			{/if}
		</div>
	</div>
</td>
