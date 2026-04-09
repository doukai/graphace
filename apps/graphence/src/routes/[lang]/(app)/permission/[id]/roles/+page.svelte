<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { buildArguments, merge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, Breadcrumbs, toast, modal } from '@graphace/ui';
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import RoleTableDialog from '~/lib/components/objects/role/RoleTableDialog.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { RoleInput, MutationRoleArgs, QueryRoleConnectionArgs, RoleOrderBy } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id as string;
	$: query_permission_rolesConnection_Store = data.query_permission_rolesConnection_Store;
	$: permission = $query_permission_rolesConnection_Store.response.data?.permission;
	$: nodes = $query_permission_rolesConnection_Store.response.data?.permission?.rolesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_permission_rolesConnection_Store.response.data?.permission?.rolesConnection?.totalCount || 0;
	$: mutation_permission_roles_Store = data.mutation_permission_roles_Store;
	$: mutation_role_Store = data.mutation_role_Store;

	let value: (RoleInput | null | undefined)[] = [];
	$: if (nodes && nodes.length > 0) {
		value = nodes;
	} else {
		value = [];
	}
	let args: QueryRoleConnectionArgs = {};
	let orderBy: RoleOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_permission_rolesConnection_Store
			.fetch({ permission_id: id, ...buildArguments(args) })
			.then((result) => {
				if (result.errors) {
					console.error(errors);
					toast.error($LL.graphence.message.requestFailed());
				} else {
					errors = {};
				}
			});
	};

	const mutation = (args: MutationRoleArgs) => {
		validate('Mutation_role_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_role_Store.fetch(args).then((result) => {
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

	const mutation_roles = (input: RoleInput[]) => {
		validate('Mutation_permission_Arguments', { where: { id: { val: permission?.id } }, roles: input })
			.then((data) => {
				errors = {};
				mutation_permission_roles_Store
					.fetch(
						{
							permission_id: id,
							permission_roles: input
						},
						{ directives: [merge()] }
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
				errors = validErrors.roles.iterms;
			});
	};
</script>

<Breadcrumbs>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/permission`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Permission.name()}</span>
		</a>
	</li>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/permission/${permission?.id}`)}>
			<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.Permission.name() })}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphql.objects.Permission.fields.roles.name()}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<RoleTable
			showUnbindButton={auth('Role::isDeprecated::WRITE')}
			showEditButton
			showCreateButton={auth('Role::*::WRITE')}
			showBackButton={$canBack}
			showSearchInput
			showFilter
			{value}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_permission_rolesConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_permission_roles_Store.isFetching || $mutation_role_Store.isFetching}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
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
					to(`/${$locale}/role/${e.detail.value.id}`);
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
							mutation_roles(
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
			on:create={(e) => to(`/${$locale}/permission/${permission?.id}/roles/_`)}
			on:goto={(e) => to(`/${$locale}/role/${e.detail.path}`)}
			on:back={(e) => ot()}
		>
			{#if auth('Role::*::WRITE')}
				<RoleTableDialog
					args={{ exs: [{ not: true, permissions: { id: { val: permission?.id } } }] }}
					class="btn-accent"
					on:select={(e) => {
						if (Array.isArray(e.detail.value)) {
							mutation_roles(e.detail.value.filter((item) => item != null));
						}
					}}
				>
					<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
				</RoleTableDialog>
			{/if}
		</RoleTable>
		<div class="divider my-0" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</CardBody>
</Card>
