<script lang="ts">
	import { Card } from '@graphace/ui';
	import RealmBar from '~/lib/components/objects/realm/RealmBar.svelte';
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
</script>

<Card>
	<RealmBar
		isFetching={$RealmAgg.isFetching}
		connecton={$RealmAgg.connection}
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
