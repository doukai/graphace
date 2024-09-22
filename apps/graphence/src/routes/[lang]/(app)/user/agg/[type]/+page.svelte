<script lang="ts">
	import { Card } from '@graphace/ui';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import UserLine from '~/lib/components/objects/user/UserLine.svelte';
	import UserPie from '~/lib/components/objects/user/UserPie.svelte';
	import UserAggTable from '~/lib/components/objects/user/UserAggTable.svelte';
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
