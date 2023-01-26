<script lang="ts">
	import OrganizationTable from '~/lib/components/objects/organization/OrganizationTable.svelte';
	import type { Organization, QueryTypeOrganizationListArgs, MutationTypeOrganizationArgs } from '~/lib/types/schema';
	import { Query_organizationConnectionStore, Mutation_organization_updateStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_organizationConnection = data.Query_organizationConnection as Query_organizationConnectionStore;
	const Mutation_organization_update = new Mutation_organization_updateStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeOrganizationListArgs;
			then: (data: (Organization | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_organizationConnection.fetch({ variables: event.detail.args })
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
		Mutation_organization_update.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.organization);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<OrganizationTable
	nodes={$Query_organizationConnection.data?.organizationConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_organizationConnection.data?.organizationConnection?.totalCount || 0}
	isFetching={$Query_organizationConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
