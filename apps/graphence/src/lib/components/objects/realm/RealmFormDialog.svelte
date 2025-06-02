<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_realm_Store } from '~/lib/stores/query/query_realm_store';
	import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
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
	let className: string | undefined = 'btn-link p-0';
	export { className as class };

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');
	export let fields: {
		name?: Option | undefined;
		description?: Option | undefined;
	} = {
		name: {
			readonly: !permissions.auth('Realm::name::WRITE'),
			disabled: !permissions.auth('Realm::name::WRITE'),
			hidden: !permissions.auth('Realm::name::READ')
		},
		description: {
			readonly: !permissions.auth('Realm::description::WRITE'),
			disabled: !permissions.auth('Realm::description::WRITE'),
			hidden: !permissions.auth('Realm::description::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: {
			value: RealmInput | null | undefined;
			original: RealmInput | null | undefined;
		};
	}>();

	const query_realm_Store = createQuery_realm_Store(getLoadEvent());
	const mutation_realm_Store = createMutation_realm_Store(getLoadEvent());
	export let close: (() => void) | undefined = undefined;

 	$: if (value) {
		if (value?.id && !value.where) {
			value = { ...value, where: { id: { val: value.id } } };
		}
		if (textFieldName) {
			if (!value?.[textFieldName]) {
				query_realm_Store
					.fetch({
						id: { opr: 'EQ', val: value.where?.id?.val }
					})
					.then((response) => {
						value = {
							...response.data?.realm,
							where: { id: { val: response.data?.realm?.id } }
						};
						text = value?.[textFieldName] + '';
					});
			} else {
				text = value?.[textFieldName] + '';
			}
		}
	}

	const query = () => {
		query_realm_Store.fetch({ id: { val: value?.where?.id?.val } }).then((result) => {
			value = result.data?.realm;
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationRealmArgs) => {
		validate('Mutation_realm_Arguments', args, $locale)
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
						dispatch('select', { value: result.data?.realm, original: args });
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
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_realm_Store.isFetching}
			isMutating={$mutation_realm_Store.isFetching}
			{fields}
			on:save={(e) => {
				if (e.detail.value) {
					const original = e.detail.value;
					if (textFieldName) {
						text = original?.[textFieldName] + '';
					}
					value = { ...original, where: { id: { val: original.id } } };
					if (select) {
						dispatch('select', { value, original });
						if (clearAfterSelect) {
							value = {};
						}
						if (close) {
							close();
						}
					} else {
						mutation(e.detail.value);
					}
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					const original = e.detail.value;
					text = undefined;
					value = null;
					if (select) {
						dispatch('select', { value, original });
						if (clearAfterSelect) {
							value = {};
						}
						if (close) {
							close();
						}
					} else {
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
				}
			}}
			on:goto={(e) => to(e.detail.path, e.detail.name)}
		/>
	</svelte:fragment>
</Dialog>
