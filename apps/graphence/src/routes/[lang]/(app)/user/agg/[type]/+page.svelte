<script lang="ts">
	import { Card } from '@graphace/ui';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import UserLine from '~/lib/components/objects/user/UserLine.svelte';
	import UserPie from '~/lib/components/objects/user/UserPie.svelte';
	import UserAggTable from '~/lib/components/objects/user/UserAggTable.svelte';
	import type { UserConnectionQueryStore } from '~/lib/stores/user/userQueryStore';
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

	const UserConnectionQuery = data.UserConnectionQuery as UserConnectionQueryStore;

	const components: Record<string, any> = {
		bar: UserBar,
		line: UserLine,
		pie: UserPie,
		table: UserAggTable
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$UserConnectionQuery.isFetching}
		connection={$UserConnectionQuery.response.data?.userConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => UserConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
