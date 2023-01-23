<script lang="ts">
	import OrganizationForm from '~/lib/components/objects/organization/OrganizationForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationOrganization } from '$houdini';
	import type { MutationTypeOrganizationArgs, Organization } from '~/lib/types/schema';

	let node: MutationTypeOrganizationArgs = {};

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

<OrganizationForm {node} on:mutation={mutation} />
