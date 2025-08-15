<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_realm_Store } from '~/lib/stores/query/query_realm_store';
	import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import {
		loadEvent,
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { Realm, MutationRealmArgs, RealmInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: RealmInput | null | undefined = {};
	export let textFieldName: (keyof Realm & keyof RealmInput) | undefined = undefined;
	export let text: string | undefined = undefined;
	export let errors: Record<string, Errors> = {};
	export let select: boolean | undefined = false;
	export let queryById: boolean | undefined = false;
	export let clearAfterSelect: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'btn-link p-0 truncate';
	export { className as class };

	const { validate } = validator;
	const { auth } = permissions;
	export let fields: {
		name?: Option | undefined;
		description?: Option | undefined;
	} = {
		name: {
			readonly: !auth('Realm::name::WRITE'),
			disabled: !auth('Realm::name::WRITE'),
			hidden: !auth('Realm::name::READ')
		},
		description: {
			readonly: !auth('Realm::description::WRITE'),
			disabled: !auth('Realm::description::WRITE'),
			hidden: !auth('Realm::description::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: { value: RealmInput | null | undefined };
	}>();

	const query_realm_Store = createQuery_realm_Store($loadEvent);
	const mutation_realm_Store = createMutation_realm_Store($loadEvent);
	export let close: (() => void) | undefined = undefined;

 	$: if (textFieldName) {
		if (value && !value?.[textFieldName]) {
			query_realm_Store
				.fetch({
					id: { opr: 'EQ', val: value.id }
				})
				.then((response) => {
					value = {
						[textFieldName]: response.data?.realm?.[textFieldName],
						id: response.data?.realm?.id
					};
				});
		} else if (value) {
			text = value[textFieldName] + '';
		}
	}

	const query = () => {
		query_realm_Store.fetch({ id: { val: value?.id } }).then((result) => {
			value = result.data?.realm;
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationRealmArgs) => {
		validate('Mutation_realm_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_realm_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						dispatch('select', { value: result.data?.realm });
						if (clearAfterSelect) {
							value = {};
						}
						if (close) {
							close();
						}
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				errors = validErrors;
			});
	};
</script>

<Dialog bind:close>
	<svelte:fragment slot="trigger" let:trigger let:zIndex>
		<div class="tooltip md:hidden" data-tip={text}>
			<button
				use:melt={trigger}
				class="btn {className} max-sm:btn-square"
				{disabled}
				on:click={(e) => {
					if (queryById && value?.id) {
						query();
					}
				}}
			>
				<slot name="sm">
					{#if text}
						{text}
					{:else}
						{$LL.ui.button.select()}
					{/if}
				</slot>
			</button>
		</div>
		<button
			use:melt={trigger}
			class="btn {className} max-md:hidden"
			{disabled}
			on:click={(e) => {
				if (queryById && value?.id) {
					query();
				}
			}}
		>
			<slot>
				{#if text}
					{text}
				{:else}
					{$LL.ui.button.select()}
				{/if}
			</slot>
		</button>
	</svelte:fragment>
	<svelte:fragment let:zIndex>
		<RealmForm
			showSaveButton={!readonly && auth('Realm::*::WRITE')}
			showRemoveButton={!readonly && auth('Realm::isDeprecated::WRITE')}
			bind:value
			{errors}
			isFetching={$query_realm_Store.isFetching}
			isMutating={$mutation_realm_Store.isFetching}
			{fields}
			on:save={(e) => {
				if (select) {
					dispatch('select', { value });
					if (clearAfterSelect) {
						value = {};
					}
					if (close) {
						close();
					}
				} else if (e.detail.value) {
					mutation(e.detail.value);
				}
			}}
			on:remove={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.removeModalTitle(),
					confirm: () => {
						text = undefined;
						value = null;
						if (select) {
							dispatch('select', { value });
							if (clearAfterSelect) {
								value = {};
							}
							if (close) {
								close();
							}
						} else if (e.detail.value) {
							mutation({
								where: { id: { val: e.detail.value.id } },
								isDeprecated: true
							});
						}
						return true;
					}
				});
			}}
			on:goto={(e) => to(`/${$locale}/realm/${e.detail.path}`, e.detail.name)}
		/>
	</svelte:fragment>
</Dialog>
