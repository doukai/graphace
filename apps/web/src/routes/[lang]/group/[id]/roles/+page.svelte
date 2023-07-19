<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleConnectionTable from '~/lib/components/objects/role/RoleConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRoleArgs, QueryTypeRoleConnectionArgs, Role } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_group_rolesStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_group_roles = data.Query_group_roles as Query_group_rolesStore;
	$: group = $Query_group_roles.data?.group;
	$: nodes = $Query_group_roles.data?.group?.rolesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_group_roles.data?.group?.rolesConnection?.totalCount || 0;
	const Mutation_role = new Mutation_roleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleConnectionArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_group_roles.fetch({
			variables: { group_id: { val: group?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.group?.rolesConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Group', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_role.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.role);
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
		const row = nodes?.map((node) => node?.id).indexOf(event.detail.id) || totalCount;
		to(`../../role/${event.detail.id}`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./roles/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, totalCount)
		});
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role/${event.detail.path}`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<RoleConnectionTable
	showSaveButton={false}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_group_roles.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:back={back}
/>
