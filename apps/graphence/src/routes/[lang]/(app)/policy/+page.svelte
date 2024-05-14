<script lang="ts">
	import { page } from '$app/stores';
	import { Card, urlName, canBack } from '@graphace/ui';
	import type { GraphQLError } from '@graphace/graphql';
	import PolicyTable from '~/lib/components/objects/policy/PolicyTable.svelte';
	import type { Query_policyListStore } from '$houdini';
	import type { Policy } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Policy.name());
	$: Query_policyList = data.Query_policyList as Query_policyListStore;
	$: nodes = $Query_policyList.data?.policyList;

	const fetch = (
		event: CustomEvent<{
			then: (data: (Policy | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_policyList.fetch({}).then((result) => {
			event.detail.then(result.data?.policyList);
			if (result.errors) {
				event.detail.catch(result.errors);
			}
		});
	};
	$: console.log(nodes);
</script>

<Card>
	<PolicyTable
		showBackButton={$canBack}
		{nodes}
		isFetching={$Query_policyList.fetching}
		on:fetch={fetch}
	/>
</Card>
