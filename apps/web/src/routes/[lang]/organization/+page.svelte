<script lang="ts">
	import OrganizationTable from '~/lib/components/objects/organization/OrganizationTable.svelte';
	import type { Organization, OrganizationListArgs, MutationTypeOrganizationArgs } from '~/lib/types/schema';
	import { Query_organizationListStore, Mutation_organizationStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_organizationList = data.Query_organizationList as Query_organizationListStore;
	const Mutation_organization = new Mutation_organizationStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeOrganizationListArgs;
			then: (data: (Organization | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_organizationList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.organizationList;
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeOrganizationArgs;
			update?: boolean;
			then: (data: Organization | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_organization.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.organization);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>
<OrganizationTable
	nodes={$Query_organizationList.data?.organization}
	isFetching={$Query_organizationList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
