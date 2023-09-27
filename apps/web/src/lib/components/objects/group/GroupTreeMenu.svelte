<script context="module" lang="ts">
	export type GroupTree = NodeTree<Group>;
</script>

<script lang="ts">
	import { graphql, Operator } from '$houdini';
	import { type NodeTree, buildTree } from '@graphace/commons/utils/tree-util';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import MenuTreeLoading from '@graphace/ui/components/menu/MenuTreeLoading.svelte';
	import GroupTreeMenu from './GroupTreeMenu.svelte';
	import type { Group } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	export let nodeTrees: GroupTree[] | null | undefined = undefined;
	export let currentDeep = 0;
	export let deeps = 2;
	export let groupName: string | null | undefined = undefined;
	export let activeGroupId: string | null | undefined = undefined;

	const GroupNodesQuery = graphql(`
		query GroupNodesQuery($path: StringExpression, $deep: IntExpression, $name: StringExpression) {
			groupList(deep: $deep, path: $path, name: $name) {
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

	$: if (groupName) {
		let variables = {
			deep: undefined,
			path: undefined,
			name: { opr: Operator.LK, val: `%${groupName}%` }
		};
		GroupNodesQuery.fetch({ variables })
			.then((result) => {
				nodeTrees = buildTree(
					result.data?.groupList,
					(current, parent) => current?.parent?.id === parent?.id
				);
			})
			.catch((errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			});
	} else if (currentDeep === 0) {
		let variables = {
			deep: { opr: Operator.LT, val: deeps },
			path: { opr: Operator.LK, val: '/%' },
			name: undefined
		};
		GroupNodesQuery.fetch({ variables })
			.then((result) => {
				nodeTrees = buildTree(
					result.data?.groupList,
					(current, parent) => current?.parent?.id === parent?.id
				);
			})
			.catch((errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			});
	}
</script>

<ul class={currentDeep ? '' : 'menu'}>
	{#if nodeTrees}
		{#each nodeTrees as nodeTree}
			<li>
				<a
					class={nodeTree.node.id === activeGroupId ? 'active' : ''}
					href={null}
					on:click={(e) => {
						e.preventDefault();
						activeGroupId = nodeTree.node.id;
						GroupNodesQuery.fetch({
							variables: {
								deep: { opr: Operator.LT, val: currentDeep + deeps },
								path: {
									opr: Operator.LK,
									val: `${(nodeTree.node.path || '') + (nodeTree.node.id || '') + '/'}%`
								}
							}
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
				{#if $GroupNodesQuery.fetching}
					<MenuTreeLoading />
				{:else if nodeTree.children}
					<GroupTreeMenu
						bind:activeGroupId
						nodeTrees={nodeTree.children}
						currentDeep={currentDeep + 1}
						{deeps}
					/>
				{/if}
			</li>
		{/each}
	{/if}
</ul>
