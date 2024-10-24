<script lang="ts">
	import { page } from '$app/stores';
	import { Card, urlName } from '@graphace/ui';
	import RealmBar from '~/lib/components/objects/realm/RealmBar.svelte';
	import RealmLine from '~/lib/components/objects/realm/RealmLine.svelte';
	import RealmPie from '~/lib/components/objects/realm/RealmPie.svelte';
	import RealmAggTable from '~/lib/components/objects/realm/RealmAggTable.svelte';
	import type { RealmConnectionQueryStore } from '~/lib/stores/realm/realmQueryStore';
	import type { PageData } from './$houdini';
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

	const RealmConnectionQuery = data.RealmConnectionQuery as RealmConnectionQueryStore;

	const components: Record<string, any> = {
		bar: RealmBar,
		line: RealmLine,
		pie: RealmPie,
		table: RealmAggTable
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RealmConnectionQuery.isFetching}
		connection={$RealmConnectionQuery.response.data?.realmConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => RealmConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
