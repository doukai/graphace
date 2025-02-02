<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Funnel } from '@steeze-ui/heroicons';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import type { UserExpression } from '~/lib/types/schema';

	export let name: string;
	export let expression: UserExpression | null | undefined;
</script>

<UserFilter bind:expression let:trigger on:filter>
	<td>
		<a class="link group inline-flex" href={null} use:melt={trigger}>
			{name}
			{#if expression && Object.keys(expression).length > 0}
				<span class="flex-none">
					<Icon src={Funnel} class="h-5 w-5" />
				</span>
			{/if}
		</a>
	</td>
</UserFilter>