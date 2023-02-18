<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import OrganizationForm from '~/lib/components/objects/organization/OrganizationForm.svelte';
	import OrganizationCreateForm from '~/lib/components/objects/organization/OrganizationCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeOrganizationArgs, Organization } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '~/lib/utils';
	import { Query_user_organizationStore, Mutation_user_organizationStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeOrganizationArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_user_organization = data.Query_user_organization as Query_user_organizationStore;
	$: user = $Query_user_organization.data?.user;
	$: node = user?.organization;
	const Mutation_user_organization = new Mutation_user_organizationStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeOrganizationArgs;
			update?: boolean;
			then: (data: Organization | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Organization', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_organization.mutate({
					user_id: user?.id,
					user_organization: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.user?.organization);
					})
					.catch((errors) => {
						event.detail.catch(errors);
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
		to(`../../organization/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<OrganizationForm
		{node}
		{errors}
		isFetching={$Query_user_organization.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<OrganizationCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}