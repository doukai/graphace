<script lang="ts">
	import { Card } from '@graphace/ui';
	import RealmBar from '~/lib/components/objects/realm/RealmBar.svelte';
	import RealmLine from '~/lib/components/objects/realm/RealmLine.svelte';
	import RealmPie from '~/lib/components/objects/realm/RealmPie.svelte';
	import type { RealmAggStore } from '~/lib/stores/realm/realmAggStore';
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

	const RealmAgg = data.RealmAgg as RealmAggStore;

	const components: Record<string, any> = { bar: RealmBar, line: RealmLine, pie: RealmPie };

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RealmAgg.isFetching}
		connection={$RealmAgg.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => RealmAgg.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
