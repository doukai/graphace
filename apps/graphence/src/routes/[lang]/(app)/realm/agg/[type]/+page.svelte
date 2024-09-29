<script lang="ts">
	import { Card } from '@graphace/ui';
	import RealmBar from '~/lib/components/objects/realm/RealmBar.svelte';
	import RealmLine from '~/lib/components/objects/realm/RealmLine.svelte';
	import RealmPie from '~/lib/components/objects/realm/RealmPie.svelte';
	import RealmAggTable from '~/lib/components/objects/realm/RealmAggTable.svelte';
	import type { RealmQueryStore } from '~/lib/stores/realm/realmQueryStore';
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

	const RealmQuery = data.RealmQuery as RealmQueryStore;

	const components: Record<string, any> = {
		bar: RealmBar,
		line: RealmLine,
		pie: RealmPie,
		table: RealmAggTable
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RealmQuery.isFetching}
		connection={$RealmQuery.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => RealmQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
