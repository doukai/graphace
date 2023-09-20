<script context="module" lang="ts">
	export type GroupTree = NodeTree<Group>;
</script>

<script lang="ts">
	import { graphql } from '$houdini';
	import { type NodeTree, buildTree } from '@graphace/commons/utils/tree-util';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import GroupTreeMenu from './GroupTreeMenu.svelte';
	import type { Group } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let nodeTree: GroupTree;
	export let currentDeep = 0;
	export let deeps = 2;

	const GroupNodesQuery = graphql(`
		query GroupNodesQuery($path: String, $deep: Int) {
			groupList(deep: { opr: LT, val: $deep }, path: { opr: LK, val: $path }) {
				id
				name
				path
				deep
				parent {
					id
				}
			}
		}
	`);

	$: nodeEntryArray = Array.from(nodeTree.entries());
</script>

<ul class={currentDeep ? '' : 'menu bg-base-200 w-56 rounded-box'}>
	{#each nodeEntryArray as nodeEntry}
		<li>
			<a
				href={null}
				on:click={(e) => {
					e.preventDefault();
					GroupNodesQuery.fetch({
						variables: { deep: currentDeep + deeps, path: nodeEntry[0].path }
					})
						.then((result) => {
							nodeEntry[1] = buildTree(
								result.data?.groupList || [],
								(current, parent) => current?.parent?.id === parent?.id,
								nodeEntry[0]
							);
						})
						.catch((errors) => {
							console.error(errors);
							notifications.error($LL.web.message.requestFailed());
						});
				}}
			>
				{nodeEntry[0].name}
			</a>
			{#if nodeEntry[1]}
				<GroupTreeMenu nodeTree={nodeEntry[1]} currentDeep={currentDeep + 1} {deeps} />
			{/if}
		</li>
	{/each}
</ul>
