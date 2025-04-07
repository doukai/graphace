<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import FileForm from '~/lib/components/objects/file/FileForm.svelte';
	import type { Query_user_file_Store } from '~/lib/stores/query/query_user_file_store';
	import type { Mutation_user_file_Store } from '~/lib/stores/mutation/mutation_user_file_store';
	import type { Mutation_file_Store } from '~/lib/stores/mutation/mutation_file_store';
	import type { Mutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { FileInput, MutationFileArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_user_file_Store = data.query_user_file_Store as Query_user_file_Store;
	$: user = $query_user_file_Store.response.data?.user;
	$: node = user?.file;
	$: mutation_user_file_Store = data.mutation_user_file_Store as Mutation_user_file_Store;
	$: mutation_file_Store = data.mutation_file_Store as Mutation_file_Store;
	$: mutation_singleUpload_Store = data.mutation_singleUpload_Store as Mutation_singleUpload_Store;

	let value = {};
	let showUnbindButton = false;
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
		showUnbindButton = true;
	}

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

	const merge = (args: FileInput | null) => {
		validate('Mutation_user_Arguments', { where: { id: { val: user?.id } }, file: args }, $locale)
			.then((data) => {
				errors = {};
				mutation_user_file_Store.fetch({
					user_id: user?.id,
					user_file: args
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
				errors = validErrors.file.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<FileForm
			showSaveButton={true}
			{showUnbindButton}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_user_file_Store.isFetching}
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
			on:save={(e) => {
				if (e.detail.value) {
					merge(e.detail.value);
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					modal.open({
						title: $LL.graphence.components.modal.removeModalTitle(),
						confirm: () => {
							mutation({
								where: { id: { val: e.detail.value?.id } },
								isDeprecated: true
							});
							return true;
						}
					});
				}
			}}
			on:unbind={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.unbindModalTitle(),
					confirm: () => {
						merge(null);
						return true;
					}
				});
			}}
			on:goto={(e) => to(`../../${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
			on:upload={(e) => {
				mutation_singleUpload_Store.fetch({ file: e.detail.file }).then((result) =>
					e.detail.then(result.data?.singleUpload)
				);
			}}
		/>
	</CardBody>
</Card>