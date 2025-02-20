<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import UserAgg from '~/lib/components/objects/user/UserAgg.svelte';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import UserLine from '~/lib/components/objects/user/UserLine.svelte';
	import UserPie from '~/lib/components/objects/user/UserPie.svelte';
	import UserAggTable from '~/lib/components/objects/user/UserAggTable.svelte';
	import type { UserConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.name());

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	$: userConnectionQuery = data.userConnectionQuery as OperationStore<UserConnection>;
	$: connection = $userConnectionQuery.response?.data?.userConnection || {};
	$: totalCount = connection?.totalCount || 0;

	const components: Record<string, any> = {
		bar: UserBar,
		line: UserLine,
		pie: UserPie,
		table: UserAggTable
	};

	$: component = components[data.type];
</script>

<Card>
	<UserAgg
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		isFetching={$userConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) =>
			userConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'userConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			})}
		let:fields
		let:queryArguments
		let:getFieldName
		let:getGrouByName
	>
		<svelte:component
			this={component}
			{connection}
			{fields}
			{queryArguments}
			{getFieldName}
			{getGrouByName}
		/>
	</UserAgg>
</Card>
