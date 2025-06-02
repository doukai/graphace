<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import RealmTable from '~/lib/components/objects/realm/RealmTable.svelte';
	import type { Query_realmConnection_Store } from '~/lib/stores/query/query_realmConnection_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { QueryRealmConnectionArgs, RealmOrderBy, MutationRealmArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_realmConnection_Store = data.query_realmConnection_Store as Query_realmConnection_Store;
	$: nodes = $query_realmConnection_Store.response.data?.realmConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_realmConnection_Store.response.data?.realmConnection?.totalCount || 0;
	$: mutation_realm_Store = data.mutation_realm_Store as Mutation_realm_Store;
	let args: QueryRealmConnectionArgs = {};
	let orderBy: RealmOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};
	let validating = false;

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_realmConnection_Store.fetch(buildArguments(args)).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationRealmArgs) => {
		const row = nodes
			?.map((node) => node?.id)
			?.indexOf(args.id || args.where?.id?.val || undefined);
		validating = true;
		validate('Mutation_realm_Arguments', args, $locale)
			.then((data) => {
				validating = false;
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_realm_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError,
								confirm: () => {
									query();
									return true;
								}
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						query();
					}
				});
			})
			.catch((validErrors) => {
				validating = false;
				console.error(validErrors);
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};
</script>

<Card>
	<CardBody>
		<RealmTable
			showRemoveButton
			showEditButton
			showCreateButton
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_realmConnection_Store.isFetching}
			isMutating={validating || $mutation_realm_Store.isFetching}
			fields={{
				name: {
					readonly: !permissions.auth('Realm::name::WRITE'),
					disabled: !permissions.auth('Realm::name::WRITE'),
					hidden: !permissions.auth('Realm::name::READ')
				},
				description: {
					readonly: !permissions.auth('Realm::description::WRITE'),
					disabled: !permissions.auth('Realm::description::WRITE'),
					hidden: !permissions.auth('Realm::description::READ')
				}
			}}
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
			on:query={(e) => query()}
			on:save={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					mutation(e.detail.value);
				}
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`realm/${e.detail.value.id}`, e.detail.value.name);
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
							} else {
								mutation({
									where: { id: { val: e.detail.value?.id } },
									isDeprecated: true
								});
							}
							return true;
						}
					});
				}
			}}
			on:create={(e) => to('realm/_', '_')}
			on:goto={(e) => to(`realm/${e.detail.path}`, e.detail.name)}
		/>
		<div class="divider" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</CardBody>
</Card>
