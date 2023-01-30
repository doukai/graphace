<script lang="ts">
	import OrganizationForm from '~/lib/components/objects/organization/OrganizationForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeOrganizationArgs, Organization } from '~/lib/types/schema';
	import { Query_user_organizationStore, Mutation_organizationStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_user_organization = data.Query_user_organization as Query_user_organizationStore;
	const Mutation_organization = new Mutation_organizationStore();

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

<OrganizationForm
	node={$Query_user_organization.data?.user?.organization}
	isFetching={$Query_user_organization.fetching}
	on:mutation={mutation}
/>
