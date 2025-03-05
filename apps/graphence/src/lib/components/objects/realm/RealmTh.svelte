<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Funnel } from '@steeze-ui/heroicons';
	import { hasArguments } from '@graphace/graphql';
	import RealmFilter from '~/lib/components/objects/realm/RealmFilter.svelte';
	import type { RealmExpression } from '~/lib/types/schema';

	export let name: string;
	export let value: RealmExpression | null | undefined = undefined;

	$: filtered = value && hasArguments(value);
</script>

<RealmFilter bind:value let:trigger on:filter>
	<td>
		<a class="link group inline-flex" href={null} use:melt={trigger}>
			{name}
			{#if filtered}
				<span class="flex-none">
					<Icon src={Funnel} class="h-5 w-5" />
				</span>
			{/if}
		</a>
	</td>
</RealmFilter>