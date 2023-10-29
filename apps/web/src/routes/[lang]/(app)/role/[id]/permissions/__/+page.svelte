<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import PermissionSelectConnectionTable from '~/lib/components/objects/permission/PermissionSelectConnectionTable.svelte';
	import type { Permission, QueryPermissionConnectionArgs, MutationPermissionArgs } from '~/lib/types/schema';
	import { Query_permissionConnectionStore, Mutation_permissionStore, Mutation_role_permissionsStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_permissionConnection = data.Query_permissionConnection as Query_permissionConnectionStore;
	$: nodes = $Query_permissionConnection.data?.permissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_permissionConnection.data?.permissionConnection?.totalCount || 0;
	const notBelongToParent = data.notBelongToParent;
	const Mutation_permission = new Mutation_permissionStore();
	const Mutation_role_permissions = new Mutation_role_permissionsStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryPermissionConnectionArgs;
			then: (data: (Permission | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_permissionConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.permissionConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validateMutation('Permission', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_permission.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.permission);
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
			selected: MutationPermissionArgs | null | undefined | (MutationPermissionArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Role', { where: { id: { val: id } }, permissions: event.detail.selected }, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_permissions.mutate({
						role_id: id,
						role_permissions: event.detail.selected,
						mergeToList: ['permissions']
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
				errors = validErrors.permissions.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	<PermissionSelectConnectionTable
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		args={ { ...notBelongToParent } }
		isFetching={$Query_permissionConnection.fetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
