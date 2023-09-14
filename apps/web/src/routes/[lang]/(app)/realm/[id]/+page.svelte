<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Query_realmStore, Mutation_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationRealmArgs, Realm } from '~/lib/types/schema';
	import { validateMutation } from '~/lib/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_realm = data.Query_realm as Query_realmStore;
	$: node = $Query_realm.data?.realm;
	$: urlName($page.url, node?.name || '');
	const Mutation_realm = new Mutation_realmStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationRealmArgs;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Realm', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_realm.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.realm);
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

<RealmForm
	showBackButton={$canBack}
	{node}
	{errors}
	isFetching={$Query_realm.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
