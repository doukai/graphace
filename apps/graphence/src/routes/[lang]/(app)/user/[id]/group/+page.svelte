<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { merge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import GroupTableDialog from '~/lib/components/objects/group/GroupTableDialog.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { GroupInput, MutationGroupArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;
	
	$: id = data.id;
	$: query_user_group_Store = data.query_user_group_Store;
	$: user = $query_user_group_Store.response.data?.user;
	$: group = user?.group;
	$: mutation_user_group_Store = data.mutation_user_group_Store;
	$: mutation_group_Store = data.mutation_group_Store;

	let value: GroupInput = {};
	let showUnbindButton = false;
	let errors: Record<string, Errors> = {};

	$: if (group && Object.keys(group).length > 0) {
		value = group;
		showUnbindButton = true;
	} else {
		value = {};
		showUnbindButton = false;
	}

	const mutation = (args: MutationGroupArgs, params?: FetchParams | undefined) => {
		validate('Mutation_group_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_group_Store.fetch(args, params).then((result) => {
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

	const mutation_group = (input: GroupInput | null, params?: FetchParams | undefined) => {
		validate('Mutation_user_Arguments', { where: { id: { val: user?.id } }, group: input })
			.then((data) => {
				errors = {};
				mutation_user_group_Store
					.fetch(
						{
							user_id: id,
							user_group: input
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
				errors = validErrors.group.iterms;
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
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/user/${user?.id}`)}>
			<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.User.name() })}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphql.objects.User.fields.group.name()}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<GroupForm
			showSaveButton={auth('Group::*::WRITE')}
			showUnbindButton={showUnbindButton && auth('Group::isDeprecated::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isFetching={$query_user_group_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_user_group_Store.isFetching || $mutation_group_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation_group(e.detail.value);
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
			on:unbind={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.unbindModalTitle(),
					confirm: () => {
						mutation_group(null);
						return true;
					}
				});
			}}
			on:goto={(e) => to(`/${$locale}/group/${e.detail.path}`)}
			on:back={(e) => ot()}
		>
			{#if auth('Group::*::WRITE')}
				<GroupTableDialog
					singleChoice
					class="btn-accent"
					on:select={(e) => {
						if (!Array.isArray(e.detail.value) && e.detail.value !== undefined) {
							mutation_group(e.detail.value);
						}
					}}
				>
					<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
				</GroupTableDialog>
			{/if}
		</GroupForm>
	</CardBody>
</Card>