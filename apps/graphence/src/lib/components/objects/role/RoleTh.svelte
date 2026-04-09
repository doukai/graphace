<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { BarsArrowDown, BarsArrowUp, Funnel } from '@steeze-ui/heroicons';
	import { hasArguments, hasAsc, hasDesc } from '@graphace/graphql';
	import { Td } from '@graphace/ui';
	import RoleFilter from '~/lib/components/objects/role/RoleFilter.svelte';
	import type { RoleExpression, RoleOrderBy } from '~/lib/types/schema';

	export let name: string;
	export let value: RoleExpression | null | undefined = undefined;
	export let orderBy: RoleOrderBy | null | undefined = undefined;
	export let disabled = false;
	export let required: boolean | undefined = false;
	export let zIndex: number = 0;
	let className: string | undefined = '';
	export { className as class };

	$: filtered = value && hasArguments(value);
	$: asc = orderBy && hasAsc(orderBy);
	$: desc = orderBy && hasDesc(orderBy);
</script>

<RoleFilter bind:value bind:orderBy {disabled} {zIndex} let:trigger on:filter>
	<Td class={className}>
		<a class="link group inline-flex" href={null} use:melt={trigger}>
			{#if required}
				<span data-part="label-required" class="text-error">*</span>
			{/if}
			{name}
			{#if filtered}
				<span class="flex-none">
					<Icon src={Funnel} class="h-5 w-5" />
				</span>
			{/if}
			{#if asc}
				<span class="ml-1 flex-none">
					<Icon src={BarsArrowDown} class="h-5 w-5" />
				</span>
			{/if}
			{#if desc}
				<span class="ml-1 flex-none">
					<Icon src={BarsArrowUp} class="h-5 w-5" />
				</span>
			{/if}
		</a>
	</Td>
</RoleFilter>