<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mutationType } from '@graphace/graphql/request/Type';
  import { TypeManager } from '@graphace/graphql/types/TypeManager';
  import type { __Type } from '@graphace/graphql/types';
  import type { Error } from '@graphace/commons/types';
  import { Form, FormItems, FormItem, FormButtons } from '@graphace/ui/components/form';
  import FieldInput from './FieldInput.svelte';
  import { notifications } from '@graphace/ui/components/Notifications.svelte';
  import { validate } from '@graphace/graphql/schema/JsonSchema';
  import LL from '../../i18n/i18n-svelte';
  import { locale } from '../../i18n/i18n-svelte';
  export let __type: __Type;

  const dispatch = createEventDispatcher<{
    back: {};
  }>();

  const manager: TypeManager = new TypeManager();
  const idFieldName: string = manager.getIdFieldName(__type);
  let errors: Record<string, Error> = {};

  let data: object = manager.createTypeObject(__type);

  const save = (): void => {
    validate(__type.name, data, $locale)
      .then((data) => {
        errors = {};
        mutationType(__type, data)
          .then((response) => {
            notifications.success($LL.message.saveSuccess());
            dispatch('back');
          })
          .catch((error) => {
            notifications.error($LL.message.saveFailed());
          });
      })
      .catch((validErrors) => {
        errors = validErrors;
      });
  };
</script>

<Form>
  <FormItems title="{__type.name}">
    {#each manager.getScalarFiledList(__type) as __field}
      <FormItem label="{__field.name}" forName="{__field.name}">
        <FieldInput
          className="w-full max-w-xs"
          __field="{__field}"
          bind:value="{data[__field.name]}"
          error="{errors[__field.name]}"
        />
      </FormItem>
    {/each}
  </FormItems>
  <FormButtons>
    <button
      class="btn"
      on:click="{(e) => {
        e.preventDefault();
        dispatch('back');
      }}"
    >
      {$LL.components.graphql.editor.backBtn()}
    </button>
    <button
      class="btn"
      on:click="{(e) => {
        e.preventDefault();
        save();
      }}"
    >
      {$LL.components.graphql.editor.saveBtn()}
    </button>
  </FormButtons>
</Form>
