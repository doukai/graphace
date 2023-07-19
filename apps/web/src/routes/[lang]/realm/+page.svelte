<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Errors } from '@graphace/commons/types';
	import RealmConnectionTable from '~/lib/components/objects/realm/RealmConnectionTable.svelte';
	import type { Realm, QueryTypeRealmConnectionArgs, MutationTypeRealmArgs } from '~/lib/types/schema';
	import { Query_realmConnectionStore, Mutation_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_realmConnection = data.Query_realmConnection as Query_realmConnectionStore;
	$: nodes = $Query_realmConnection.data?.realmConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_realmConnection.data?.realmConnection?.totalCount || 0;
	const Mutation_realm = new Mutation_realmStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRealmConnectionArgs;
			then: (data: (Realm | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_realmConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.realmConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRealmArgs;
			update?: boolean;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: Errors) => void;
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
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./realm/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./realm/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./realm/${event.detail.path}`);
	};
</script>
<RealmConnectionTable
	showSaveButton={false}
	showBackButton={false}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_realmConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
