<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { GroupInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id;
	$: mutation_user_groups_Store = data.mutation_user_groups_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (input: GroupInput) => {
		validate('Mutation_user_Arguments', { where: { id: { val: id } }, groups: [input] })
			.then((data) => {
				errors = {};
				mutation_user_groups_Store.fetch({
					user_id: id,
					user_groups: [input]
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
				errors = validErrors.groups?.iterms[0]?.iterms;
			});
	};
</script>

<Breadcrumbs>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/user`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.User.name()}</span>
		</a>
	</li>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/user/${id}`)}>
			<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.User.name() })}</span>
		</a>
	</li>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/user/${id}/groups`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.User.fields.groups.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphence.path.create({ name: $LL.graphql.objects.Group.name() })}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0 overflow-auto">
		<GroupForm
			showSaveButton={auth('Group::*::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isMutating={$validator.isValidating || $mutation_user_groups_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					merge(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
