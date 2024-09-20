<script lang="ts">
	import { Card } from '@graphace/ui';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import type { UserAggStore } from '~/lib/stores/user/userAggStore';
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
	const UserAgg = data.UserAgg as UserAggStore;
</script>

<Card>
	<UserBar
		isFetching={$UserAgg.isFetching}
		data={$UserAgg.data}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => UserAgg.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
