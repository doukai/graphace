<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import RoleSelectConnectionTable from '~/lib/components/objects/role/RoleSelectConnectionTable.svelte';
	import type { Query_roleConnection_Store } from '~/lib/stores/query/query_roleConnection_store';
	import type { Mutation_group_roles_Store } from '~/lib/stores/mutation/mutation_group_roles_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import type { RoleInput, QueryRoleConnectionArgs, MutationRoleArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: urlName($page.url, $LL.graphql.objects.Group.fields.roles.name(), PageType.SELECT);
	$: id = data.id as string;
	$: query_roleConnection_Store = data.query_roleConnection_Store as Query_roleConnection_Store;
	$: nodes = $query_roleConnection_Store.response.data?.roleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_roleConnection_Store.response.data?.roleConnection?.totalCount || 0;
	const notBelongToParent = data.notBelongToParent;
	$: mutation_group_roles_Store = data.mutation_group_roles_Store as Mutation_group_roles_Store;
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryRoleConnectionArgs;
			then: (data: (RoleInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_roleConnection_Store.fetch(event.detail.args)
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.roleConnection?.edges?.map((edge) => edge?.node));
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

	const select = (
		event: CustomEvent<{
			selected: RoleInput | null | undefined | (RoleInput | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_group_Arguments', { where: { id: { val: id } }, roles: event.detail.selected }, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					mutation_group_roles_Store.fetch({
						group_id: id,
						group_roles: event.detail.selected
					})
						.then((result) => {
							if (result.errors) {
								event.detail.catch(result.errors);
							} else {
								event.detail.then();
							}
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.roles.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	<RoleSelectConnectionTable
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		args={{ exs: [notBelongToParent] }}
		isFetching={$query_roleConnection_Store.isFetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
