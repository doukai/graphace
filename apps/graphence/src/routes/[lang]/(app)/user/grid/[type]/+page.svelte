<script lang="ts">
	import { Card } from '@graphace/ui';
	import UserGrid from '~/lib/components/objects/user/UserGrid.svelte';
	import UserAggGrid from '~/lib/components/objects/user/UserAggGrid.svelte';
	import type { UserQueryStore } from '~/lib/stores/user/userQueryStore';
	import type { UserMutationStore } from '~/lib/stores/user/userMutationStore';
	import type { PageData } from './$houdini';

	export let data: PageData;

	const {
		fields,
		queryArguments,
		showHeader,
		showFooter,
		showOptionButton,
		showFilterButton,
		showBookmarkButton
	} = data;

	const UserQuery = data.UserQuery as UserQueryStore;
	const UserMutation = data.UserMutation as UserMutationStore;

	const components: Record<string, any> = {
		mutation: UserGrid,
		agg: UserAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$UserQuery.isFetching}
		connection={$UserQuery.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => UserQuery.fetch(e.detail.fields, e.detail.queryArguments)}
		on:mutation={(e) => UserMutation.fetch(e.detail.fields, e.detail.mutationArguments).then()}
	/>
</Card>
