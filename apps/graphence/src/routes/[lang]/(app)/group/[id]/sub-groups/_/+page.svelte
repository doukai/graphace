<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { merge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
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
	$: mutation_group_subGroups_Store = data.mutation_group_subGroups_Store;

	let value: GroupInput = {};
	let errors: Record<string, Errors> = {};

	const mutation_subGroups = (input: GroupInput, params?: FetchParams | undefined) => {
		validate('Mutation_group_Arguments', { where: { id: { val: id } }, subGroups: [input] })
			.then((data) => {
				errors = {};
				mutation_group_subGroups_Store
					.fetch(
						{
							group_id: id,
							group_subGroups: [input]
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
				errors = validErrors.subGroups?.iterms[0]?.iterms;
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
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/group/${id}/sub-groups`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Group.fields.subGroups.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphence.path.create({ name: $LL.graphql.objects.Group.name() })}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<GroupForm
			showSaveButton={auth('Group::*::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isMutating={$validator.isValidating || $mutation_group_subGroups_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation_subGroups(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
