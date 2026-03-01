<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { UserInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id;
	$: mutation_role_users_Store = data.mutation_role_users_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (input: UserInput) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id } }, users: [input] })
			.then((data) => {
				errors = {};
				mutation_role_users_Store.fetch({
					role_id: id,
					role_users: [input]
				}).then((result) => {
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
				errors = validErrors.users?.iterms[0]?.iterms;
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
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/role/${id}/users`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Role.fields.users.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphence.path.create({ name: $LL.graphql.objects.User.name() })}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0 overflow-auto">
		<UserForm
			showSaveButton={auth('User::*::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isMutating={$validator.isValidating || $mutation_role_users_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					merge(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
