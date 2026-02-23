<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import GroupTableDialog from '~/lib/components/objects/group/GroupTableDialog.svelte';
	import type { Query_group_parent_Store } from '~/lib/stores/query/query_group_parent_store';
	import type { Mutation_group_parent_Store } from '~/lib/stores/mutation/mutation_group_parent_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
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

	$: query_group_parent_Store = data.query_group_parent_Store as Query_group_parent_Store;
	$: group = $query_group_parent_Store.response.data?.group;
	$: node = group?.parent;
	$: mutation_group_parent_Store = data.mutation_group_parent_Store as Mutation_group_parent_Store;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;

	let value = {};
	let showUnbindButton = false;
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
		showUnbindButton = true;
	}

	const mutation = (args: MutationGroupArgs) => {
		validate('Mutation_group_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_group_Store.fetch(args).then((result) => {
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

	const merge = (input: GroupInput | null) => {
		validate('Mutation_group_Arguments', { where: { id: { val: group?.id } }, parent: input })
			.then((data) => {
				errors = {};
				mutation_group_parent_Store.fetch({
					group_id: group?.id,
					group_parent: input
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
				errors = validErrors.parent.iterms;
			});
	};
</script>

<Card class="max-h-full max-w-full">
	<CardBody class="overflow-y-auto pt-0">
		<Breadcrumbs>
			<li>
				<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/group`)}>
					<span class="badge badge-outline">{$LL.graphql.objects.Group.name()}</span>
				</a>
			</li>
			<li>
				<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/group/${group?.id}`)}>
					<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.Group.name() })}</span>
				</a>
			</li>
			<li>
				<span class="badge badge-neutral">{$LL.graphql.objects.Group.fields.parent.name()}</span>
			</li>
		</Breadcrumbs>
		<GroupForm
			showSaveButton={auth('Group::*::WRITE')}
			showUnbindButton={showUnbindButton && auth('Group::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_group_parent_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_group_parent_Store.isFetching || $mutation_group_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					merge(e.detail.value);
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
						merge(null);
						return true;
					}
				});
			}}
			on:goto={(e) => to(`/${$locale}/group/${e.detail.path}`)}
			on:back={(e) => ot()}
		>
			{#if auth('Group::*::WRITE')}
				<GroupTableDialog
					args={{ not: true, parent: { id: { val: group?.id } } }}
					singleChoice
					class="btn-accent"
					on:select={(e) => {
						if (!Array.isArray(e.detail.value)) {
							merge(e.detail.value);
						}
					}}
				>
					<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
				</GroupTableDialog>
			{/if}
		</GroupForm>
	</CardBody>
</Card>