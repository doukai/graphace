<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql';
	import LL from '$i18n/i18n-svelte';
	import type { RealmInput } from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let node: RealmInput = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: RealmInput;
			then: (data: RealmInput | null | undefined) => void;
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
				args: {},
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
</script>

<Form
	title={$LL.graphql.objects.Realm.name()}
	showRemoveButton={permissions.auth('Realm::*::WRITE') && showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
	showGotoSelectButton={permissions.auth('Realm::*::WRITE') && showGotoSelectButton}
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
	{#if permissions.auth('Realm::name::*')}
	<StringItem label={$LL.graphql.objects.Realm.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
	{/if}
	{#if permissions.auth('Realm::description::*')}
	<StringItem label={$LL.graphql.objects.Realm.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
	{/if}
</Form>