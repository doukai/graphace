<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors } from '@graphace/commons';
	import { to, Dialog, toast, modal, type TabInfo } from '@graphace/ui';
	import { createQuery_realm_Store } from '~/lib/stores/query/query_realm_store';
	import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import type { RealmFields, RealmFieldsArgs } from '~/lib/components/objects/realm/RealmOption';
	import {
		loadEvent,
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { Realm, QueryRealmArgs, MutationRealmArgs, RealmInput } from '~/lib/types/schema';
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
	export let tabs: (($LL: TranslationFunctions, args?: QueryRealmArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;
	export let tab: string | undefined = undefined;
	export let fields: RealmFields | undefined = undefined;
	export let fieldsPatch: RealmFields | undefined = undefined;
	export let fieldsArgs: RealmFieldsArgs | undefined = undefined;

	const { validate } = validator;
	const { auth } = permissions;

	const dispatch = createEventDispatcher<{
		select: { value: RealmInput | null | undefined };
	}>();

	const query_realm_Store = createQuery_realm_Store($loadEvent);
	const mutation_realm_Store = createMutation_realm_Store($loadEvent);
	export let close: (() => void) | undefined = undefined;

 	$: if (textFieldName) {
		if (value && !value?.[textFieldName] && value.id) {
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
		} else {
			text = undefined;
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
	<div class="tooltip" data-tip={text} slot="trigger" let:trigger let:zIndex>
		<button
			use:melt={trigger}
			class="btn truncate {className} max-sm:hidden"
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
		<button
			use:melt={trigger}
			class="btn btn-square {className} sm:hidden"
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
	<svelte:fragment let:zIndex>
		<RealmForm
			showSaveButton={!readonly && auth('Realm::*::WRITE')}
			showRemoveButton={!readonly && auth('Realm::isDeprecated::WRITE')}
			{value}
			{errors}
			isFetching={$query_realm_Store.isFetching}
			isMutating={$mutation_realm_Store.isFetching}
			{tabs}
			{tab}
			{fields}
			{fieldsPatch}
			{fieldsArgs}
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
			on:goto={(e) => to(`/${$locale}/realm/${e.detail.path}`)}
		/>
	</svelte:fragment>
</Dialog>
