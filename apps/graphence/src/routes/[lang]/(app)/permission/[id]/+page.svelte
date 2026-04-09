<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { PermissionInput, MutationPermissionArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_permission_Store = data.query_permission_Store;
	$: permission = $query_permission_Store.response.data?.permission;
	$: mutation_permission_Store = data.mutation_permission_Store;

	let value: PermissionInput = {};
	let errors: Record<string, Errors> = {};

	$: if (permission && Object.keys(permission).length > 0) {
		value = permission;
	} else {
		value = {};
	}

	const mutation = (args: MutationPermissionArgs) => {
		validate('Mutation_permission_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_permission_Store.fetch(args).then((result) => {
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
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/permission`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Permission.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">
			{value?.id != null
				? $LL.graphence.path.edit({ name: $LL.graphql.objects.Permission.name() })
				: $LL.graphence.path.create({ name: $LL.graphql.objects.Permission.name() })}
		</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<PermissionForm
			showSaveButton={auth('Permission::*::WRITE')}
			showRemoveButton={auth('Permission::isDeprecated::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isFetching={$query_permission_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_permission_Store.isFetching}
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
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
