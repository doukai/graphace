<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
	import FileForm from '~/lib/components/objects/file/FileForm.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { FileInput, MutationFileArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_file_Store = data.query_file_Store;
	$: file = $query_file_Store.response.data?.file;
	$: mutation_file_Store = data.mutation_file_Store;

	let value: FileInput = {};
	let errors: Record<string, Errors> = {};

	$: if (file && Object.keys(file).length > 0) {
		value = file;
	} else {
		value = {};
	}

	const mutation = (args: MutationFileArgs, params?: FetchParams | undefined) => {
		validate('Mutation_file_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_file_Store.fetch(args, params).then((result) => {
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
</script>

<Breadcrumbs>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/file`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.File.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">
			{value?.id != null
				? $LL.graphence.path.edit({ name: $LL.graphql.objects.File.name() })
				: $LL.graphence.path.create({ name: $LL.graphql.objects.File.name() })}
		</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<FileForm
			showSaveButton={auth('File::*::WRITE')}
			showRemoveButton={auth('File::isDeprecated::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isFetching={$query_file_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_file_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation(e.detail.value);
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
			on:goto={(e) => to(`/${$locale}/file/${e.detail.path}`)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
