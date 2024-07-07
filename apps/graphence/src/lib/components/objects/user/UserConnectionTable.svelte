<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, Pagination, messageBoxs, notifications } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd, BooleanTh, BooleanTd } from '@graphace/ui-graphql';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelectTd from '~/lib/components/objects/group/GroupSelectTd.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		UserOrderBy,
		QueryUserConnectionArgs,
		UserInput
	} from '~/lib/types/schema';

	export let nodes: (UserInput | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	const buildGraphQLErrors = getContext('buildGraphQLErrors') as GraphQLErrorsFunction;
	const buildGlobalGraphQLErrorMessage = getContext('buildGlobalGraphQLErrorMessage') as GlobalGraphQLErrorMessageFunction;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryUserConnectionArgs;
			then: (data: (UserInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: UserInput;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: UserInput[];
			then: (data: UserInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (UserInput | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	export let args: QueryUserConnectionArgs = {};
	export let orderBy: UserOrderBy = {};
	export let after: string | undefined = undefined;
	export let before: string | undefined = undefined;
	export let pageNumber: number = 1;
	export let pageSize: number = 10;

	let selectAll: boolean;
	export let selectedIdList: (string | null | undefined)[] = [];

	export const queryPage = (toPageNumber?: number | undefined) => {
		if (Object.keys(orderBy).length > 0) {
			args.orderBy = orderBy;
		} else {
			args.orderBy = undefined;
		}

		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else {
			args.offset = ((toPageNumber || pageNumber) - 1) * pageSize;
			args.first = pageSize;
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
		let args: QueryUserConnectionArgs = {};
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
		
		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else {
			args.offset = (pageNumber - 1) * pageSize;
			args.first = pageSize;
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
								queryPage(1);
								return true;
							}
						});
					}
				}
			});
		}
	};

	const removeRow = (id: string) => {
		dispatch('mutation', {
			args: { where: { id: { val: id } }, isDeprecated: true },
			then: (data) => {
				notifications.success($LL.graphence.message.removeSuccess());
				queryPage(1);
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.removeFailed(),
						content: globalError,
						buttonName: $LL.ui.button.back(),
						buttonType: 'neutral',
						confirm: () => {
							queryPage(1);
							return true;
						}
					});
				}
			}
		});
	};

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: 'IN', arr: selectedIdList } },
				isDeprecated: true
			},
			then: (data) => {
				notifications.success($LL.graphence.message.removeSuccess());
				queryPage(1);
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.removeFailed(),
						content: globalError,
						buttonName: $LL.ui.button.back(),
						buttonType: 'neutral',
						confirm: () => {
							queryPage(1);
							return true;
						}
					});
				}
			}
		});
	};

	const unbindRows = (selectedIdList: (string | null | undefined)[]) => {
		dispatch('parentMutation', {
			args: selectedIdList
				.map((id) => {
					return { where: { id: { val: id } }, isDeprecated: true };
				}),
			then: (data) => {
				notifications.success($LL.graphence.message.unbindSuccess());
				queryPage(1);
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.unbindFailed(),
						content: globalError,
						buttonName: $LL.ui.button.back(),
						buttonType: 'neutral',
						confirm: () => {
							queryPage(1);
							return true;
						}
					});
				}
			}
		});
	};
</script>

<TableHead
	title={$LL.graphql.objects.User.name()}
	showRemoveButton={permissions.auth('User::*::WRITE') && showRemoveButton && selectedIdList.length > 0}
	showUnbindButton={permissions.auth('User::*::WRITE') && showUnbindButton && selectedIdList.length > 0}
	showSaveButton={permissions.auth('User::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('User::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:create
	on:search={(e) => search(e.detail.value)}
	on:save={(e) => dispatch('save', { nodes })}
	on:remove={(e) => {
		messageBoxs.open({
			title: $LL.graphence.components.table.removeModalTitle(),
			buttonName: $LL.graphence.components.table.removeBtn(),
			buttonType: 'error',
			confirm: () => {
				removeRows();
				return true;
			}
		});
	}}
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.graphence.components.table.unbindModalTitle(),
			buttonName: $LL.graphence.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbindRows(selectedIdList);
				return true;
			},
			button1: {
				name: $LL.graphence.components.table.removeBtn(),
				className: 'btn-error',
				onClick: () => {
					removeRows();
					return true;
				}
			}
		})}
	on:gotoSelect
	on:back
