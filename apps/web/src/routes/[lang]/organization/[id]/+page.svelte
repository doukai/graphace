<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import OrganizationForm from '~/lib/components/objects/organization/OrganizationForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_organizationStore, Mutation_organizationStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeOrganizationArgs, Organization } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_organization = data.Query_organization as Query_organizationStore;
	const Mutation_organization = new Mutation_organizationStore();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

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

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		goto(`./${event.detail.path}`);
	};
</script>

<OrganizationForm
	node={$Query_organization.data?.organization}
	isFetching={$Query_organization.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
