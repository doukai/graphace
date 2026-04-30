<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { merge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
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
	$: mutation_role_composites_Store = data.mutation_role_composites_Store;

	let value: RoleInput = {};
	let errors: Record<string, Errors> = {};

	const mutation_composites = (input: RoleInput, params?: FetchParams | undefined) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id } }, composites: [input] })
			.then((data) => {
				errors = {};
				mutation_role_composites_Store
					.fetch(
						{
							role_id: id,
							role_composites: [input]
						},
						{ directives: [merge()], ...params }
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
				errors = validErrors.composites?.iterms[0]?.iterms;
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
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/role/${id}/composites`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Role.fields.composites.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphence.path.create({ name: $LL.graphql.objects.Role.name() })}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<RoleForm
			showSaveButton={auth('Role::*::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isMutating={$validator.isValidating || $mutation_role_composites_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation_composites(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
