<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore } from '@graphace/commons';
	import type {
		GraphQLError,
		GlobalGraphQLErrorMessageFunction,
		GraphQLErrorsFunction
	} from '@graphace/graphql';
	import {
		Label,
		Card,
		CardBody,
		Form,
		Buttons,
		messageBoxs,
		notifications,
		Input,
		FormControl,
		InputList,
		Toggle
	} from '@graphace/ui';
	import { StringFormControl, BooleanFormControl, ObjectFormControl } from '@graphace/ui-graphql';
	// import GroupSelectItem from '~/lib/components/objects/group/GroupSelectItem.svelte';
	// import RoleSelectItem from '~/lib/components/objects/role/RoleSelectItem.svelte';
	import { buildGraphQLErrors, buildGlobalGraphQLErrorMessage } from '~/utils';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';
	export let node: UserInput | null | undefined = undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

	const dispatch = createEventDispatcher<{
		mutation: {
			args: UserInput;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: UserInput | null;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			let args = { ...node };
			dispatch('mutation', {
				args: args,
				then: (data) => {
					node = data;
					notifications.success($LL.graphence.message.saveSuccess());
					dispatch('back', {});
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
								dispatch('back', {});
								return true;
							}
						});
					}
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { where: { id: { val: node.id } }, isDeprecated: true },
				then: (data) => {
					notifications.success($LL.graphence.message.removeSuccess());
					dispatch('back', {});
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
								dispatch('back', {});
								return true;
							}
						});
					}
				}
			});
		}
	};

	const unbind = (): void => {
		if (node) {
			dispatch('parentMutation', {
				args: null,
				then: (data) => {
					notifications.success($LL.graphence.message.unbindSuccess());
					dispatch('back', {});
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
								dispatch('back', {});
								return true;
							}
						});
					}
				}
			});
		}
	};
</script>

<Card class="bg-base-100">
	<CardBody>
		<div class="flex justify-end md:justify-between">
			<span class="max-sm:hidden text-xl font-semibold self-center"
				>{$LL.graphql.objects.User.name()}</span
			>
			<Buttons
				showRemoveButton={permissions.auth('User::*::WRITE') && showRemoveButton}
				showUnbindButton={permissions.auth('User::*::WRITE') && showUnbindButton}
				showSelectButton={permissions.auth('User::*::WRITE') && showSelectButton}
				{showBackButton}
			/>
		</div>
		<div class="divider" />
		<Form
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
			on:save={(e) => save()}
			on:remove={(e) =>
				messageBoxs.open({
					title: $LL.graphence.components.table.removeModalTitle(),
					buttonName: $LL.graphence.components.table.removeBtn(),
					buttonType: 'error',
					confirm: () => {
						remove();
						return true;
					}
				})}
			on:unbind={(e) =>
				messageBoxs.open({
					title: $LL.graphence.components.table.unbindModalTitle(),
					buttonName: $LL.graphence.components.table.unbindBtn(),
					buttonType: 'error',
					confirm: () => {
						unbind();
						return true;
					},
					button1: {
						name: $LL.graphence.components.table.removeBtn(),
						className: 'btn-error',
						onClick: () => {
							remove();
							return true;
						}
					}
				})}
			on:gotoSelect
			on:back
		>
			{#if isFetching}
				TODO
			{:else if node}
				{#if permissions.auth('User::name::*')}
					<FormControl let:id errors={errors.name}>
						<Label {id} text={$LL.graphql.objects.User.fields.name.name()} />
						<Input
							{id}
							name="name"
							bind:value={node.name}
							readonly={!permissions.auth('User::name::WRITE')}
							errors={errors.name}
						/>
					</FormControl>
				{/if}
				{#if permissions.auth('User::description::*')}
					<FormControl let:id errors={errors.description}>
						<Label {id} text={$LL.graphql.objects.User.fields.description.name()} />
						<Input
							{id}
							name="description"
							bind:value={node.description}
							readonly={!permissions.auth('User::description::WRITE')}
							errors={errors.description}
						/>
					</FormControl>
				{/if}
				{#if permissions.auth('User::lastName::*')}
					<FormControl let:id errors={errors.lastName}>
						<Label {id} text={$LL.graphql.objects.User.fields.lastName.name()} />
						<Input
							{id}
							name="lastName"
							bind:value={node.lastName}
							readonly={!permissions.auth('User::lastName::WRITE')}
							errors={errors.lastName}
						/>
					</FormControl>
				{/if}
				{#if permissions.auth('User::login::*')}
					<FormControl let:id errors={errors.login}>
						<Label {id} text={$LL.graphql.objects.User.fields.login.name()} />
						<Input
							{id}
							name="login"
							bind:value={node.login}
							readonly={!permissions.auth('User::login::WRITE')}
							errors={errors.login}
						/>
					</FormControl>
				{/if}
				{#if permissions.auth('User::email::*')}
					<FormControl let:id errors={errors.email}>
						<Label {id} text={$LL.graphql.objects.User.fields.email.name()} />
						<Input
							{id}
							name="email"
							bind:value={node.email}
							readonly={!permissions.auth('User::email::WRITE')}
							errors={errors.email}
						/>
					</FormControl>
				{/if}
				{#if permissions.auth('User::phones::*')}
					<FormControl let:id errors={errors.phones}>
						<Label {id} text={$LL.graphql.objects.User.fields.phones.name()} />
						<InputList
							{id}
							name="phones"
							bind:value={node.phones}
							readonly={!permissions.auth('User::phones::WRITE')}
							errors={errors.phones}
						/>
					</FormControl>
				{/if}
				{#if permissions.auth('User::disable::*')}
					<FormControl let:id errors={errors.disable}>
						<Label {id} text={$LL.graphql.objects.User.fields.disable.name()} />
						<Toggle
							{id}
							name="disable"
							bind:value={node.disable}
							readonly={!permissions.auth('User::disable::WRITE')}
							errors={errors.disable}
						/>
					</FormControl>
				{/if}
				<!-- {#if permissions.auth('User::groups::*')}
					<GroupSelectItem
						name="groups"
						label={$LL.graphql.objects.User.fields.groups.name()}
						errors={errors.groups}
						bind:value={node.groups}
						readonly={!permissions.auth('User::groups::WRITE')}
						list
					/>
				{/if}
				{#if permissions.auth('User::roles::*')}
					<RoleSelectItem
						name="roles"
						label={$LL.graphql.objects.User.fields.roles.name()}
						errors={errors.roles}
						bind:value={node.roles}
						readonly={!permissions.auth('User::roles::WRITE')}
						list
					/>
				{/if} -->
				{#if permissions.auth('User::realm::*')}
					<ObjectFormControl
						name="realm"
						namedStruct={node.realm}
						path={`${node.id}/realm`}
						label={$LL.graphql.objects.User.fields.realm.name()}
						errors={errors.realm}
						on:gotoField
					/>
				{/if}
			{/if}
		</Form>
	</CardBody>
</Card>
