<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Error } from '@graphace/commons/types';
	import RoleRoleTypeConnectionTable from '~/lib/components/objects/role-role-type/RoleRoleTypeConnectionTable.svelte';
	import type { RoleRoleType, QueryTypeRoleRoleTypeConnectionArgs, MutationTypeRoleRoleTypeArgs } from '~/lib/types/schema';
	import { Query_roleRoleTypeConnectionStore, Mutation_roleRoleTypeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_roleRoleTypeConnection = data.Query_roleRoleTypeConnection as Query_roleRoleTypeConnectionStore;
	$: nodes = $Query_roleRoleTypeConnection.data?.roleRoleTypeConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleRoleTypeConnection.data?.roleRoleTypeConnection?.totalCount || 0;
	const Mutation_roleRoleType = new Mutation_roleRoleTypeStore();
	let errors: Record<number, Error> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleRoleTypeConnectionArgs;
			then: (data: (RoleRoleType | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_roleRoleTypeConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleRoleTypeConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleRoleTypeArgs;
			update?: boolean;
			then: (data: RoleRoleType | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('RoleRoleType', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_roleRoleType.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.roleRoleType);
					})
					.catch((error) => {
						event.detail.catch(error);
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
		to(`./role-role-type/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./role-role-type/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./role-role-type/${event.detail.path}`);
	};
</script>
<RoleRoleTypeConnectionTable
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_roleRoleTypeConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
