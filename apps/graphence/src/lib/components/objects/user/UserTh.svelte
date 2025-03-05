<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Funnel } from '@steeze-ui/heroicons';
	import { hasArguments } from '@graphace/graphql';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import type { UserExpression } from '~/lib/types/schema';

	export let name: string;
	export let value: UserExpression | null | undefined = undefined;

	$: filtered = value && hasArguments(value);
</script>

<UserFilter bind:value let:trigger on:filter>
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
</UserFilter>