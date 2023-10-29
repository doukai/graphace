<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, BooleanItem, ObjectItem } from '@graphace/ui-graphql';
	import LL from '$i18n/i18n-svelte';
	import type { User, UserInput } from '~/lib/types/schema';
	import { auth } from '@graphace/common';

	export let node: User | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: UserInput;
			then: (data: User | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: UserInput | null;
			then: (data: User | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				then: (data) => {
					node = data;
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back');
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
					dispatch('back');
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
					dispatch('back');
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
	showRemoveButton={auth('User::*::WRITE') && showRemoveButton}
	showUnbindButton={auth('User::*::WRITE') && showUnbindButton}
	showGotoSelectButton={auth('User::*::WRITE') && showGotoSelectButton}
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
		<FormLoading rows={9} />
	{:else}
		{#if node}
			{#if auth('User::name::*')}
			<StringItem label={$LL.graphql.objects.User.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
			{/if}
			{#if auth('User::lastName::*')}
			<StringItem label={$LL.graphql.objects.User.fields.lastName.name()} name="lastName" bind:value={node.lastName} errors={errors.lastName} />
			{/if}
			{#if auth('User::login::*')}
			<StringItem label={$LL.graphql.objects.User.fields.login.name()} name="login" bind:value={node.login} errors={errors.login} />
			{/if}
			{#if auth('User::email::*')}
			<StringItem label={$LL.graphql.objects.User.fields.email.name()} name="email" bind:value={node.email} errors={errors.email} />
			{/if}
			{#if auth('User::phones::*')}
			<StringItem label={$LL.graphql.objects.User.fields.phones.name()} name="phones" bind:value={node.phones} list errors={errors.phones} />
			{/if}
			{#if auth('User::disable::*')}
			<BooleanItem label={$LL.graphql.objects.User.fields.disable.name()} name="disable" bind:value={node.disable} errors={errors.disable} />
			{/if}
			{#if auth('User::groups::*')}
			<ObjectItem name="groups" path={`${node.id}/groups`} label={$LL.graphql.objects.User.fields.groups.name()} errors={errors.groups} on:gotoField />
			{/if}
			{#if auth('User::roles::*')}
			<ObjectItem name="roles" path={`${node.id}/roles`} label={$LL.graphql.objects.User.fields.roles.name()} errors={errors.roles} on:gotoField />
			{/if}
			{#if auth('User::realm::*')}
			<ObjectItem name="realm" path={`${node.id}/realm`} label={$LL.graphql.objects.User.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	{/if}
</Form>
