<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { buildArguments, merge, uniqueMerge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
	import {
		toRecords,
		fromRecords,
		toErrors
	} from '~/lib/components/objects/realm/RealmOption';
	import RealmTable from '~/lib/components/objects/realm/RealmTable.svelte';
	import ModuleMenu from '~/lib/components/menu/ModuleMenu.svelte';
	import ExportDialog from '~/lib/components/xlsx/ExportDialog.svelte';
	import ImportDialog from '~/lib/components/xlsx/ImportDialog.svelte';
	import { createQuery_realmConnection_Store } from '~/lib/stores/query/query_realmConnection_store';
	import { createMutation_realmList_Store } from '~/lib/stores/mutation/mutation_realmList_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors,
		loadEvent
	} from '~/utils';
	import type { QueryRealmConnectionArgs, RealmOrderBy, RealmInput, MutationRealmArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_realmConnection_Store = data.query_realmConnection_Store;
	$: nodes = $query_realmConnection_Store.response.data?.realmConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_realmConnection_Store.response.data?.realmConnection?.totalCount || 0;
	$: mutation_realm_Store = data.mutation_realm_Store;

	const export_realmConnection_Store = createQuery_realmConnection_Store($loadEvent);
	const import_realmList_Store = createMutation_realmList_Store($loadEvent);

	let value: (RealmInput | null | undefined)[] = [];
	$: if (nodes && nodes.length > 0) {
		value = nodes;
	} else {
		value = [];
	}
	let args: QueryRealmConnectionArgs = {};
	let orderBy: RealmOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined, params?: FetchParams | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_realmConnection_Store.fetch(buildArguments(args), params).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationRealmArgs, params?: FetchParams | undefined) => {
		const row = value
			?.map((node) => node?.id)
			?.indexOf(args.id || args.where?.id?.val || undefined);
			
		validate('Mutation_realm_Arguments', args)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_realm_Store.fetch(args, params).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors, data);
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
				console.error(validErrors);
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};
</script>

<div class="flex justify-between items-center">
	<Breadcrumbs>
		<li>
			<span class="badge badge-neutral">{$LL.graphql.objects.Realm.name()}</span>
		</li>
	</Breadcrumbs>
	<ModuleMenu>
		<ExportDialog
			on:export={(e) => {
				export_realmConnection_Store
					.fetch(buildArguments({ ...args, orderBy, first: e.detail.pageSize }))
					.then((result) => {
						if (result.errors) {
							console.error(errors);
							toast.error($LL.graphence.message.requestFailed());
						} else {
							const nodes = result.data?.realmConnection?.edges?.map((edge) => edge?.node);
							const json = toRecords($LL, nodes);
							if (json) {
								e.detail.writeFile($LL.graphql.objects.Realm.name(), json);
							}
						}
					});
			}}
			on:template={(e) => {
				const json = toRecords($LL, [{}]);
				if (json) {
					e.detail.writeFile($LL.graphql.objects.Realm.name(), json);
				}
			}}
		/>
		<ImportDialog
			on:import={(e) => {
				const list = fromRecords($LL, e.detail.json);
				if (list) {
					validate('Mutation_realmList_Arguments', { list })
						.then((data) => {
							import_realmList_Store
								.fetch({ list }, { directives: [merge(), uniqueMerge()] })
								.then((result) => {
									if (result.errors) {
										console.error(result.errors);
										const errors = buildGraphQLErrors(result.errors, data);
										if (errors.list?.iterms) {
											e.detail.writeErrorsFile(
												$LL.graphql.objects.Realm.name(),
												e.detail.json,
												toErrors(errors.list?.iterms)
											);
										}
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
							console.error(validErrors);
							e.detail.writeErrorsFile(
								$LL.graphql.objects.Realm.name(),
								e.detail.json,
								toErrors(validErrors.list?.iterms)
							);
						});
				}
			}}
		/>
	</ModuleMenu>
</div>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<RealmTable
			showRemoveButton={auth('Realm::isDeprecated::WRITE')}
			showEditButton
			showCreateButton={auth('Realm::*::WRITE')}
			showBackButton={$canBack}
			showSearchInput
			showFilter
			{value}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_realmConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_realm_Store.isFetching}
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
					to(`/${$locale}/realm/${e.detail.value.id}`);
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
			on:create={(e) => to(`/${$locale}/realm/_`)}
			on:goto={(e) => to(`/${$locale}/realm/${e.detail.path}`)}
			on:back={(e) => ot()}
		/>
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</CardBody>
</Card>
