<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Form, FormLoading, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { IntItem, StringItem, TimestampItem, BooleanItem, IDItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import SexItem from '~/lib/components/enums/sex/SexItem.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { User, MutationTypeUserArgs } from '~/lib/types/schema';

	export let node: User | null | undefined;
	export let isFetching: boolean = false;
	export let errors: Record<string, Errors> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				update: true,
				then: (data) => {
					node = data;
					notifications.success($LL.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.saveFailed());
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node.id, isDeprecated: true },
				update: true,
				then: (data) => {
					notifications.success($LL.message.removeSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.removeFailed());
				}
			});
		}
	};
</script>

<Form>
	<FormItems title="User">
		{#if isFetching}
			<FormLoading rows={20} />
		{:else}
			{#if node}
				<IntItem label="age" name="age" bind:value={node.age} errors={errors.age} />
				<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
				<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
				<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
				<BooleanItem label="disable" name="disable" bind:value={node.disable} errors={errors.disable} />
				<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
				<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
				<StringItem label="login" name="login" bind:value={node.login} errors={errors.login} />
				<StringItem label="name" name="name" bind:value={node.name} errors={errors.name} />
				<ObjectItem name="organization" path={`${node.id}/organization`} label="organization" errors={errors.organization} on:gotoField />
				<IntItem label="organizationId" name="organizationId" bind:value={node.organizationId} errors={errors.organizationId} />
				<StringItem label="password" name="password" bind:value={node.password} errors={errors.password} />
				<StringItem label="phones" name="phones" bind:value={node.phones} list errors={errors.phones} />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
				<ObjectItem name="roles" path={`${node.id}/roles`} label="roles" errors={errors.roles} on:gotoField />
				<ObjectItem name="rolesConnection" path={`${node.id}/roles-connection`} label="rolesConnection" errors={errors.rolesConnection} on:gotoField />
				<SexItem label="sex" name="sex" bind:value={node.sex} errors={errors.sex} />
				<IntItem label="test1" name="test1" bind:value={node.test1} list errors={errors.test1} />
				<BooleanItem label="test2" name="test2" bind:value={node.test2} list errors={errors.test2} />
				<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
				<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
				<StringItem label="userDetail2" name="userDetail2" bind:value={node.userDetail2} readonly errors={errors.userDetail2} />
				<ObjectItem name="userProfile" path={`${node.id}/user-profile`} label="userProfile" errors={errors.userProfile} on:gotoField />
				<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
			{/if}
		{/if}
	</FormItems>
	<FormButtons>
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				dispatch('back');
			}}
		>
			{$LL.components.graphql.editor.backBtn()}
		</button>
		<button
			class="btn"
			disabled={isFetching}
			on:click={(e) => {
				e.preventDefault();
				save();
			}}
		>
			{$LL.components.graphql.editor.saveBtn()}
		</button>
		<button
			class="btn btn-outline btn-error"
			disabled={isFetching}
			on:click={(e) => {
				e.preventDefault();
				messageBoxs.open({
					title: $LL.components.graphql.table.removeModalTitle(),
					buttonName: $LL.components.graphql.table.removeBtn(),
					buttonType: 'error',
					confirm: () => {
						remove();
						return true;
					}
				});
			}}
		>
			{$LL.components.graphql.editor.removeBtn()}
		</button>
	</FormButtons>
</Form>
