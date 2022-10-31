<script lang="ts">
  import { goto } from "$app/navigation";
  import { mutationType } from "@packages/graphql/request/Type";
  import { TypeManager } from "@packages/graphql/TypeManager";
  import type { __Type } from "@packages/graphql/types";
  import type { Error } from "@packages/common/types";
  import {
    Form,
    FormItems,
    FormItem,
    FormButtons,
  } from "@packages/components/form";
  import FieldInput from "./FieldInput.svelte";
  import { notifications } from "@packages/components/Notifications.svelte";
  import { validate } from "@packages/graphql/schema/JsonSchema";
  import LL from "../i18n/i18n-svelte";
  import { locale } from "../i18n/i18n-svelte";
  export let __type: __Type;

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
            goto(
              `../${manager.typeNameToUrl(__type.name)}/${
                response.data[idFieldName]
              }`
            );
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
  <FormItems title={__type.name}>
    {#each manager.getScalarFiledList(__type) as __field}
      <FormItem label={__field.name} forName={__field.name}>
        <FieldInput
          className="w-full max-w-xs"
          {__field}
          bind:value={data[__field.name]}
          error={errors[__field.name]}
        />
      </FormItem>
    {/each}
  </FormItems>
  <FormButtons>
    <button
      class="btn"
      on:click={(e) => {
        e.preventDefault();
        goto(`../${manager.typeNameToUrl(__type.name)}`);
      }}
    >
      {$LL.components.graphql.editor.backBtn()}
    </button>
    <button
      class="btn"
      on:click={(e) => {
        e.preventDefault();
        save();
      }}
    >
      {$LL.components.graphql.editor.saveBtn()}
    </button>
  </FormButtons>
</Form>
