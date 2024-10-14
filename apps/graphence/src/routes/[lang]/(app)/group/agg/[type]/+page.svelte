<script lang="ts">
	import { Card } from '@graphace/ui';
	import GroupBar from '~/lib/components/objects/group/GroupBar.svelte';
	import GroupLine from '~/lib/components/objects/group/GroupLine.svelte';
	import GroupPie from '~/lib/components/objects/group/GroupPie.svelte';
	import GroupAggTable from '~/lib/components/objects/group/GroupAggTable.svelte';
	import type { GroupConnectionQueryStore } from '~/lib/stores/group/groupQueryStore';
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

	const GroupConnectionQuery = data.GroupConnectionQuery as GroupConnectionQueryStore;

	const components: Record<string, any> = {
		bar: GroupBar,
		line: GroupLine,
		pie: GroupPie,
		table: GroupAggTable
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$GroupConnectionQuery.isFetching}
		connection={$GroupConnectionQuery.response.data?.groupConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => GroupConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
