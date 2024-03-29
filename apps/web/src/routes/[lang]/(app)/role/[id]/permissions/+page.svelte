<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import PermissionFieldSelectTable from '~/lib/components/objects/permission/PermissionFieldSelectTable.svelte';
	import PermissionTypeMenuCard from '~/lib/components/objects/permission/PermissionTypeMenuCard.svelte';
	import type { MutationPermissionArgs, Permission } from '~/lib/types/schema';
	import { PermissionTypesQueryStore, Mutation_role_permissionsStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name());
	$: PermissionTypesQuery = data.PermissionTypesQuery as PermissionTypesQueryStore;
	$: id = data.id as string;
	const Mutation_role_permissions = new Mutation_role_permissionsStore();
	let errors: Record<number, Errors> = {};
	let typeName: string | null | undefined = undefined;

	const parentMutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs[];
			then: (data: Permission[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation(
			'Role',
			{ where: { id: { val: id } }, permissions: event.detail.args },
			$locale
		)
			.then((data) => {
				errors = {};
				Mutation_role_permissions.mutate({
					role_id: id,
					role_permissions: event.detail.args,
					mergeToList: ['permissions']
				}).then((result) => {
					event.detail.then(undefined);
					if (result.errors) {
						event.detail.catch(result.errors);
					}
				});
			})
			.catch((validErrors) => {
				errors = validErrors.permissions.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../permission/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./permissions/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../permission/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./permissions/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<div class="flex xl:items-start xl:flex-row xl:gap-2">
	<div class="hidden xl:flex xl:basis-1/6">
		<PermissionTypeMenuCard
			bind:activeTypeName={typeName}
			typeNames={$PermissionTypesQuery.data?.permissionConnection?.edges?.map(
				(edge) => edge?.node?.type
			)}
			totalCount={$PermissionTypesQuery.data?.permissionConnection?.totalCount || 0}
		/>
	</div>
	<div class="w-full xl:basis-5/6">
		<Card>
			<PermissionFieldSelectTable
				showBackButton={$canBack}
				typeNames={$PermissionTypesQuery.data?.permissionConnection?.edges?.map(
					(edge) => edge?.node?.type
				)}
				bind:roleId={id}
				bind:typeName
				on:parentMutation={parentMutation}
				on:edit={edit}
				on:create={create}
				on:gotoField={gotoField}
				on:gotoSelect={gotoSelect}
				on:back={back}
			/>
		</Card>
	</div>
</div>
