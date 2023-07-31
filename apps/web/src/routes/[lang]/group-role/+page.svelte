<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import GroupRoleConnectionTable from '~/lib/components/objects/group-role/GroupRoleConnectionTable.svelte';
	import type { GroupRole, QueryTypeGroupRoleConnectionArgs, MutationTypeGroupRoleArgs } from '~/lib/types/schema';
	import { Query_groupRoleConnectionStore, Mutation_groupRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, 'GroupRole');
	$: Query_groupRoleConnection = data.Query_groupRoleConnection as Query_groupRoleConnectionStore;
	$: nodes = $Query_groupRoleConnection.data?.groupRoleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_groupRoleConnection.data?.groupRoleConnection?.totalCount || 0;
	const Mutation_groupRole = new Mutation_groupRoleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeGroupRoleConnectionArgs;
			then: (data: (GroupRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_groupRoleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.groupRoleConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('GroupRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_groupRole.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.groupRole);
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
		to(`./group-role/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./group-role/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./group-role/${event.detail.path}`);
	};
</script>
<GroupRoleConnectionTable
	showSaveButton={false}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_groupRoleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
