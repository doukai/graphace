<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { TypeManager } from '@graphace/graphql/types/TypeManager';
  const manager: TypeManager = new TypeManager();
  export const load: Load = async ({ params }) => {
    const { type } = params;
    return {
      props: { typeName: manager.urlToTypeName(type) }
    };
  };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import type { __Type } from '@graphace/graphql/types';
  import { getType } from '@graphace/graphql/request/Introspection';
  import { type QueryParams, removeTypes } from '@graphace/graphql/request/Type';
  import { TypeTable, TypeTableModals } from '@graphace/ui-graphql/components/introspection/table';
  import {
    TypeEditorModals,
    ListTypeEditorModals
  } from '@graphace/ui-graphql/components/introspection';
  import { SectionHead, SectionLoading } from '@graphace/ui/components/section';
  import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
  import { notifications } from '@graphace/ui/components/Notifications.svelte';
  import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Plus, PencilAlt, Trash } from '@steeze-ui/heroicons';
  import LL from '../../../i18n/i18n-svelte';
  import { Pagination } from '@graphace/ui/components/connection';
  export let typeName: string;

  $: typePromise = getType(typeName);
  let refresh: (params?: QueryParams) => void;

  let queryValue: string = null;
  let search = (event: CustomEvent<{ value: string }>) => {
    queryValue = event.detail.value;
    refresh({ queryValue });
  };

  let showDeleteButton = false;
  let idList: string[] = [];

  const selectChange = (event: CustomEvent<{ selectedIdList: string[] }>) => {
    idList = event.detail.selectedIdList;
    if (event.detail.selectedIdList.length > 0) {
      showDeleteButton = true;
    } else {
      showDeleteButton = false;
    }
  };

  const removeRows = (__type: __Type) => {
    removeTypes(__type, idList)
      .then((response) => {
        notifications.success($LL.message.removeSuccess());
        refresh();
      })
      .catch((error) => {
        notifications.error($LL.message.removeFailed());
      });
  };
</script>

{#await typePromise}
  <SectionLoading />
{:then response}
  <SectionHead title="{response.__type.name}">
    <SearchInput on:search="{search}" />
    {#if showDeleteButton}
      <div class="tooltip tooltip-bottom" data-tip="{$LL.routers.type.remove()}">
        <button
          class="btn btn-error btn-outline btn-square"
          on:click="{(e) => {
            e.preventDefault();
            messageBoxs.open({
              title: $LL.components.graphql.table.removeModalTitle(),
              buttonName: $LL.components.graphql.table.removeBtn(),
              buttonType: 'error',
              confirm: () => {
                removeRows(response.__type);
                return true;
              }
            });
          }}"
        >
          <Icon src="{Trash}" class="h-6 w-6" solid />
        </button>
      </div>
    {/if}
    <div class="tooltip tooltip-bottom" data-tip="{$LL.routers.type.remove()}">
      <button
        class="btn btn-square md:hidden"
        on:click="{(e) => {
          e.preventDefault();
          goto(`./${response.__type.name}/create`);
        }}"
      >
        <Icon src="{Plus}" class="h-6 w-6" solid />
      </button>
    </div>
    <button
      class="hidden md:btn"
      on:click="{(e) => {
        e.preventDefault();
        goto(`./${response.__type.name}/create`);
      }}"
    >
      {$LL.routers.type.create()}
    </button>
  </SectionHead>
  <div class="divider"></div>
  <TypeTable __type="{response.__type}" on:selectChange="{selectChange}" bind:refresh>
    <div slot="row" let:id let:removeRow>
      <div class="tooltip" data-tip="{$LL.components.graphql.table.editBtn()}">
        <button
          class="btn btn-square btn-ghost btn-xs"
          on:click="{(e) => {
            e.preventDefault();
            goto(`./${manager.typeNameToUrl(typeName)}/${id}`);
          }}"
        >
          <Icon src="{PencilAlt}" solid />
        </button>
      </div>
      <div class="tooltip" data-tip="{$LL.components.graphql.table.removeBtn()}">
        <button
          class="btn btn-square btn-ghost btn-xs"
          on:click="{(e) => {
            e.preventDefault();
            messageBoxs.open({
              title: $LL.components.graphql.table.removeModalTitle(),
              buttonName: $LL.components.graphql.table.removeBtn(),
              buttonType: 'error',
              confirm: () => {
                removeRow(id);
                return true;
              }
            });
          }}"
        >
          <Icon src="{Trash}" solid />
        </button>
      </div>
    </div>
    <div slot="page" let:pageNumber let:pageSize let:totalCount let:onPageChange let:onSizeChange>
      <Pagination
        pageNumber="{pageNumber}"
        pageSize="{pageSize}"
        totalCount="{totalCount}"
        on:pageChange="{onPageChange}"
        on:sizeChange="{onSizeChange}"
      />
    </div>
  </TypeTable>
{/await}

<TypeEditorModals />
<ListTypeEditorModals />
<TypeTableModals />
