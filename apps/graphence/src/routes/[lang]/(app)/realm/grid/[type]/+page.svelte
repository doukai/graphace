<script lang="ts">
	import { Card } from '@graphace/ui';
	import RealmGrid from '~/lib/components/objects/realm/RealmGrid.svelte';
	import RealmAggGrid from '~/lib/components/objects/realm/RealmAggGrid.svelte';
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
		mutation: RealmGrid,
		agg: RealmAggGrid
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
