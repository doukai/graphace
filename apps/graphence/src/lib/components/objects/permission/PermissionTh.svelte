<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Funnel } from '@steeze-ui/heroicons';
	import { hasArguments } from '@graphace/graphql';
	import PermissionFilter from '~/lib/components/objects/permission/PermissionFilter.svelte';
	import type { PermissionExpression } from '~/lib/types/schema';

	export let name: string;
	export let value: PermissionExpression | null | undefined = undefined;

	$: filtered = value && hasArguments(value);
</script>

<PermissionFilter bind:value let:trigger on:filter>
	<td>
		<a class="link group inline-flex truncate" href={null} use:melt={trigger}>
			{name}
			{#if filtered}
				<span class="flex-none">
					<Icon src={Funnel} class="h-5 w-5" />
				</span>
			{/if}
		</a>
	</td>
</PermissionFilter>