<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import RealmSelectConnectionTable from '~/lib/components/objects/realm/RealmSelectConnectionTable.svelte';
	import type { Realm, QueryRealmConnectionArgs, MutationRealmArgs } from '~/lib/types/schema';
	import { Query_realmConnectionStore, Mutation_realmStore, Mutation_permission_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.fields.realm.name(), PageType.SELECT);
	$: name = data.name as string;
	$: Query_realmConnection = data.Query_realmConnection as Query_realmConnectionStore;
	$: nodes = $Query_realmConnection.data?.realmConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_realmConnection.data?.realmConnection?.totalCount || 0;
	const Mutation_realm = new Mutation_realmStore();
	const Mutation_permission_realm = new Mutation_permission_realmStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryRealmConnectionArgs;
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
			args: MutationRealmArgs;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.name)?.indexOf(event.detail.args.name);
		validateMutation('Realm', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_realm.mutate(event.detail.args)
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
			selected: MutationRealmArgs | null | undefined | (MutationRealmArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Permission', { name: name, realm: event.detail.selected }, $locale)
			.then((data) => {
				errors = {};
				if (!Array.isArray(event.detail.selected)) {
					Mutation_permission_realm.mutate({
						permission_name: name,
						permission_realm: event.detail.selected
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
