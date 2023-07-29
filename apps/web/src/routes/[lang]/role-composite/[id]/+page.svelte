<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCompositeForm from '~/lib/components/objects/role-composite/RoleCompositeForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_roleCompositeStore, Mutation_roleCompositeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeRoleCompositeArgs, RoleComposite } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_roleComposite = data.Query_roleComposite as Query_roleCompositeStore;
	$: node = $Query_roleComposite.data?.roleComposite;
	$: urlName($page.url, node?.name || '');
	const Mutation_roleComposite = new Mutation_roleCompositeStore();
	let errors: Record<string, Errors> = {};

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
				Mutation_roleComposite.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleComposite);
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
		to(`./${event.detail.path}`);
	};
</script>

<RoleCompositeForm
	showBackButton={$canBack}
	{node}
	{errors}
	isFetching={$Query_roleComposite.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
