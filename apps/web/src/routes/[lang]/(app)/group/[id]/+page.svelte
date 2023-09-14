<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Query_groupStore, Mutation_groupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationGroupArgs, Group } from '~/lib/types/schema';
	import { validateMutation } from '~/lib/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_group = data.Query_group as Query_groupStore;
	$: node = $Query_group.data?.group;
	$: urlName($page.url, node?.name || '');
	const Mutation_group = new Mutation_groupStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Group', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_group.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.group);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
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

<GroupForm
	showBackButton={$canBack}
	{node}
	{errors}
	isFetching={$Query_group.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
