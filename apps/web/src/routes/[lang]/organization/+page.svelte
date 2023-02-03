<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import OrganizationConnectionTable from '~/lib/components/objects/organization/OrganizationConnectionTable.svelte';
	import type { Organization, QueryTypeOrganizationConnectionArgs, MutationTypeOrganizationArgs } from '~/lib/types/schema';
	import { Query_organizationConnectionStore, Mutation_organizationStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_organizationConnection = data.Query_organizationConnection as Query_organizationConnectionStore;
	const Mutation_organization = new Mutation_organizationStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeOrganizationConnectionArgs;
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

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./organization/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./organization/+`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./organization/${event.detail.path}`);
	};
</script>
<OrganizationConnectionTable
	nodes={$Query_organizationConnection.data?.organizationConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_organizationConnection.data?.organizationConnection?.totalCount || 0}
	isFetching={$Query_organizationConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
