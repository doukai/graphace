<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import RealmSelectConnectionTable from '~/lib/components/objects/realm/RealmSelectConnectionTable.svelte';
	import type { Realm, QueryTypeRealmConnectionArgs, MutationTypeRealmArgs } from '~/lib/types/schema';
	import { Query_realmConnectionStore, Mutation_realmStore, Mutation_api_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Api.fields.realm.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_realmConnection = data.Query_realmConnection as Query_realmConnectionStore;
	$: nodes = $Query_realmConnection.data?.realmConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_realmConnection.data?.realmConnection?.totalCount || 0;
	const Mutation_realm = new Mutation_realmStore();
	const Mutation_api_realm = new Mutation_api_realmStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRealmConnectionArgs;
			then: (data: (Realm | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_realmConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.realmConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRealmArgs;
			update?: boolean;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Realm', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_realm.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.realm);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const select = (
		event: CustomEvent<{
			selected: MutationTypeRealmArgs | null | undefined | (MutationTypeRealmArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Api', { realm: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (!Array.isArray(event.detail.selected)) {
					Mutation_api_realm.mutate({
						api_id: id,
						api_realm: event.detail.selected,
						update: true
					})
						.then((result) => {
							event.detail.then();
							if (result.errors) {
								event.detail.catch(result.errors);
							}
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.realm.iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<RealmSelectConnectionTable
	multipleSelect={false}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_realmConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
