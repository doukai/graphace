<script lang="ts">
	import { Card } from '@graphace/ui';
	import UserGrid from '~/lib/components/objects/user/UserGrid.svelte';
	import type { UserAggStore } from '~/lib/stores/user/userAggStore';
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

	const UserAgg = data.UserAgg as UserAggStore;

	const components: Record<string, any> = {
		agg: UserGrid
	};

	const component = components[data.type];
</script>

<Card>
	<UserGrid
		isFetching={$UserAgg.isFetching}
		connection={$UserAgg.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => UserAgg.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
