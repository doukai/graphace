<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import FileTable from '~/lib/components/objects/file/FileTable.svelte';
	import type { Query_user_filesConnection_Store } from '~/lib/stores/query/query_user_filesConnection_store';
	import type { Mutation_user_files_Store } from '~/lib/stores/mutation/mutation_user_files_store';
	import type { Mutation_file_Store } from '~/lib/stores/mutation/mutation_file_store';
	import type { Mutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { FileInput, MutationFileArgs, QueryFileConnectionArgs, UserOrderBy } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_user_filesConnection_Store = data.query_user_filesConnection_Store as Query_user_filesConnection_Store;
	$: user = $query_user_filesConnection_Store.response.data?.user;
	$: nodes = $query_user_filesConnection_Store.response.data?.user?.filesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_user_filesConnection_Store.response.data?.user?.filesConnection?.totalCount || 0;
	$: mutation_user_files_Store = data.mutation_user_files_Store as Mutation_user_files_Store;
	$: mutation_file_Store = data.mutation_file_Store as Mutation_file_Store;
	$: mutation_singleUpload_Store = data.mutation_singleUpload_Store as Mutation_singleUpload_Store;
	let args: QueryFileConnectionArgs = {};
	let orderBy: FileOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_user_filesConnection_Store.fetch({ user_id: user?.id, ...buildArguments(args) }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationFileArgs) => {
		validate('Mutation_file_Arguments', args, $locale)
			.then((data) => {
				errors = {};
				mutation_file_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors);
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
				errors = validErrors;
			});
	};

	const merge = (args: FileInput[]) => {
		validate('Mutation_user_Arguments', { where: { id: { val: user?.id } }, files: args }, $locale)
			.then((data) => {
				errors = {};
				mutation_user_files_Store.fetch({
					user_id: user?.id,
					user_files: args
				}).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors);
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
				errors = validErrors.files.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<FileTable
			showUnbindButton={true}
			showEditButton={true}
			showCreateButton={true}
			showBackButton={$canBack}
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_user_filesConnection_Store.isFetching}
			fields={{
				name: {
					readonly: !permissions.auth('File::name::WRITE'),
					disabled: !permissions.auth('File::name::WRITE'),
					hidden: !permissions.auth('File::name::READ')
				},
				contentType: {
					readonly: !permissions.auth('File::contentType::WRITE'),
					disabled: !permissions.auth('File::contentType::WRITE'),
					hidden: !permissions.auth('File::contentType::READ')
				},
				content: {
					readonly: !permissions.auth('File::content::WRITE'),
					disabled: !permissions.auth('File::content::WRITE'),
					hidden: !permissions.auth('File::content::READ')
				},
				url: {
					readonly: !permissions.auth('File::url::WRITE'),
					disabled: !permissions.auth('File::url::WRITE'),
					hidden: !permissions.auth('File::url::READ')
				}
			}}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						contentType: { opr: 'LK', val: e.detail.value },
						content: { opr: 'LK', val: e.detail.value },
						url: { opr: 'LK', val: e.detail.value },
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
					to(`../../file/${e.detail.value.id}`, e.detail.value.id);
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
			on:unbind={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.unbindModalTitle(),
					confirm: () => {
						if (Array.isArray(e.detail.value)) {
							merge(
								e.detail.value.map((node) => ({
									where: { id: { val: node?.id } },
									isDeprecated: true
								}))
							);
						} else {
							merge([
								{
									where: { id: { val: e.detail.value?.id } },
									isDeprecated: true
								}
							]);
						}
						return true;
					}
				});
			}}
			on:create={(e) => to('../../file/_', '_')}
			on:goto={(e) => to(`../../file/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
			on:upload={(e) => {
				mutation_singleUpload_Store.fetch({ file: e.detail.file }).then((result) =>
					e.detail.then(result.data?.singleUpload)
				);
			}}
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