/>
<div class="divider" />
<Table>
	<thead>
		<tr class="z-20">
			<th class="w-12">
				<label>
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={selectAll}
						on:change={(e) => {
							if (nodes && nodes.length > 0) {
								selectedIdList = selectAll ? nodes.map((node) => node?.id) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if permissions.auth('User::name::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::description::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.description.name()}
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::lastName::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.lastName.name()}
				bind:expression={args.lastName}
				bind:sort={orderBy.lastName}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::login::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.login.name()}
				bind:expression={args.login}
				bind:sort={orderBy.login}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::email::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.email.name()}
				bind:expression={args.email}
				bind:sort={orderBy.email}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::phones::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.phones.name()}
				bind:expression={args.phones}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::disable::*')}
			<BooleanTh
				name={$LL.graphql.objects.User.fields.disable.name()}
				bind:expression={args.disable}
				bind:sort={orderBy.disable}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::groups::*')}
			<GroupTh
				name={$LL.graphql.objects.User.fields.groups.name()}
				bind:expression={args.groups}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::roles::*')}
			<RoleTh
				name={$LL.graphql.objects.User.fields.roles.name()}
				bind:expression={args.roles}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::realm::*')}
			<RealmTh
				name={$LL.graphql.objects.User.fields.realm.name()}
				bind:expression={args.realm}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('User::*::WRITE')}
			<th />
			{/if}
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={pageSize} cols={10 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={ node.id } />
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
							{#if permissions.auth('User::groups::*')}
							<GroupSelectTd
								name="groups"
								bind:value={node.groups}
								list
								errors={errors[row]?.iterms?.groups}
								readonly={!permissions.auth('User::groups::WRITE')}
								on:save={(e) =>
									updateField({ groups: node?.groups, where: { id: { val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('User::roles::*')}
							<RoleSelectTd
								name="roles"
								bind:value={node.roles}
								list
								errors={errors[row]?.iterms?.roles}
								readonly={!permissions.auth('User::roles::WRITE')}
								on:save={(e) =>
									updateField({ roles: node?.roles, where: { id: { val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('User::realm::*')}
							<ObjectTd name="realm" namedStruct={node.realm} errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
							{/if}
							{#if permissions.auth('User::*::WRITE')}
							<th class="z-10 hover:z-30 w-24">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.graphence.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('edit', { id: node.id });
												}
											}}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
									{#if showUnbindButton}
										<div class="tooltip" data-tip={$LL.graphence.components.table.unbindBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.graphence.components.table.unbindModalTitle(),
														buttonName: $LL.graphence.components.table.unbindBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																unbindRows([node.id]);
															}
															return true;
														},
														button1: {
															name: $LL.graphence.components.table.removeBtn(),
															className: 'btn-error',
															onClick: () => {
																if (node?.id) {
																	removeRow(node.id);
																}
																return true;
															}
														}
													});
												}}
											>
												<Icon src={ArchiveBoxXMark} solid />
											</button>
										</div>
									{:else}
										<div class="tooltip" data-tip={$LL.graphence.components.table.removeBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.graphence.components.table.removeModalTitle(),
														buttonName: $LL.graphence.components.table.removeBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																removeRow(node.id);
															}
															return true;
														}
													});
												}}
											>
												<Icon src={Trash} solid />
											</button>
										</div>
									{/if}
								</div>
							</th>
							{/if}
						</tr>
					{/if}
				{/each}
			{:else}
				<TableEmpty cols={10 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
<div class="divider" />
<Pagination
	bind:pageNumber
	bind:pageSize
	{totalCount}
	on:pageChange={(e) => queryPage()}
	on:sizeChange={(e) => queryPage()}
/>