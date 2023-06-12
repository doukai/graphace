<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import CurrentUserForm from '~/lib/components/objects/current-user/CurrentUserForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_currentUserStore, Mutation_currentUserStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeCurrentUserArgs, CurrentUser } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_currentUser = data.Query_currentUser as Query_currentUserStore;
	$: node = $Query_currentUser.data?.currentUser;
	const Mutation_currentUser = new Mutation_currentUserStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeCurrentUserArgs;
			update?: boolean;
			then: (data: CurrentUser | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('CurrentUser', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_currentUser.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.currentUser);
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

<CurrentUserForm
	{node}
	{errors}
	isFetching={$Query_currentUser.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
