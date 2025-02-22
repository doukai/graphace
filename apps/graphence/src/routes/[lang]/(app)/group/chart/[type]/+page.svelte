<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import GroupAgg from '~/lib/components/objects/group/GroupAgg.svelte';
	import GroupBar from '~/lib/components/objects/group/GroupBar.svelte';
	import GroupLine from '~/lib/components/objects/group/GroupLine.svelte';
	import GroupPie from '~/lib/components/objects/group/GroupPie.svelte';
	import GroupAggTable from '~/lib/components/objects/group/GroupAggTable.svelte';
	import type { GroupConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.name());

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	$: groupConnectionQuery = data.groupConnectionQuery as OperationStore<GroupConnection>;
	$: connection = $groupConnectionQuery.response?.data?.groupConnection || {};
	$: totalCount = connection?.totalCount || 0;

	const components: Record<string, any> = {
		bar: GroupBar,
		line: GroupLine,
		pie: GroupPie,
		table: GroupAggTable
	};

	$: component = components[data.type];
</script>

<Card>
	<GroupAgg
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		isFetching={$groupConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) =>
			groupConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'groupConnection',
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
	</GroupAgg>
</Card>
