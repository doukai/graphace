<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, messageBoxs, notifications } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd, BooleanTh, BooleanTd } from '@graphace/ui-graphql';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		User,
		UserOrderBy,
		QueryUserListArgs,
		UserInput
	} from '~/lib/types/schema';
	import { auth } from '@graphace/commons';

	export let nodes: (User | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryUserListArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: UserInput;
			then: (data: User | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: UserInput[];
			then: (data: User[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (User | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	export let args: QueryUserListArgs = {};
	export let orderBy: UserOrderBy = {};

	let selectAll: boolean;
	export let selectedIdList: (string | null)[] = [];

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
				notifications.error($LL.web.message.requestFailed());
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
				notifications.error($LL.web.message.requestFailed());
			}
		});
	};

	const updateField = (args: UserInput | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					notifications.success($LL.web.message.saveSuccess());
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			});
		}
	}

	const removeRow = (id: string) => {
		dispatch('mutation', {
			args: { where: { id: { val: id } }, isDeprecated: true },
			then: (data) => {
				notifications.success($LL.web.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.removeFailed());
			}
		});
	}

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: 'IN', in: selectedIdList } },
				isDeprecated: true
			},
			then: (data) => {
				notifications.success($LL.web.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.removeFailed());
			}
		});
	};

	const unbindRows = (selectedIdList: (string | null)[]) => {
		dispatch('parentMutation', {
			args: selectedIdList
				.map((id) => {
					return { where: { id: { val: id } }, isDeprecated: true };
				}),
			then: (data) => {
				notifications.success($LL.web.message.unbindSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.unbindFailed());
			}
		});
	};
</script>

<TableHead
	title={$LL.graphql.objects.User.name()}
	showRemoveButton={auth('User::*::WRITE') && showRemoveButton && selectedIdList.length > 0}
	showUnbindButton={auth('User::*::WRITE') && showUnbindButton && selectedIdList.length > 0}
	showSaveButton={auth('User::*::WRITE') && showSaveButton}
	showGotoSelectButton={auth('User::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:create
	on:search={(e) => search(e.detail.value)}
	on:save={(e) => dispatch('save', { nodes })}
	on:remove={(e) => {
		messageBoxs.open({
			title: $LL.web.components.table.removeModalTitle(),
			buttonName: $LL.web.components.table.removeBtn(),
			buttonType: 'error',
			confirm: () => {
				removeRows();
				return true;
			}
		});
	}}
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.web.components.table.unbindModalTitle(),
			buttonName: $LL.web.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbindRows(selectedIdList);
				return true;
			},
			button1: {
				name: $LL.web.components.table.removeBtn(),
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
								selectedIdList = selectAll ? nodes.map((node) => node?.id || null) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if auth('User::name::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::description::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.description.name()}
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::lastName::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.lastName.name()}
				bind:expression={args.lastName}
				bind:sort={orderBy.lastName}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::login::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.login.name()}
				bind:expression={args.login}
				bind:sort={orderBy.login}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::email::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.email.name()}
				bind:expression={args.email}
				bind:sort={orderBy.email}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::phones::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.phones.name()}
				bind:expression={args.phones}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::disable::*')}
			<BooleanTh
				name={$LL.graphql.objects.User.fields.disable.name()}
				bind:expression={args.disable}
				bind:sort={orderBy.disable}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::groups::*')}
			<GroupTh
				name={$LL.graphql.objects.User.fields.groups.name()}
				bind:expression={args.groups}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::roles::*')}
			<RoleTh
				name={$LL.graphql.objects.User.fields.roles.name()}
				bind:expression={args.roles}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('User::realm::*')}
			<RealmTh
				name={$LL.graphql.objects.User.fields.realm.name()}
				bind:expression={args.realm}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={10 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.id} />
								</label>
							</th>
							{#if auth('User::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } })}
								readonly={!auth('User::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if auth('User::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { id: { val: node?.id } } })}
								readonly={!auth('User::description::WRITE')}
								errors={errors[row]?.iterms?.description}
							/>
							{/if}
							{#if auth('User::lastName::*')}
							<StringTd
								name="lastName"
								bind:value={node.lastName}
								on:save={(e) => updateField({ lastName: node?.lastName, where: { id: { val: node?.id } } })}
								readonly={!auth('User::lastName::WRITE')}
								errors={errors[row]?.iterms?.lastName}
							/>
							{/if}
							{#if auth('User::login::*')}
							<StringTd
								name="login"
								bind:value={node.login}
								on:save={(e) => updateField({ login: node?.login, where: { id: { val: node?.id } } })}
								readonly={!auth('User::login::WRITE')}
								errors={errors[row]?.iterms?.login}
							/>
							{/if}
							{#if auth('User::email::*')}
							<StringTd
								name="email"
								bind:value={node.email}
								on:save={(e) => updateField({ email: node?.email, where: { id: { val: node?.id } } })}
								readonly={!auth('User::email::WRITE')}
								errors={errors[row]?.iterms?.email}
							/>
							{/if}
							{#if auth('User::phones::*')}
							<StringTd
								name="phones"
								bind:value={node.phones}
								list
								on:save={(e) => updateField({ phones: node?.phones, where: { id: { val: node?.id } } })}
								readonly={!auth('User::phones::WRITE')}
								errors={errors[row]?.iterms?.phones}
							/>
							{/if}
							{#if auth('User::disable::*')}
							<BooleanTd
								name="disable"
								bind:value={node.disable}
								on:save={(e) => updateField({ disable: node?.disable, where: { id: { val: node?.id } } })}
								readonly={!auth('User::disable::WRITE')}
								errors={errors[row]?.iterms?.disable}
							/>
							{/if}
							{#if auth('User::groups::*')}
							<ObjectTd name="groups" namedStruct={ node.groups } errors={errors[row]?.iterms?.groups} path={`${node.id}/groups`} on:gotoField />
							{/if}
							{#if auth('User::roles::*')}
							<ObjectTd name="roles" namedStruct={ node.roles } errors={errors[row]?.iterms?.roles} path={`${node.id}/roles`} on:gotoField />
							{/if}
							{#if auth('User::realm::*')}
							<ObjectTd name="realm" namedStruct={ node.realm } errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
							{/if}
							{#if auth('User::*::WRITE')}
							<th class="z-10 hover:z-30 w-24">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
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
										<div class="tooltip" data-tip={$LL.web.components.table.unbindBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.web.components.table.unbindModalTitle(),
														buttonName: $LL.web.components.table.unbindBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																unbindRows([node.id]);
															}
															return true;
														},
														button1: {
															name: $LL.web.components.table.removeBtn(),
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
										<div class="tooltip" data-tip={$LL.web.components.table.removeBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.web.components.table.removeModalTitle(),
														buttonName: $LL.web.components.table.removeBtn(),
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
