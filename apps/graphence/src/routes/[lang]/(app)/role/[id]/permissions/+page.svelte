<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { buildArguments, merge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
	import PermissionTable from '~/lib/components/objects/permission/PermissionTable.svelte';
	import PermissionTableDialog from '~/lib/components/objects/permission/PermissionTableDialog.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { PermissionInput, MutationPermissionArgs, QueryPermissionConnectionArgs, PermissionOrderBy } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id as string;
	$: query_role_permissionsConnection_Store = data.query_role_permissionsConnection_Store;
	$: role = $query_role_permissionsConnection_Store.response.data?.role;
	$: nodes = $query_role_permissionsConnection_Store.response.data?.role?.permissionsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_permissionsConnection_Store.response.data?.role?.permissionsConnection?.totalCount || 0;
	$: mutation_role_permissions_Store = data.mutation_role_permissions_Store;
	$: mutation_permission_Store = data.mutation_permission_Store;

	let value: (PermissionInput | null | undefined)[] = [];
	$: if (nodes && nodes.length > 0) {
		value = nodes;
	} else {
		value = [];
	}
	let args: QueryPermissionConnectionArgs = {};
	let orderBy: PermissionOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined, params?: FetchParams | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_role_permissionsConnection_Store
			.fetch({ role_id: id, ...buildArguments(args) }, params)
			.then((result) => {
				if (result.errors) {
					console.error(errors);
					toast.error($LL.graphence.message.requestFailed());
				} else {
					errors = {};
				}
			});
	};

	const mutation = (args: MutationPermissionArgs, params?: FetchParams | undefined) => {
		validate('Mutation_permission_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_permission_Store.fetch(args, params).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors, data);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						ot();
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				errors = validErrors;
			});
	};

	const mutation_permissions = (input: PermissionInput[], params?: FetchParams | undefined) => {
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, permissions: input })
			.then((data) => {
				errors = {};
				mutation_role_permissions_Store
					.fetch(
						{
							role_id: id,
							role_permissions: input
						},
						{ directives: [merge()], ...params }
					)
					.then((result) => {
						if (result.errors) {
							console.error(result.errors);
							errors = buildGraphQLErrors(result.errors, data);
							const globalError = buildGlobalGraphQLErrorMessage(result.errors);
							if (globalError) {
								modal.open({
									title: $LL.graphence.message.requestFailed(),
									description: globalError
								});
							}
						} else {
							toast.success($LL.graphence.message.requestSuccess());
							ot();
						}
					});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				errors = validErrors.permissions.iterms;
			});
	};
</script>

<Breadcrumbs>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/role`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Role.name()}</span>
		</a>
	</li>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/role/${role?.id}`)}>
			<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.Role.name() })}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphql.objects.Role.fields.permissions.name()}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<PermissionTable
			showUnbindButton={auth('Permission::isDeprecated::WRITE')}
			showEditButton
			showCreateButton={auth('Permission::*::WRITE')}
			showBackButton={$canBack}
			showSearchInput
			showFilter
			{value}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_role_permissionsConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_role_permissions_Store.isFetching || $mutation_permission_Store.isFetching}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						field: { opr: 'LK', val: e.detail.value },
						type: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					};
				} else {
					args = { first: pageSize, offset: 0 };
				}
				query();
			}}
			on:query={(e) => {
				args = e.detail.args;
				orderBy = e.detail.orderBy;
				query();
			}}
			on:save={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					mutation(e.detail.value);
				}
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`/${$locale}/permission/${e.detail.value.id}`);
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					modal.open({
						title: $LL.graphence.components.modal.removeModalTitle(),
						confirm: () => {
							if (Array.isArray(e.detail.value)) {
								mutation({
									where: { id: { opr: 'IN', arr: e.detail.value.map((node) => node?.id) } },
									isDeprecated: true
								});
							}
							return true;
						}
					});
				}
			}}
			on:unbind={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.unbindModalTitle(),
					confirm: () => {
						if (Array.isArray(e.detail.value)) {
							mutation_permissions(
								e.detail.value.map((node) => ({
									where: { id: { val: node?.id } },
									isDeprecated: true
								}))
							);
						}
						return true;
					}
				});
			}}
			on:create={(e) => to(`/${$locale}/role/${role?.id}/permissions/_`)}
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`)}
			on:back={(e) => ot()}
		>
			{#if auth('Permission::*::WRITE')}
				<PermissionTableDialog
					args={{ exs: [{ not: true, roles: { id: { val: role?.id } } }] }}
					class="btn-accent"
					on:select={(e) => {
						if (Array.isArray(e.detail.value)) {
							mutation_permissions(e.detail.value.filter((item) => item != null));
						}
					}}
				>
					<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
				</PermissionTableDialog>
			{/if}
		</PermissionTable>
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</CardBody>
</Card>
