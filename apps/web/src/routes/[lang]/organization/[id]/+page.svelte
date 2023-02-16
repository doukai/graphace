<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import OrganizationForm from '~/lib/components/objects/organization/OrganizationForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_organizationStore, Mutation_organizationStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeOrganizationArgs, Organization } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_organization = data.Query_organization as Query_organizationStore;
	$: node = $Query_organization.data?.organization;
	const Mutation_organization = new Mutation_organizationStore();
	let errors: Record<string, Error> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeOrganizationArgs;
			update?: boolean;
			then: (data: Organization | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		validate('Organization', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_organization.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.organization);
					})
					.catch((error) => {
						event.detail.catch(error);
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`);
	};
</script>

<OrganizationForm
	bind:node
	{errors}
	isFetching={$Query_organization.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
