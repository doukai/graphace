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

	export let nodeTrees: GroupTree[] | null | undefined;
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
</script>

<ul class={currentDeep ? '' : 'menu'}>
	{#if nodeTrees}
		{#each nodeTrees as nodeTree}
			<li>
				<a
					href={null}
					on:click={(e) => {
						e.preventDefault();
						GroupNodesQuery.fetch({
							variables: { deep: currentDeep + deeps, path: nodeTree.node.path }
						})
							.then((result) => {
								nodeTree.children = buildTree(
									result.data?.groupList,
									(current, parent) => current?.parent?.id === parent?.id,
									nodeTree.node
								);
							})
							.catch((errors) => {
								console.error(errors);
								notifications.error($LL.web.message.requestFailed());
							});
					}}
				>
					{nodeTree.node.name}
				</a>
				{#if nodeTree.children}
					<GroupTreeMenu nodeTrees={nodeTree.children} currentDeep={currentDeep + 1} {deeps} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
