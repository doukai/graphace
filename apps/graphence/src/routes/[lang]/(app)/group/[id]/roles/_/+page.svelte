<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { RoleInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id;
	$: mutation_group_roles_Store = data.mutation_group_roles_Store;

	let value: RoleInput = {};
	let errors: Record<string, Errors> = {};

	const merge = (input: RoleInput) => {
		validate('Mutation_group_Arguments', { where: { id: { val: id } }, roles: [input] })
			.then((data) => {
				errors = {};
				mutation_group_roles_Store
					.fetch({
						group_id: id,
						group_roles: [input]
					})
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
				errors = validErrors.roles?.iterms[0]?.iterms;
			});
	};
</script>

<Breadcrumbs>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/group`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Group.name()}</span>
		</a>
	</li>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/group/${id}`)}>
			<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.Group.name() })}</span>
		</a>
	</li>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/group/${id}/roles`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Group.fields.roles.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphence.path.create({ name: $LL.graphql.objects.Role.name() })}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0 overflow-auto">
		<RoleForm
			showSaveButton={auth('Role::*::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isMutating={$validator.isValidating || $mutation_group_roles_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					merge(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
