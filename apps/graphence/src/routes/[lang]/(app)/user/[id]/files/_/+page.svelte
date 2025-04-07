<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import FileForm from '~/lib/components/objects/file/FileForm.svelte';
	import type { Mutation_user_files_Store } from '~/lib/stores/mutation/mutation_user_files_store';
	import type { Mutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { FileInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: id = data.id as string;
	$: mutation_user_files_Store = data.mutation_user_files_Store as Mutation_user_files_Store;
	$: mutation_singleUpload_Store = data.mutation_singleUpload_Store as Mutation_singleUpload_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (args: FileInput) => {
		validate('Mutation_user_Arguments', { where: { id: { val: id } }, files: [args] }, $locale)
			.then((data) => {
				errors = {};
				mutation_user_files_Store.fetch({
					user_id: id,
					user_files: [args]
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
				errors = validErrors.files?.iterms[0]?.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<FileForm
			showSaveButton={true}
			showBackButton={$canBack}
			bind:value
			{errors}
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
			on:goto={(e) => to(`../../../${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
			on:upload={(e) => {
				mutation_singleUpload_Store.fetch({ file: e.detail.file }).then((result) =>
					e.detail.then(result.data?.singleUpload)
				);
			}}
		/>
	</CardBody>
</Card>
