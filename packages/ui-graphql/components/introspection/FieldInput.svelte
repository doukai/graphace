<script lang="ts">
  import { TypeManager } from '@graphace/graphql/types/TypeManager';
  import {
    Input,
    NumberInput,
    InputList,
    NumberInputList,
    Toggle,
    ToggleList
  } from '@graphace/ui/components/input';
  import { EnumSelect, EnumCheckboxGroup } from '.';
  import type { __Field } from '@graphace/graphql/types';
  import type { Error } from '@graphace/commons/types';
  export let __field: __Field;
  export let value: any;
  export let error: Error = null;
  export let className: string = '';
  export let placeholder: string = '';
  const manager: TypeManager = new TypeManager();
  const fieldTypeName: string = manager.getFieldTypeName(__field.type);
</script>

{#if manager.fieldIsList(__field.type)}
  {#if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
    <NumberInputList
      placeholder="{placeholder}"
      className="{className}"
      name="{__field.name}"
      bind:value
      error="{error}"
    />
  {:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
    <InputList
      placeholder="{placeholder}"
      className="{className}"
      name="{__field.name}"
      bind:value
      error="{error}"
    />
  {:else if fieldTypeName === 'Boolean'}
    <ToggleList name="{__field.name}" bind:value error="{error}" />
  {:else if manager.fieldIsEnum(__field.type)}
    <EnumCheckboxGroup
      __enumValues="{manager.getFieldTypeEnumValues(__field.type)}"
      bind:value
      error="{error}"
    />
  {/if}
{:else if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
  <NumberInput
    placeholder="{placeholder}"
    className="{className}"
    name="{__field.name}"
    bind:value
    error="{error}"
  />
{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
  <Input
    placeholder="{placeholder}"
    className="{className}"
    name="{__field.name}"
    bind:value
    error="{error}"
  />
{:else if fieldTypeName === 'Boolean'}
  <Toggle name="{__field.name}" bind:value error="{error}" />
{:else if manager.fieldIsEnum(__field.type)}
  <EnumSelect
    name="{__field.name}"
    className="{className}"
    __enumValues="{manager.getFieldTypeEnumValues(__field.type)}"
    bind:value
    error="{error}"
  />
{/if}
