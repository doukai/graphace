<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import OrganizationForm from '~/lib/components/objects/organization/OrganizationForm.svelte';
	import OrganizationCreateForm from '~/lib/components/objects/organization/OrganizationCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeOrganizationArgs, Organization } from '~/lib/types/schema';
	import { Query_user_organizationStore, Mutation_user_organizationStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_user_organization = data.Query_user_organization as Query_user_organizationStore;
	$: user = $Query_user_organization.data?.user;
	$: organization = user?.organization;
	const Mutation_user_organization = new Mutation_user_organizationStore();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const pageArgs: MutationTypeOrganizationArgs = {};
	if ($page.params.users) {
		pageArgs.users = JSON.parse($page.params.users);
	}

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeOrganizationArgs;
			update?: boolean;
			then: (data: Organization | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		if (user?.id) {
			Mutation_user_organization.mutate({
				user_id: user?.id,
				user_organization: { ...pageArgs, ...event.detail.args },
				update: event.detail.update
			})
				.then((result) => {
					event.detail.then(result?.user?.organization);
				})
				.catch((error) => {
					event.detail.catch(error);
				});
		} else {
			$page.params = { organization: JSON.stringify(event.detail.args) };
			goto(previousPage);
		}
	};

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};
</script>

{#if organization}
	<OrganizationForm
		node={$Query_user_organization.data?.user?.organization}
		isFetching={$Query_user_organization.fetching}
		on:mutation={mutation}
		on:back={back}
	/>
{:else}
	<OrganizationCreateForm on:mutation={mutation} on:back={back} />
{/if}