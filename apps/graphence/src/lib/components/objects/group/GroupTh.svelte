<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Funnel } from '@steeze-ui/heroicons';
	import { hasArguments } from '@graphace/graphql';
	import GroupFilter from '~/lib/components/objects/group/GroupFilter.svelte';
	import type { GroupExpression } from '~/lib/types/schema';

	export let name: string;
	export let value: GroupExpression | null | undefined = undefined;
	export let disabled = false;
	export let required: boolean | undefined = false;
	export let zIndex: number = 0;
	let className: string | undefined = '';
	export { className as class };

	$: filtered = value && hasArguments(value);
</script>

<GroupFilter bind:value {disabled} {zIndex} let:trigger on:filter>
	<td class={className}>
		<a class="link group inline-flex sm:truncate" href={null} use:melt={trigger}>
			{#if required}
				<span data-part="label-required" class="text-error">*</span>
			{/if}
			{name}
			{#if filtered}
				<span class="flex-none">
					<Icon src={Funnel} class="h-5 w-5" />
				</span>
			{/if}
		</a>
	</td>
</GroupFilter>