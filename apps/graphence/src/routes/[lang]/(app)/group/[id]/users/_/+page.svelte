<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { merge } from '@graphace/graphql';
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
	$: mutation_group_users_Store = data.mutation_group_users_Store;

	let value: UserInput = {};
	let errors: Record<string, Errors> = {};

	const mutation_users = (input: UserInput) => {
		validate('Mutation_group_Arguments', { where: { id: { val: id } }, users: [input] })
			.then((data) => {
				errors = {};
				mutation_group_users_Store
					.fetch(
						{
							group_id: id,
							group_users: [input]
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
				errors = validErrors.users?.iterms[0]?.iterms;
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
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/group/${id}/users`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Group.fields.users.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphence.path.create({ name: $LL.graphql.objects.User.name() })}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<UserForm
			showSaveButton={auth('User::*::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isMutating={$validator.isValidating || $mutation_group_users_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation_users(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
