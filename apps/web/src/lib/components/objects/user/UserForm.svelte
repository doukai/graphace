<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, BooleanItem, ObjectItem } from '@graphace/ui-graphql';
	import GroupSelectItem from '~/lib/components/objects/group/GroupSelectItem.svelte';
	import RoleSelectItem from '~/lib/components/objects/role/RoleSelectItem.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { UserInput } from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let node: UserInput | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

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
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back', {});
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { where: { id: { val: node.id } }, isDeprecated: true },
				then: (data) => {
					notifications.success($LL.web.message.removeSuccess());
					dispatch('back', {});
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.removeFailed());
				}
			});
		}
	};

	const unbind = (): void => {
		if (node) {
			dispatch('parentMutation', {
				args: null,
				then: (data) => {
					notifications.success($LL.web.message.unbindSuccess());
					dispatch('back', {});
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.unbindFailed());
				}
			});
		}
	};
</script>

<Form
	title={$LL.graphql.objects.User.name()}
	showRemoveButton={permissions.auth('User::*::WRITE') && showRemoveButton}
	showUnbindButton={permissions.auth('User::*::WRITE') && showUnbindButton}
	showGotoSelectButton={permissions.auth('User::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:save={(e) => save()}
	on:remove={(e) =>
		messageBoxs.open({
			title: $LL.web.components.table.removeModalTitle(),
			buttonName: $LL.web.components.table.removeBtn(),
			buttonType: 'error',
			confirm: () => {
				remove();
				return true;
			}
		})}
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.web.components.table.unbindModalTitle(),
			buttonName: $LL.web.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbind();
				return true;
			},
			button1: {
				name: $LL.web.components.table.removeBtn(),
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
		<FormLoading rows={10} />
	{:else}
		{#if node}
			{#if permissions.auth('User::name::*')}
			<StringItem label={$LL.graphql.objects.User.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
			{/if}
			{#if permissions.auth('User::description::*')}
			<StringItem label={$LL.graphql.objects.User.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
			{/if}
			{#if permissions.auth('User::lastName::*')}
			<StringItem label={$LL.graphql.objects.User.fields.lastName.name()} name="lastName" bind:value={node.lastName} errors={errors.lastName} />
			{/if}
			{#if permissions.auth('User::login::*')}
			<StringItem label={$LL.graphql.objects.User.fields.login.name()} name="login" bind:value={node.login} errors={errors.login} />
			{/if}
			{#if permissions.auth('User::email::*')}
			<StringItem label={$LL.graphql.objects.User.fields.email.name()} name="email" bind:value={node.email} errors={errors.email} />
			{/if}
			{#if permissions.auth('User::phones::*')}
			<StringItem label={$LL.graphql.objects.User.fields.phones.name()} name="phones" bind:value={node.phones} list errors={errors.phones} />
			{/if}
			{#if permissions.auth('User::disable::*')}
			<BooleanItem label={$LL.graphql.objects.User.fields.disable.name()} name="disable" bind:value={node.disable} errors={errors.disable} />
			{/if}
			{#if permissions.auth('User::groups::*')}
			<GroupSelectItem
				name="groups"
				label={$LL.graphql.objects.User.fields.groups.name()}
				errors={errors.groups}
				bind:value={node.groups}
				list
			/>
			{/if}
			{#if permissions.auth('User::roles::*')}
			<RoleSelectItem
				name="roles"
				label={$LL.graphql.objects.User.fields.roles.name()}
				errors={errors.roles}
				bind:value={node.roles}
				list
			/>
			{/if}
			{#if permissions.auth('User::realm::*')}
			<ObjectItem name="realm" namedStruct={node.realm} path={`${node.id}/realm`} label={$LL.graphql.objects.User.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	{/if}
</Form>
