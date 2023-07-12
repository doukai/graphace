<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Errors } from '@graphace/commons/types';
	import RoleCompositeConnectionTable from '~/lib/components/objects/role-composite/RoleCompositeConnectionTable.svelte';
	import type { RoleComposite, QueryTypeRoleCompositeConnectionArgs, MutationTypeRoleCompositeArgs } from '~/lib/types/schema';
	import { Query_roleCompositeConnectionStore, Mutation_roleCompositeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_roleCompositeConnection = data.Query_roleCompositeConnection as Query_roleCompositeConnectionStore;
	$: nodes = $Query_roleCompositeConnection.data?.roleCompositeConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleCompositeConnection.data?.roleCompositeConnection?.totalCount || 0;
	const Mutation_roleComposite = new Mutation_roleCompositeStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleCompositeConnectionArgs;
			then: (data: (RoleComposite | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_roleCompositeConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleCompositeConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleCompositeArgs;
			update?: boolean;
			then: (data: RoleComposite | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('role-composite', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_roleComposite.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleComposite);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				if (row) {
					errors[row].iterms = validErrors;
				}
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./role-composite/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./role-composite/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./role-composite/${event.detail.path}`);
	};
</script>
<RoleCompositeConnectionTable
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_roleCompositeConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
