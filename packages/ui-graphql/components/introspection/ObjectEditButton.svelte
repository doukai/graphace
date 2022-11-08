<script lang="ts">
  import { typeEditorModals, listTypeEditorModals } from '.';
  import { TypeManager } from '@graphace/graphql/types/TypeManager';
  import { getType } from '@graphace/graphql/request/Introspection';
  import type { __Type, __Field } from '@graphace/graphql/types';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Link } from '@steeze-ui/heroicons';
  import LL from '../../i18n/i18n-svelte';
  export let __parentType: __Type;
  export let __field: __Field;
  export let id: string;
  export let value: object;
  export let disabled: boolean = false;
  export let className: string = '';
  const manager: TypeManager = new TypeManager();
</script>

<div class="tooltip" data-tip="{$LL.components.graphql.table.editBtn()}">
  <button
    class="btn btn-square {className}"
    disabled="{disabled}"
    on:click="{(e) => {
      e.preventDefault();
      getType(manager.getFieldTypeName(__field.type)).then((response) => {
        if (manager.fieldIsList(__field.type)) {
          const modalId = listTypeEditorModals.create({
            __parentType,
            __type: response.__type,
            id,
            __field,
            value,
            change: (event) => {
              value = event.detail.value;
              listTypeEditorModals.remove(modalId);
            },
            cancel: () => {
              listTypeEditorModals.remove(modalId);
            }
          });
        } else {
          const modalId = typeEditorModals.create({
            __parentType,
            __type: response.__type,
            id,
            __field,
            value,
            change: (event) => {
              value = event.detail.value;
              typeEditorModals.remove(modalId);
            },
            cancel: () => {
              typeEditorModals.remove(modalId);
            }
          });
        }
      });
    }}"
  >
    <Icon src="{Link}" solid class="h-5 w-5" />
  </button>
</div>
