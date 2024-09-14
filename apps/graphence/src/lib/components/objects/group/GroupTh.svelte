<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Funnel } from '@steeze-ui/heroicons';
	import GroupFilter from '~/lib/components/objects/group/GroupFilter.svelte';
	import type { GroupExpression } from '$houdini';

	export let name: string;
	export let expression: GroupExpression | null | undefined;
</script>

<GroupFilter bind:expression let:trigger on:filter>
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
</GroupFilter>