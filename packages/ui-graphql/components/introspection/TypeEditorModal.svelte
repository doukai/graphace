<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { querySubType, mutationSubType } from '@graphace/graphql/request/Type';
  import { TypeManager } from '@graphace/graphql/types/TypeManager';
  import { type __Type, type __Field, __TypeKind } from '@graphace/graphql/types';
  import type { Error } from '@graphace/commons/types';
  import { Modal, ModalContent, ModalActions } from '@graphace/ui/components/modal';
  import { ObjectEditButton } from '.';
  import { typeTableModals } from './table/TypeTableModals.svelte';
  import FieldInput from './FieldInput.svelte';
  import { notifications } from '@graphace/ui/components/Notifications.svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { DocumentAdd, DocumentSearch } from '@steeze-ui/heroicons';
  import { validate } from '@graphace/graphql/schema/JsonSchema';
  import LL from '../../i18n/i18n-svelte';
  import { locale } from '../../i18n/i18n-svelte';
  export let __parentType: __Type;
  export let __type: __Type;
  export let id: string;
  export let __field: __Field;
  export let value: object;
  export let isModalOpen = false;

  const dispatch = createEventDispatcher<{
    search: {};
    change: {
      id: string;
      __field: __Field;
      value: object;
    };
    cancel: {};
  }>();

  const manager: TypeManager = new TypeManager();
  const idFieldName: string = manager.getIdFieldName(__type);

  let queryPromise: Promise<{ data: object }> = querySubType({
    __parentType,
    __type,
    id,
    __field
  });
  let errors: Record<string, Error> = {};

  queryPromise.then((response) => {
    value[__field.name] = response.data[__field.name];
  });

  const create = (): void => {
    value[__field.name] = manager.createTypeObject(__type);
  };

  const save = (): void => {
    validate(__parentType.name, value, $locale)
      .then((data) => {
        errors = {};
        mutationSubType(__parentType, __field, value)
          .then((response) => {
            dispatch('change', { id, __field, value: response.data });
            notifications.success($LL.message.saveSuccess());
          })
          .catch((error) => {
            notifications.error($LL.message.saveFailed());
          });
      })
      .catch((validErrors) => {
        if (validErrors[__field.name]) {
          errors = validErrors[__field.name].iterms;
        }
      });
  };

  const remove = (): void => {
    value[__field.name] = null;
    mutationSubType(__parentType, __field, value)
      .then((response) => {
        dispatch('change', { id, __field, value: response.data });
        notifications.success($LL.message.saveSuccess());
      })
      .catch((error) => {
        notifications.error($LL.message.saveFailed());
      });
  };

  const search = () => {
    const modalId = typeTableModals.create({
      __type,
      multiple: false,
      select: (event) => {
        if (!value) {
          value[__field.name] = manager.createTypeObject(__type);
        }
        value[__field.name] = event.detail.selectedDataList[0];
        typeTableModals.remove(modalId);
      },
      cancel: () => {
        typeTableModals.remove(modalId);
      }
    });
  };
</script>

<Modal isModalOpen="{isModalOpen}" title="{__field.name}">
  <ModalContent>
    <div class="py-4 px-0 sm:px-6 lg:px-8 space-y-4">
      {#await queryPromise}
        {#each { length: 6 } as _}
          <div class="animate-pulse bg-base-200 px-12 py-12 sm:mt-px sm:pt-2 rounded"></div>
          <div class="divider"></div>
        {/each}
      {:then response}
        {#if value[__field.name]}
          <form>
            <div class="space-y-6 sm:space-y-5">
              {#each manager.getFiledList(__type) as __subField}
                <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      for="{__subField.name}"
                      class="block text-sm font-medium sm:mt-px sm:pt-2"
                    >
                      {__subField.name}
                    </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                      {#if manager.getFieldTypeKind(__subField.type) === __TypeKind.OBJECT}
                        <ObjectEditButton
                          __parentType="{__type}"
                          __field="{__subField}"
                          id="{value[__field.name][idFieldName]}"
                          bind:value="{value[__field.name]}"
                          className="btn-outline"
                          disabled="{!value[__field.name][idFieldName]}"
                        />
                      {:else}
                        <FieldInput
                          className="w-full max-w-xs"
                          __field="{__subField}"
                          bind:value="{value[__field.name][__subField.name]}"
                          error="{errors[__subField.name]}"
                        />
                      {/if}
                    </div>
                  </div>
                </div>
                <div class="divider"></div>
              {/each}
            </div>
          </form>
        {:else}
          <button
            type="button"
            class="relative block w-full border-2 bg-base-100 border-dashed rounded-lg p-6 text-center hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-base-300"
            on:click="{(e) => {
              create();
            }}"
          >
            <Icon src="{DocumentAdd}" class="mx-auto h-12 w-12" />
            <span class="mt-2 block text-sm font-medium">
              {$LL.components.graphql.editor.createType({ name: __type.name })}
            </span>
          </button>
        {/if}
        <button
          type="button"
          class="relative block w-full border-2 bg-base-100 border-dashed rounded-lg p-6 text-center hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-base-300"
          on:click="{(e) => {
            search();
          }}"
        >
          <Icon src="{DocumentSearch}" class="mx-auto h-12 w-12" />
          <span class="mt-2 block text-sm font-medium">
            {$LL.components.graphql.editor.bindType({ name: __type.name })}
          </span>
        </button>
      {:catch error}
        {notifications.error($LL.message.requestFailed())}
      {/await}
    </div>
  </ModalContent>
  <ModalActions>
    <button
      class="btn"
      on:click="{(e) => {
        e.preventDefault();
        dispatch('cancel');
      }}"
    >
      {$LL.components.graphql.editor.backBtn()}
    </button>
    <button
      class="btn btn-primary"
      on:click="{(e) => {
        e.preventDefault();
        save();
      }}"
    >
      {$LL.components.graphql.editor.saveBtn()}
    </button>
    {#if value[__field.name]}
      <button
        class="btn btn-outline btn-error"
        on:click="{(e) => {
          e.preventDefault();
          remove();
        }}"
      >
        {$LL.components.graphql.editor.removeBtn()}
      </button>
    {/if}
  </ModalActions>
</Modal>
