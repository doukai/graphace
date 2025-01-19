<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import GroupBar from '~/lib/components/objects/group/GroupBar.svelte';
	import GroupLine from '~/lib/components/objects/group/GroupLine.svelte';
	import GroupPie from '~/lib/components/objects/group/GroupPie.svelte';
	import type { GroupConnection } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
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

	const GroupConnectionQuery = data.GroupConnectionQuery as OperationStore<GroupConnection>;

	const components: Record<string, any> = {
		bar: GroupBar,
		line: GroupLine,
		pie: GroupPie
	};

	$: component = components[data.type];
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
		on:query={(e) =>
			GroupConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'groupConnction',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			})}
	/>
</Card>
