<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
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

	$: query_realm_Store = data.query_realm_Store;
	$: realm = $query_realm_Store.response.data?.realm;
	$: mutation_realm_Store = data.mutation_realm_Store;

	let value: RealmInput = {};
	let errors: Record<string, Errors> = {};

	$: if (realm && Object.keys(realm).length > 0) {
		value = realm;
	} else {
		value = {};
	}

	const mutation = (args: MutationRealmArgs, params?: FetchParams | undefined) => {
		validate('Mutation_realm_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_realm_Store.fetch(args, params).then((result) => {
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
</script>

<Breadcrumbs>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/realm`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.Realm.name()}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">
			{value?.id != null
				? $LL.graphence.path.edit({ name: $LL.graphql.objects.Realm.name() })
				: $LL.graphence.path.create({ name: $LL.graphql.objects.Realm.name() })}
		</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<RealmForm
			showSaveButton={auth('Realm::*::WRITE')}
			showRemoveButton={auth('Realm::isDeprecated::WRITE')}
			showBackButton={$canBack}
			{value}
			{errors}
			isFetching={$query_realm_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_realm_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation(e.detail.value);
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
			on:goto={(e) => to(`/${$locale}/realm/${e.detail.path}`)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
