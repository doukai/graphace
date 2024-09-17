<script lang="ts">
	import { Card } from '@graphace/ui';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import type { UserAggStore } from '~/lib/stores/userAggStore';
	import type { PageData } from './$houdini';

	export let data: PageData;
	const { selectColumns, queryArguments } = data;
	const UserAgg = data.UserAgg as UserAggStore;
</script>

<Card>
	<UserBar isFetching={$UserAgg.isFetching} data={$UserAgg.data} {selectColumns} {queryArguments} />
</Card>
