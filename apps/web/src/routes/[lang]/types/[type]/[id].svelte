<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { TypeManager } from '@graphace/graphql/types/TypeManager';
  const manager: TypeManager = new TypeManager();
  export const load: Load = async ({ params }) => {
    const { type, id } = params;
    return {
      props: {
        typeName: manager.urlToTypeName(type),
        id
      }
    };
  };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { getType } from '@graphace/graphql/request/Introspection';
  import type { __Type } from '@graphace/graphql/types';
  import Section from '@graphace/ui/components/section/Section.svelte';
  import TypeEditor from '@graphace/ui-graphql/components/introspection/TypeEditor.svelte';
  import FormLoading from '@graphace/ui/components/form/FormLoading.svelte';
  import { TypeTableModals } from '@graphace/ui-graphql/components/introspection/table';
  import {
    TypeEditorModals,
    ListTypeEditorModals
  } from '@graphace/ui-graphql/components/introspection';
  import { notifications } from '@graphace/ui/components/Notifications.svelte';
  import LL from '../../../../i18n/i18n-svelte';
  export let typeName: string;
  export let id: string;

  let typePromise = getType(typeName);
</script>

<Section>
  {#await typePromise}
    <FormLoading />
  {:then response}
    <TypeEditor
      __type="{response.__type}"
      id="{id}"
      on:back="{() => {
        goto(`../${manager.typeNameToUrl(response.__type.name)}`);
      }}"
    />
  {:catch error}
    {notifications.error($LL.message.requestFailed())}
  {/await}
</Section>

<TypeEditorModals />
<ListTypeEditorModals />
<TypeTableModals />
