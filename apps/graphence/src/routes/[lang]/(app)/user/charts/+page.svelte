<script lang="ts">
	import { onMount } from 'svelte';
	import { Card } from '@graphace/ui';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import { UserAggStore } from '~/lib/stores/userAggStore';
	import type { PageData } from './$houdini';

	export let data: PageData;
	const { selectColumns, queryArguments } = data;
	onMount(async () => {
		UserAggStore.fetch(selectColumns, queryArguments);
	});
</script>

<Card>
	<UserBar {selectColumns} {queryArguments} isFetching={$UserAggStore.isFetching} />
</Card>
