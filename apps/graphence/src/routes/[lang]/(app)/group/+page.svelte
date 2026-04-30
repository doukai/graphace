<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { buildArguments, merge, uniqueMerge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
	import {
		toRecords,
		fromRecords,
		toErrors
	} from '~/lib/components/objects/group/GroupOption';
	import GroupTable from '~/lib/components/objects/group/GroupTable.svelte';
	import ModuleMenu from '~/lib/components/menu/ModuleMenu.svelte';
	import ExportDialog from '~/lib/components/xlsx/ExportDialog.svelte';
	import ImportDialog from '~/lib/components/xlsx/ImportDialog.svelte';
	import { createQuery_groupConnection_Store } from '~/lib/stores/query/query_groupConnection_store';
	import { createMutation_groupList_Store } from '~/lib/stores/mutation/mutation_groupList_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors,
		loadEvent
	} from '~/utils';
	import type { QueryGroupConnectionArgs, GroupOrderBy, GroupInput, MutationGroupArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_groupConnection_Store = data.query_groupConnection_Store;
	$: nodes = $query_groupConnection_Store.response.data?.groupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_groupConnection_Store.response.data?.groupConnection?.totalCount || 0;
	$: mutation_group_Store = data.mutation_group_Store;

	const export_groupConnection_Store = createQuery_groupConnection_Store($loadEvent);
	const import_groupList_Store = createMutation_groupList_Store($loadEvent);

	let value: (GroupInput | null | undefined)[] = [];
	$: if (nodes && nodes.length > 0) {
		value = nodes;
	} else {
		value = [];
	}
	let args: QueryGroupConnectionArgs = {};
	let orderBy: GroupOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined, params?: FetchParams | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_groupConnection_Store.fetch(buildArguments(args), params).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationGroupArgs, params?: FetchParams | undefined) => {
		const row = value
			?.map((node) => node?.id)
			?.indexOf(args.id || args.where?.id?.val || undefined);
			
		validate('Mutation_group_Arguments', args)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_group_Store.fetch(args, params).then((result) => {
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
			<span class="badge badge-neutral">{$LL.graphql.objects.Group.name()}</span>
		</li>
	</Breadcrumbs>
	<ModuleMenu>
		<ExportDialog
			on:export={(e) => {
				export_groupConnection_Store
					.fetch(buildArguments({ ...args, orderBy, first: e.detail.pageSize }))
					.then((result) => {
						if (result.errors) {
							console.error(errors);
							toast.error($LL.graphence.message.requestFailed());
						} else {
							const nodes = result.data?.groupConnection?.edges?.map((edge) => edge?.node);
							const json = toRecords($LL, nodes);
							if (json) {
								e.detail.writeFile($LL.graphql.objects.Group.name(), json);
							}
						}
					});
			}}
			on:template={(e) => {
				const json = toRecords($LL, [{}]);
				if (json) {
					e.detail.writeFile($LL.graphql.objects.Group.name(), json);
				}
			}}
		/>
		<ImportDialog
			on:import={(e) => {
				const list = fromRecords($LL, e.detail.json);
				if (list) {
					validate('Mutation_groupList_Arguments', { list })
						.then((data) => {
							import_groupList_Store
								.fetch({ list }, { directives: [merge(), uniqueMerge()] })
								.then((result) => {
									if (result.errors) {
										console.error(result.errors);
										const errors = buildGraphQLErrors(result.errors, data);
										if (errors.list?.iterms) {
											e.detail.writeErrorsFile(
												$LL.graphql.objects.Group.name(),
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
								$LL.graphql.objects.Group.name(),
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
		<GroupTable
			showRemoveButton={auth('Group::isDeprecated::WRITE')}
			showEditButton
			showCreateButton={auth('Group::*::WRITE')}
			showBackButton={$canBack}
			showSearchInput
			showFilter
			{value}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_groupConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_group_Store.isFetching}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						path: { opr: 'LK', val: e.detail.value },
						parentId: { opr: 'LK', val: e.detail.value },
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
					to(`/${$locale}/group/${e.detail.value.id}`);
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
			on:create={(e) => to(`/${$locale}/group/_`)}
			on:goto={(e) => to(`/${$locale}/group/${e.detail.path}`)}
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
