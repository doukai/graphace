<script context="module" lang="ts">
	export type GroupTree = NodeTree<Group>;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { GraphQLError } from '@graphace/commons/types';
	import type { NodeTree } from '@graphace/commons/utils/tree-util';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import GroupTreeMenu from './GroupTreeMenu.svelte';
	import type { Group } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let nodeTrees: GroupTree[] | null | undefined;
	export let currentDeep = 0;
	export let deeps = 2;
	export let activeId: string | null | undefined = undefined;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: { deep: number; path: string; nodeTree: GroupTree };
			then: (data: GroupTree[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
	}>();

	const fetch = (
		event: CustomEvent<{
			args: { deep: number; path: string; nodeTree: GroupTree };
			then: (data: GroupTree[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		dispatch('fetch', event.detail);
	};
</script>

<ul class={currentDeep ? '' : 'menu'}>
	{#if nodeTrees}
		{#each nodeTrees as nodeTree}
			<li>
				<a
					class={nodeTree.node.id === activeId ? 'active' : ''}
					href={null}
					on:click={(e) => {
						e.preventDefault();
						activeId = nodeTree.node.id;
						dispatch('fetch', {
							args: {
								deep: currentDeep + deeps,
								path: `${nodeTree.node.path || '/'}%`,
								nodeTree
							},
							then: (nodeTrees) => {
								nodeTree.children = nodeTrees;
							},
							catch: (errors) => {
								console.error(errors);
								notifications.error($LL.web.message.requestFailed());
							}
						});
					}}
				>
					{nodeTree.node.name}
				</a>
				<GroupTreeMenu
					bind:activeId
					nodeTrees={nodeTree.children}
					currentDeep={currentDeep + 1}
					{deeps}
					on:fetch={fetch}
				/>
			</li>
		{/each}
	{/if}
</ul>
