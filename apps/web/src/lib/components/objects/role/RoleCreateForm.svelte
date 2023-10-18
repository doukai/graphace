<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Form } from '@graphace/ui/components/form';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Role, RoleInput } from '~/lib/types/schema';
	import { auth } from '@graphace/commons/stores/useAuth';

	export let node: RoleInput = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: RoleInput;
			then: (data: Role | null | undefined) => void;
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
				args: {},
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
</script>

<Form
	title={$LL.graphql.objects.Role.name()}
	showRemoveButton={auth('Role::*::WRITE') && showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
	showGotoSelectButton={auth('Role::*::WRITE') && showGotoSelectButton}
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
	on:gotoSelect
	on:back
>
	{#if auth('Role::name::*')}
	<StringItem label={$LL.graphql.objects.Role.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
	{/if}
	{#if auth('Role::description::*')}
	<StringItem label={$LL.graphql.objects.Role.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
	{/if}
	{#if auth('Role::users::*')}
	<ObjectItem name="users" path="_/users" label={$LL.graphql.objects.Role.fields.users.name()} errors={errors.users} on:gotoField />
	{/if}
	{#if auth('Role::groups::*')}
	<ObjectItem name="groups" path="_/groups" label={$LL.graphql.objects.Role.fields.groups.name()} errors={errors.groups} on:gotoField />
	{/if}
	{#if auth('Role::composites::*')}
	<ObjectItem name="composites" path="_/composites" label={$LL.graphql.objects.Role.fields.composites.name()} errors={errors.composites} on:gotoField />
	{/if}
	{#if auth('Role::permissions::*')}
	<ObjectItem name="permissions" path="_/permissions" label={$LL.graphql.objects.Role.fields.permissions.name()} errors={errors.permissions} on:gotoField />
	{/if}
	{#if auth('Role::realm::*')}
	<ObjectItem name="realm" path="_/realm" label={$LL.graphql.objects.Role.fields.realm.name()} errors={errors.realm} on:gotoField />
	{/if}
</Form>