<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import type { NamedStruct } from '@graphace/graphql';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let path: string;
	export let name: string;
	export let namedStruct: NamedStruct | (NamedStruct | null | undefined)[] | null | undefined =
		undefined;
	export let errors: Errors | undefined = undefined;
	export let disabled = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	let _namedStruct = namedStruct;
	namedStruct = undefined;

	const dispatch = createEventDispatcher<{
		goto: { path: string; name: string };
	}>();
</script>

<div class="flex items-center">
	{#if _namedStruct && Array.isArray(_namedStruct) && _namedStruct.length > 0}
		<a
			{id}
			class="link {errors ? 'link-error' : ''}"
			href={null}
			on:click|preventDefault={(e) => {
				dispatch('goto', { path, name });
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
	{:else if _namedStruct && !Array.isArray(_namedStruct)}
		<a
			{id}
			class="link {errors ? 'link-error' : ''}"
			href={null}
			on:click|preventDefault={(e) => {
				dispatch('goto', { path, name });
			}}
		>
			{_namedStruct.name}
		</a>
	{:else}
		<div class="tooltip hover:z-[{zIndex + 3}]" data-tip={$LL.ui_graphql.table.editBtn()}>
			<button
				{id}
				{disabled}
				class="btn btn-square btn-outline {errors ? 'btn-error' : ''} {className}"
				on:click|preventDefault={(e) => {
					dispatch('goto', { path, name });
				}}
			>
				<Icon src={Link} class="h-5 w-5" />
			</button>
		</div>
	{/if}
</div>
