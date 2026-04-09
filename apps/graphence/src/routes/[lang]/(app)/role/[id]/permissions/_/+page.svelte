<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { merge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { PermissionInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id;
	$: mutation_role_permissions_Store = data.mutation_role_permissions_Store;

	let value: PermissionInput = {};
	let errors: Record<string, Errors> = {};

	const mutation_permissions = (input: PermissionInput) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id } }, permissions: [input] })
			.then((data) => {
				errors = {};
				mutation_role_permissions_Store
					.fetch(
						{
							role_id: id,
							role_permissions: [input]
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
				errors = validErrors.permissions?.iterms[0]?.iterms;
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
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/role/${id}`)}>
			<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.Role.name() })}</span>
		</a>
	</li>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/role/${id}/permissions`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Role.fields.permissions.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphence.path.create({ name: $LL.graphql.objects.Permission.name() })}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<PermissionForm
			showSaveButton={auth('Permission::*::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isMutating={$validator.isValidating || $mutation_role_permissions_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation_permissions(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
