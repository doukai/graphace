<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import RoleSelectConnectionTable from '~/lib/components/objects/role/RoleSelectConnectionTable.svelte';
	import type { Role, QueryRoleConnectionArgs, MutationRoleArgs } from '~/lib/types/schema';
	import { Query_roleConnectionStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.fields.roles.name(), PageType.SELECT);
	$: originalNodes = data.nodes as (MutationRoleArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: Query_roleConnection = data.Query_roleConnection as Query_roleConnectionStore;
	$: nodes = $Query_roleConnection.data?.roleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleConnection.data?.roleConnection?.totalCount || 0;
	const Mutation_role = new Mutation_roleStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryRoleConnectionArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_roleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationRoleArgs;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validateMutation('Role', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_role.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.role);
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
			selected: MutationRoleArgs | null | undefined | (MutationRoleArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		if (Array.isArray(event.detail.selected)) {
			ot({
				node: updateNodeParam($page.url, [...originalNodes, ...event.detail.selected.filter((item) => !originalNodes.map((node) => node?.name).includes(item?.name))]),
				errors: updateErrorsParam($page.url, errors)
			});
		}
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};
</script>

<Card>
	<RoleSelectConnectionTable
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$Query_roleConnection.fetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
