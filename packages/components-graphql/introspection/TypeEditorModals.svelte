<script lang="ts" context="module">
  import { nanoid } from "nanoid";
  import { writable } from "svelte/store";
  import type { __Type, __Field } from "@packages/graphql/types";
  type TypeEditorModalComponent = {
    id: string;
    props: TypeEditorModalProp;
  };

  export type TypeEditorModalProp = {
    __parentType: __Type;
    __type: __Type;
    id: string;
    __field: __Field;
    value: object;
    isModalOpen?: boolean;
    change: (
      event: CustomEvent<{
        id: string;
        __field: __Field;
        value: object;
      }>
    ) => void;
    cancel: () => void;
  };

  const typeEditorModalStore = writable<TypeEditorModalComponent[]>([]);

  function create(props: TypeEditorModalProp, open = true): string {
    const id = nanoid();
    props.isModalOpen = open;
    typeEditorModalStore.update((components) => {
      return [...components, { id, props }];
    });
    return id;
  }

  function open(id: string) {
    typeEditorModalStore.update((components) => {
      components.find((component) => component.id !== id).props.isModalOpen =
        true;
      return components;
    });
  }

  function close(id: string) {
    typeEditorModalStore.update((components) => {
      components.find((component) => component.id !== id).props.isModalOpen =
        false;
      return components;
    });
  }

  function remove(id: string) {
    typeEditorModalStore.update((components) => {
      return components.filter((component) => component.id !== id);
    });
  }

  function createTypeEditorModalStore() {
    const { subscribe } = typeEditorModalStore;

    return {
      subscribe,
      create,
      open,
      close,
      remove,
    };
  }
  export const typeEditorModals = createTypeEditorModalStore();
</script>

<script lang="ts">
  import TypeEditorModal from "./TypeEditorModal.svelte";
</script>

{#each $typeEditorModalStore as typeEditorModal}
  <svelte:component
    this={TypeEditorModal}
    __parentType={typeEditorModal.props.__parentType}
    __type={typeEditorModal.props.__type}
    id={typeEditorModal.props.id}
    __field={typeEditorModal.props.__field}
    value={typeEditorModal.props.value}
    isModalOpen={typeEditorModal.props.isModalOpen}
    on:change={typeEditorModal.props.change}
    on:cancel={typeEditorModal.props.cancel}
  />
{/each}
