<script lang="ts">
	import OrganizationTable from '~/lib/components/objects/organization/OrganizationTable.svelte';
	import type { Organization, QueryTypeOrganizationListArgs, MutationTypeOrganizationArgs } from '~/lib/types/schema';
	import { QueryOrganizationConnectionStore, GQL_MutationOrganization } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryOrganizationConnection = data.QueryOrganizationConnection as QueryOrganizationConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeOrganizationListArgs;
			then: (data: (Organization | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryOrganizationConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.organizationConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeOrganizationArgs;
			then: (data: Organization | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationOrganization.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.organization);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<OrganizationTable
	nodes={$QueryOrganizationConnection.data?.organizationConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryOrganizationConnection.data?.organizationConnection?.totalCount || 0}
	isFetching={$QueryOrganizationConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
