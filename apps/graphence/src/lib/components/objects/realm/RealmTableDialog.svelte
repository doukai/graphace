<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast, modal, type TabInfo } from '@graphace/ui';
	import { createQuery_realmConnection_Store } from '~/lib/stores/query/query_realmConnection_store';
	import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import RealmTable from '~/lib/components/objects/realm/RealmTable.svelte';
	import type { RealmFields, RealmFieldsArgs } from '~/lib/components/objects/realm/RealmOption';
	import {
		loadEvent,
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type {
		Realm,
		QueryRealmListArgs,
		QueryRealmConnectionArgs,
		RealmOrderBy,
		RealmInput,
		MutationRealmArgs
	} from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined =
		undefined;
	export let textFieldName: (keyof Realm & keyof RealmInput) | undefined = undefined;
	export let text: string | undefined = undefined;
	export let singleChoice: boolean | undefined = false;
	export let clearAfterSelect: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'btn-link p-0';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryRealmListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;
	export let tab: string | undefined = undefined;
	export let fields: RealmFields | undefined = undefined;
	export let fieldsPatch: RealmFields | undefined = undefined;
	export let fieldsArgs: RealmFieldsArgs | undefined = undefined;

	const { validate } = validator;
	const { auth } = permissions;
	
	const dispatch = createEventDispatcher<{
		select: { value: RealmInput | (RealmInput | null | undefined)[] | null | undefined };
	}>();

	const query_realmConnection_Store = createQuery_realmConnection_Store($loadEvent);
	const mutation_realm_Store = createMutation_realm_Store($loadEvent);
	$: nodes = $query_realmConnection_Store.response.data?.realmConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_realmConnection_Store.response.data?.realmConnection?.totalCount || 0;

	let _value: (RealmInput | null | undefined)[] = [];
	$: if (nodes && nodes.length > 0) {
		_value = nodes;
	} else {
		_value = [];
	}
	export let args: QueryRealmConnectionArgs = {};
	export let orderBy: RealmOrderBy = {};
	export let pageNumber: number = 1;
	export let pageSize: number = 10;
	export let errors: Record<number, Errors> = {};
	export let selectedIdList: (string | null | undefined)[] | undefined = [];
	export let close: (() => void) | undefined = undefined;
	
	$: if (textFieldName) {
		if (Array.isArray(value)) {
			if (value.some((item) => !item?.[textFieldName] && item?.id)) {
				query_realmConnection_Store
					.fetch({
						id: { opr: 'IN', arr: value?.map((item) => item?.id) }
					})
					.then((response) => {
						value = response.data?.realmConnection?.edges?.map((edge) => ({
							[textFieldName]: edge?.node?.[textFieldName],
							id: edge?.node?.id
						}));
					});
			} else {
				if (value.length > 3) {
					text = value
						.slice(0, 3)
						.map((node) => node?.[textFieldName])
						.filter((name) => name !== null)
						.join(',')
						.concat('...');
				} else {
					text = value
						.map((node) => node?.[textFieldName])
						.filter((name) => name !== null)
						.join(',');
				}
			}
		} else if (value) {
			if (!value?.[textFieldName] && value.id) {
				query_realmConnection_Store
					.fetch({
						id: { opr: 'EQ', val: value.id }
					})
					.then((response) => {
						value = response.data?.realmConnection?.edges?.map((edge) => ({
							[textFieldName]: edge?.node?.[textFieldName],
							id: edge?.node?.id
						}))?.[0];
					});
			} else {
				text = value[textFieldName] + '';
			}
		} else {
			text = undefined;
		}
	}

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_realmConnection_Store.fetch(buildArguments(args)).then((result) => {
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationRealmArgs) => {
		const row = _value
			?.map((node) => node?.id)
			?.indexOf(args.id || args.where?.id?.val || undefined);
			
		validate('Mutation_realm_Arguments', args)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_realm_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors, data);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError,
								confirm: () => {
									query();
									return true;
								}
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						query();
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
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
				query(1);
				if (selectedIdList?.length === 0) {
					if (Array.isArray(value)) {
						selectedIdList = value?.map((node) => node?.id);
					} else if (value) {
						selectedIdList = [value?.id];
					}
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
				query(1);
				if (selectedIdList?.length === 0) {
					if (Array.isArray(value)) {
						selectedIdList = value?.map((node) => node?.id);
					} else if (value) {
						selectedIdList = [value?.id];
					}
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
		<RealmTable
			value={_value}
			bind:selectedIdList
			bind:args
			bind:orderBy
			{errors}
			showEditButton={!readonly}
			showCreateButton={!readonly && auth('Realm::*::WRITE')}
			showSelectButton={!readonly && (!singleChoice || (selectedIdList?.length || 0) === 1)}
			isFetching={$query_realmConnection_Store.isFetching}
			{zIndex}
			{tabs}
			{tab}
			{fields}
			{fieldsPatch}
			{fieldsArgs}
			on:select={(e) => {
				if (Array.isArray(e.detail.value)) {
					if (singleChoice) {
						value = e.detail.value?.[0] || null;
					} else {
						value = e.detail.value;
					}
				} else if (e.detail.value) {
					value = e.detail.value;
				} else {
					value = null;
				}
				dispatch('select', { value });
				if (clearAfterSelect) {
					if (Array.isArray(e.detail.value)) {
						value = [];
					} else {
						value = undefined;
					}
					selectedIdList = [];
				}
				if (close) {
					close();
				}
			}}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					};
				} else {
					args = { first: pageSize, offset: 0 };
				}
				query();
			}}
			on:query={(e) => {
				args = e.detail.args;
				orderBy = e.detail.orderBy;
				query();
			}}
			on:save={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					mutation(e.detail.value);
				}
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`/${$locale}/realm/${e.detail.value.id}`);
				}
			}}
			on:create={(e) => to(`/${$locale}/realm/_`)}
			on:goto={(e) => to(`/${$locale}/realm/${e.detail.path}`)}
		/>
		<div class="divider my-0" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</svelte:fragment>
</Dialog>
