<script lang="ts">
	import { Card } from '@graphace/ui';
	import UserAggGrid from '~/lib/components/objects/user/UserAggGrid.svelte';
	import type { UserQueryStore } from '~/lib/stores/user/userQueryStore';
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

	const components: Record<string, any> = {
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
	/>
</Card>
