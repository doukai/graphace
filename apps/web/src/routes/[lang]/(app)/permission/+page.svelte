<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import PermissionConnectionTable from '~/lib/components/objects/permission/PermissionConnectionTable.svelte';
	import PermissionCard from '~/lib/components/objects/permission/PermissionCard.svelte';
	import type {
		Permission,
		QueryPermissionConnectionArgs,
		MutationPermissionArgs
	} from '~/lib/types/schema';
	import { Query_permissionConnectionStore, Mutation_permissionStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.name());
	$: Query_permissionConnection =
		data.Query_permissionConnection as Query_permissionConnectionStore;
	$: nodes = $Query_permissionConnection.data?.permissionConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $Query_permissionConnection.data?.permissionConnection?.totalCount || 0;
	const Mutation_permission = new Mutation_permissionStore();
	let errors: Record<number, Errors> = {};
	let typeName: string | null | undefined = undefined;

	const fetch = (
		event: CustomEvent<{
			args: QueryPermissionConnectionArgs;
			then: (data: (Permission | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_permissionConnection.fetch({ variables: event.detail.args }).then((result) => {
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
		const row = nodes
			?.map((node) => node?.name)
			?.indexOf(event.detail.args.name || event.detail.args.where?.name?.val || undefined);
		validateMutation('Permission', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_permission.mutate(event.detail.args).then((result) => {
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

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./permission/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./permission/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`./permission/${event.detail.path}`);
	};
</script>

<div class="flex xl:items-start xl:flex-row xl:gap-2">
	<div class="hidden xl:flex xl:basis-1/6">
		<PermissionCard bind:activeTypeName={typeName} />
	</div>
	<div class="w-full xl:basis-5/6">
		<PermissionConnectionTable
			showSaveButton={false}
			showBackButton={$canBack}
			bind:typeName
			{nodes}
			{totalCount}
			{errors}
			isFetching={$Query_permissionConnection.fetching}
			on:fetch={fetch}
			on:mutation={mutation}
			on:edit={edit}
			on:create={create}
			on:gotoField={gotoField}
		/>
	</div>
</div>
