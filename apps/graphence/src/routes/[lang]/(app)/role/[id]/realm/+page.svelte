<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { merge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { RealmInput, MutationRealmArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;
	
	$: id = data.id;
	$: query_role_realm_Store = data.query_role_realm_Store;
	$: role = $query_role_realm_Store.response.data?.role;
	$: realm = role?.realm;
	$: mutation_role_realm_Store = data.mutation_role_realm_Store;
	$: mutation_realm_Store = data.mutation_realm_Store;

	let value: RealmInput = {};
	let showUnbindButton = false;
	let errors: Record<string, Errors> = {};

	$: if (realm && Object.keys(realm).length > 0) {
		value = realm;
		showUnbindButton = true;
	} else {
		value = {};
		showUnbindButton = false;
	}

	const mutation = (args: MutationRealmArgs) => {
		validate('Mutation_realm_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_realm_Store.fetch(args).then((result) => {
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

	const mutation_realm = (input: RealmInput | null) => {
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, realm: input })
			.then((data) => {
				errors = {};
				mutation_role_realm_Store
					.fetch(
						{
							role_id: id,
							role_realm: input
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
				errors = validErrors.realm.iterms;
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
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/role/${role?.id}`)}>
			<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.Role.name() })}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphql.objects.Role.fields.realm.name()}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<RealmForm
			showSaveButton={auth('Realm::*::WRITE')}
			showUnbindButton={showUnbindButton && auth('Realm::isDeprecated::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isFetching={$query_role_realm_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_role_realm_Store.isFetching || $mutation_realm_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation_realm(e.detail.value);
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
						mutation_realm(null);
						return true;
					}
				});
			}}
			on:goto={(e) => to(`/${$locale}/realm/${e.detail.path}`)}
			on:back={(e) => ot()}
		>
			{#if auth('Realm::*::WRITE')}
				<RealmTableDialog
					singleChoice
					class="btn-accent"
					on:select={(e) => {
						if (!Array.isArray(e.detail.value) && e.detail.value !== undefined) {
							mutation_realm(e.detail.value);
						}
					}}
				>
					<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
				</RealmTableDialog>
			{/if}
		</RealmForm>
	</CardBody>
</Card>