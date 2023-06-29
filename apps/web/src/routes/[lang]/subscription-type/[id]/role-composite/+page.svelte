<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCompositeForm from '~/lib/components/objects/role-composite/RoleCompositeForm.svelte';
	import RoleCompositeCreateForm from '~/lib/components/objects/role-composite/RoleCompositeCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRoleCompositeArgs, RoleComposite } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_roleCompositeStore, Mutation_subscriptionType_roleCompositeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeRoleCompositeArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_subscriptionType_roleComposite = data.Query_subscriptionType_roleComposite as Query_subscriptionType_roleCompositeStore;
	$: subscriptionType = $Query_subscriptionType_roleComposite.data?.subscriptionType;
	$: node = subscriptionType?.roleComposite;
	const Mutation_subscriptionType_roleComposite = new Mutation_subscriptionType_roleCompositeStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleCompositeArgs;
			update?: boolean;
			then: (data: RoleComposite | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('RoleComposite', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType_roleComposite.mutate({
					subscriptionType_: subscriptionType?.,
					subscriptionType_roleComposite: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.subscriptionType?.roleComposite);
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
		to(`../../role-composite/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<RoleCompositeForm
		{node}
		{errors}
		isFetching={$Query_subscriptionType_roleComposite.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<RoleCompositeCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}