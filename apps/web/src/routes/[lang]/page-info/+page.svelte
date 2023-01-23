<script lang="ts">
	import PageInfoTable from '~/lib/components/objects/page-info/PageInfoTable.svelte';
	import type { PageInfo, QueryTypePageInfoListArgs, MutationTypePageInfoArgs } from '~/lib/types/schema';
	import { QueryPageInfoConnectionStore, GQL_MutationPageInfo } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryPageInfoConnection = data.QueryPageInfoConnection as QueryPageInfoConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypePageInfoListArgs;
			then: (data: (PageInfo | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryPageInfoConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.pageInfoConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypePageInfoArgs;
			then: (data: PageInfo | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationPageInfo.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.pageInfo);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<PageInfoTable
	nodes={$QueryPageInfoConnection.data?.pageInfoConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryPageInfoConnection.data?.pageInfoConnection?.totalCount || 0}
	isFetching={$QueryPageInfoConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
