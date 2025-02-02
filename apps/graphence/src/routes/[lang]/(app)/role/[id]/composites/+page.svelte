<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import RoleConnectionTable from '~/lib/components/objects/role/RoleConnectionTable.svelte';
	import type { Query_role_composites_Store } from '~/lib/stores/query/query_role_composites_store';
	import type { Mutation_role_composites_Store } from '~/lib/stores/mutation/mutation_role_composites_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import type { RoleInput, MutationRoleArgs, QueryRoleConnectionArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: urlName($page.url, $LL.graphql.objects.Role.fields.composites.name());
	$: id = data.id as string;
	$: query_role_composites_Store = data.query_role_composites_Store as Query_role_composites_Store;
	$: role = $query_role_composites_Store.response.data?.role;
	$: nodes = $query_role_composites_Store.response.data?.role?.compositesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_composites_Store.response.data?.role?.compositesConnection?.totalCount || 0;
	$: mutation_role_composites_Store = data.mutation_role_composites_Store as Mutation_role_composites_Store;
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryRoleConnectionArgs;
			then: (data: (RoleInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_role_composites_Store.fetch({ role_id: { val: role?.id }, ...event.detail.args })
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.role?.compositesConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationRoleArgs;
			then: (data: RoleInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validate('Mutation_role_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_role_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.role);
						}
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const parentMutation = (
		event: CustomEvent<{
			args: MutationRoleArgs[];
			then: (data: RoleInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id }}, composites: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_role_composites_Store.fetch({
					role_id: id,
					role_composites: event.detail.args
				})
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(undefined);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.composites.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../role/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./composites/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./composites/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>

<Card>
	<RoleConnectionTable
		showSaveButton={false}
		showRemoveButton={false}
		showUnbindButton={true}
		showGotoSelectButton={true}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$query_role_composites_Store.isFetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:parentMutation={parentMutation}
		on:edit={edit}
		on:create={create}
		on:gotoField={gotoField}
		on:gotoSelect={gotoSelect}
		on:back={back}
	/>
</Card>
