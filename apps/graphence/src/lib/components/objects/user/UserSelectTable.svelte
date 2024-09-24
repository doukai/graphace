<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, messageBoxs, notifications } from '@graphace/ui';
	import { StringTh, StringTd, BooleanTh, BooleanTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		UserOrderBy,
		QueryUserListArgs,
		UserInput
	} from '~/lib/types/schema';

	export let nodes: (UserInput | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	const buildGraphQLErrors = getContext('buildGraphQLErrors') as GraphQLErrorsFunction;
	const buildGlobalGraphQLErrorMessage = getContext('buildGlobalGraphQLErrorMessage') as GlobalGraphQLErrorMessageFunction;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryUserListArgs;
			then: (data: (UserInput| null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: UserInput;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		select: {
			selected: UserInput | null | undefined | (UserInput | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	export let showSelectButton = false;
	export let args: QueryUserListArgs = {};
	export let orderBy: UserOrderBy = {};

	let selectAll: boolean;
	export let selectedIdList: string | null | undefined | (string | null | undefined)[] = multipleSelect
		? []
		: undefined;

	$: if (selectedIdList && !Array.isArray(selectedIdList) || Array.isArray(selectedIdList) && selectedIdList.length > 0) {
		showSelectButton = true;
	} else {
		showSelectButton = false;
	}

	export const query = () => {
		if (Object.keys(orderBy).length > 0) {
			args.orderBy = orderBy;
		} else {
			args.orderBy = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	export const search = (searchValue: string | undefined) => {
		let args: QueryUserListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
			args.description = { opr: 'LK', val: `%${searchValue}%` };
			args.lastName = { opr: 'LK', val: `%${searchValue}%` };
			args.login = { opr: 'LK', val: `%${searchValue}%` };
			args.email = { opr: 'LK', val: `%${searchValue}%` };
			args.phones = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
			args.description = undefined;
			args.lastName = undefined;
			args.login = undefined;
			args.email = undefined;
			args.phones = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const updateField = (args: UserInput | null | undefined, row?: number) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					if (nodes && row) {
						nodes[row] = data;
					}
					notifications.success($LL.graphence.message.saveSuccess());
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					errors = buildGraphQLErrors(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.saveFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								query();
								return true;
							}
						});
					}
				}
			});
		}
	}
</script>

<TableHead
	title={$LL.graphql.objects.User.name()}
	showCreateButton={false}
	showSaveButton={false}
	showRemoveButton={false}
	{showSelectButton}
	{showBackButton}
	on:search={(e) => search(e.detail.value)}
	on:select={(e) =>
		dispatch('select', {
			selected: Array.isArray(selectedIdList)
				? selectedIdList.flatMap((id) => nodes?.find((node) => node?.id === id)).map((node) => ({ name: node?.name, description: node?.description, lastName: node?.lastName, login: node?.login, email: node?.email, phones: node?.phones, disable: node?.disable, where: { id: { val: node?.id } } }))
				: nodes?.filter((node) => node?.id === selectedIdList)?.map((node) => ({ name: node?.name, description: node?.description, lastName: node?.lastName, login: node?.login, email: node?.email, phones: node?.phones, disable: node?.disable, where: { id: { val: node?.id } } }))[0],
			then: () => {
				notifications.success($LL.graphence.message.saveSuccess());
				dispatch('back', {});
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.saveFailed());
			}
		})}
	on:back
/>
<div class="divider" />
<Table className="table-zebra table-pin-rows table-pin-cols md:table-sm">
	<thead>
		<tr class="z-20">
			<th class="w-12">
				{#if multipleSelect}
					<label>
						<input
							type="checkbox"
							class="checkbox md:checkbox-sm"
							bind:checked={selectAll}
							on:change={(e) => {
								if (nodes && nodes.length > 0) {
									selectedIdList = selectAll ? nodes.map((node) => node?.id) : [];
								}
							}}
						/>
					</label>
				{/if}
			</th>
			{#if permissions.auth('User::name::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('User::description::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.description.name()}
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('User::lastName::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.lastName.name()}
				bind:expression={args.lastName}
				bind:sort={orderBy.lastName}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('User::login::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.login.name()}
				bind:expression={args.login}
				bind:sort={orderBy.login}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('User::email::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.email.name()}
				bind:expression={args.email}
				bind:sort={orderBy.email}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('User::phones::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.phones.name()}
				bind:expression={args.phones}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('User::disable::*')}
			<BooleanTh
				name={$LL.graphql.objects.User.fields.disable.name()}
				bind:expression={args.disable}
				bind:sort={orderBy.disable}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={11 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									{#if multipleSelect}
										<input type="checkbox" class="checkbox md:checkbox-sm" bind:group={selectedIdList} value={node.id} />
									{:else}
										<input type="radio" class="radio md:radio-sm" bind:group={selectedIdList} value={node.id} />
									{/if}
								</label>
							</th>
							{#if permissions.auth('User::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('User::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('User::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('User::description::WRITE')}
								errors={errors[row]?.iterms?.description}
							/>
							{/if}
							{#if permissions.auth('User::lastName::*')}
							<StringTd
								name="lastName"
								bind:value={node.lastName}
								on:save={(e) => updateField({ lastName: node?.lastName, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('User::lastName::WRITE')}
								errors={errors[row]?.iterms?.lastName}
							/>
							{/if}
							{#if permissions.auth('User::login::*')}
							<StringTd
								name="login"
								bind:value={node.login}
								on:save={(e) => updateField({ login: node?.login, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('User::login::WRITE')}
								errors={errors[row]?.iterms?.login}
							/>
							{/if}
							{#if permissions.auth('User::email::*')}
							<StringTd
								name="email"
								bind:value={node.email}
								on:save={(e) => updateField({ email: node?.email, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('User::email::WRITE')}
								errors={errors[row]?.iterms?.email}
							/>
							{/if}
							{#if permissions.auth('User::phones::*')}
							<StringTd
								name="phones"
								bind:value={node.phones}
								list
								on:save={(e) => updateField({ phones: node?.phones, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('User::phones::WRITE')}
								errors={errors[row]?.iterms?.phones}
							/>
							{/if}
							{#if permissions.auth('User::disable::*')}
							<BooleanTd
								name="disable"
								bind:value={node.disable}
								on:save={(e) => updateField({ disable: node?.disable, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('User::disable::WRITE')}
								errors={errors[row]?.iterms?.disable}
							/>
							{/if}
							<th class="z-10 hover:z-30 w-12">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.graphence.components.table.selectBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('select', {
														selected: multipleSelect 
																	? [{ name: node?.name, description: node?.description, lastName: node?.lastName, login: node?.login, email: node?.email, phones: node?.phones, disable: node?.disable, where: { id: { val: node.id } } }] 
																	: { name: node?.name, description: node?.description, lastName: node?.lastName, login: node?.login, email: node?.email, phones: node?.phones, disable: node?.disable, where: { id: { val: node.id } } },
														then: () => {
															notifications.success($LL.graphence.message.saveSuccess());
															dispatch('back', {});
														},
														catch: (errors) => {
															console.error(errors);
															notifications.error($LL.graphence.message.saveFailed());
														}
													});
												}
											}}
										>
											<Icon src={ArchiveBoxArrowDown} solid />
										</button>
									</div>
								</div>
							</th>
						</tr>
					{/if}
				{/each}
			{:else}
				<TableEmpty cols={11 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
