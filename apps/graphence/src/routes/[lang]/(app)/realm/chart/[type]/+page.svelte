<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RealmAgg from '~/lib/components/objects/realm/RealmAgg.svelte';
	import RealmBar from '~/lib/components/objects/realm/RealmBar.svelte';
	import RealmLine from '~/lib/components/objects/realm/RealmLine.svelte';
	import RealmPie from '~/lib/components/objects/realm/RealmPie.svelte';
	import RealmAggTable from '~/lib/components/objects/realm/RealmAggTable.svelte';
	import type { RealmConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Realm.name());

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	$: realmConnectionQuery = data.realmConnectionQuery as OperationStore<RealmConnection>;
	$: connection = $realmConnectionQuery.response?.data?.realmConnection || {};
	$: totalCount = connection?.totalCount || 0;

	const components: Record<string, any> = {
		bar: RealmBar,
		line: RealmLine,
		pie: RealmPie,
		table: RealmAggTable
	};

	$: component = components[data.type];
</script>

<Card>
	<RealmAgg
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		isFetching={$realmConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) =>
			realmConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'realmConnection',
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
	</RealmAgg>
</Card>
