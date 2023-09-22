<script lang="ts">
	import { graphql, Operator } from '$houdini';
	import type { GroupNodesQueryVariables } from './$houdini';
	import type { GraphQLError } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import GroupTreeMenu, { GroupTree } from '~/lib/components/objects/group/GroupTreeMenu.svelte';
	import { buildTree } from '@graphace/commons/utils/tree-util';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';

	export let currentDeep = 0;
	export let deeps = 2;
	export let showSearchInput: boolean = true;
	export let activeId: string | null | undefined = undefined;
	export const _GroupNodesQueryVariables: GroupNodesQueryVariables = ({}) => {
		return { deep: { opr: Operator.LT, val: deeps }, path: { opr: Operator.LK, val: '/%' } };
	};

	const GroupNodesQuery = graphql(`
		query GroupNodesQuery($path: StringExpression, $deep: IntExpression, $name: StringExpression)
		@load {
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

	let nodeTrees: GroupTree[] | null | undefined = undefined;
	GroupNodesQuery.fetch({
		variables: { deep: { opr: Operator.LT, val: deeps }, path: { opr: Operator.LK, val: '/%' } }
	})
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

	const fetch = (
		event: CustomEvent<{
			args: { deep: number; path: string; nodeTree: GroupTree };
			then: (data: GroupTree[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		GroupNodesQuery.fetch({
			variables: {
				deep: { opr: Operator.LT, val: event.detail.args.deep },
				path: { opr: Operator.LK, val: event.detail.args.path },
				name: undefined
			}
		})
			.then((result) => {
				event.detail.then(
					buildTree(result.data?.groupList, (current, parent) => current?.parent?.id === parent?.id)
				);
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const search = (
		event: CustomEvent<{
			value: string | undefined;
		}>
	) => {
		activeId = undefined;
		let variables;
		if (event.detail.value) {
			variables = {
				deep: undefined,
				path: undefined,
				name: { opr: Operator.LK, val: `%${event.detail.value}%` }
			};
		} else {
			variables = {
				deep: { opr: Operator.LT, val: deeps },
				path: { opr: Operator.LK, val: '/%' },
				name: undefined
			};
		}
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
	};
</script>

<Card>
	{#if showSearchInput}
		<SearchInput on:search={search} />
	{/if}
	<div class="divider" />

	<GroupTreeMenu
		bind:activeId
		{nodeTrees}
		{currentDeep}
		{deeps}
		on:fetch={fetch}
	/>
</Card>
