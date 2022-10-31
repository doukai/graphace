<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tippy } from "@packages/graphql/tippy";
  import { TypeManager } from "@packages/graphql/TypeManager";
  import { getType } from "@packages/graphql/request/Introspection";
  import {
    Input,
    NumberInput,
    InputList,
    NumberInputList,
    Toggle,
    Select,
    CheckboxGroup,
  } from "@packages/components/input";
  import {
    type __Field,
    type __FieldFilter,
    type __Type,
    Operator,
  } from "@packages/graphql/types";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Check, X, Filter } from "@steeze-ui/heroicons";
  import LL from "../../i18n/i18n-svelte";
  export let __field: __Field;
  export let value: __FieldFilter;
  let content: HTMLElement;
  const dispatch = createEventDispatcher<{
    filter: {};
  }>();

  const manager = new TypeManager();
  let __type: __Type;
  let fieldTypeName = manager.getFieldTypeName(__field.type);
  let queryType = getType(fieldTypeName);

  queryType.then((response) => {
    __type = response.__type;
    if (!value.val) {
      value.val = {};
    }
    manager
      .getScalarFiledList(__type)
      .filter((__field) => !value.val[__field.name])
      .forEach(
        (__field) => (value.val[__field.name] = { opr: Operator.EQ, val: null })
      );
  });

  const filter = (): void => {
    dispatch("filter");
  };

  const clear = (): void => {
    manager
      .getScalarFiledList(__type)
      .forEach(
        (__field) => (value.val[__field.name] = { opr: Operator.EQ, val: null })
      );
    dispatch("filter");
  };

  const oprChange = (__field: __Field, opr: Operator): void => {
    if (opr === "IN" || opr === "NIN" || opr === "BT" || opr === "NBT") {
      value.val[__field.name].val = [];
    } else {
      value.val[__field.name].val = null;
    }
  };
</script>

<div class="flex items-start space-x-1" bind:this={content}>
  <div class="grid grid-cols-3 gap-x-1 gap-y-3">
    {#await queryType then response}
      {#each manager.getScalarFiledList(__type) as __field}
        <label
          for={__field.name}
          class="block text-sm font-medium mt-2 pt-2 text-center"
        >
          {__field.name}
        </label>
        {#if manager.getFieldTypeName(__field.type) === "Boolean"}
          <Toggle
            name={value.__field.name}
            bind:value={value.val[__field.name].val}
          />
          <div />
        {:else}
          <select
            class="select select-bordered"
            bind:value={value.val[__field.name].opr}
            on:change={() => oprChange(__field, value.val[__field.name].opr)}
          >
            <option value="EQ" selected
              >{$LL.components.graphql.table.th.eq()}</option
            >
            <option value="NEQ">{$LL.components.graphql.table.th.neq()}</option>
            <option value="LK">{$LL.components.graphql.table.th.lk()}</option>
            <option value="NLK">{$LL.components.graphql.table.th.nlk()}</option>
            <option value="GT">{$LL.components.graphql.table.th.gt()}</option>
            <option value="GTE">{$LL.components.graphql.table.th.gte()}</option>
            <option value="LT">{$LL.components.graphql.table.th.lt()}</option>
            <option value="LTE">{$LL.components.graphql.table.th.lte()}</option>
            <option value="NIL">{$LL.components.graphql.table.th.nil()}</option>
            <option value="NNIL"
              >{$LL.components.graphql.table.th.nnil()}</option
            >
            <option value="IN">{$LL.components.graphql.table.th.in()}</option>
            <option value="NIN">{$LL.components.graphql.table.th.nin()}</option>
            <option value="BT">{$LL.components.graphql.table.th.bt()}</option>
            <option value="NBT">{$LL.components.graphql.table.th.nbt()}</option>
          </select>
          {#if manager.getFieldTypeName(__field.type) === "Int" || manager.getFieldTypeName(__field.type) === "Float"}
            {#if value.val[__field.name].opr === "IN" || value.val[__field.name].opr === "NIN" || value.val[__field.name].opr === "BT" || value.val[__field.name].opr === "NBT"}
              <NumberInputList
                placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
                name={__field.name}
                bind:value={value.val[__field.name].val}
              />
            {:else}
              <NumberInput
                placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
                name={__field.name}
                bind:value={value.val[__field.name].val}
              />
            {/if}
          {:else if manager.getFieldTypeName(__field.type) === "ID" || manager.getFieldTypeName(__field.type) === "String"}
            {#if value.val[__field.name].opr === "IN" || value.val[__field.name].opr === "NIN" || value.val[__field.name].opr === "BT" || value.val[__field.name].opr === "NBT"}
              <InputList
                placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
                name={__field.name}
                bind:value={value.val[__field.name].val}
              />
            {:else}
              <Input
                placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
                name={__field.name}
                bind:value={value.val[__field.name].val}
              />
            {/if}
          {:else if manager.fieldIsEnum(__field.type)}
            {#if value.val[__field.name].opr === "IN" || value.val[__field.name].opr === "NIN" || value.val[__field.name].opr === "BT" || value.val[__field.name].opr === "NBT"}
              <CheckboxGroup
                bind:value={value.val[__field.name].val}
                checkboxs={manager
                  .getFieldTypeEnumValues(__field.type)
                  .map((enumValue) => {
                    return { name: enumValue.name, value: enumValue.name };
                  })}
              />
            {:else}
              <Select
                name={__field.name}
                bind:value={value.val[__field.name].val}
              >
                {#each manager.getFieldTypeEnumValues(__field.type) as enumValue}
                  <option value={enumValue.name}>{enumValue.name}</option>
                {/each}
              </Select>
            {/if}
          {/if}
        {/if}
      {/each}
    {/await}
  </div>
  <div class="tooltip" data-tip={$LL.components.graphql.table.th.filter()}>
    <button class="btn btn-square btn-primary" on:click={() => filter()}>
      <Icon src={Check} solid class="h-5 w-5" />
    </button>
  </div>
  <div class="tooltip" data-tip={$LL.components.graphql.table.th.cancel()}>
    <button
      class="btn btn-square btn-outline btn-error"
      on:click={() => clear()}
    >
      <Icon src={X} solid class="h-5 w-5" />
    </button>
  </div>
</div>

<th>
  <a
    class="link group inline-flex"
    href={null}
    on:click={(e) => {
      e.preventDefault();
    }}
    use:tippy={{
      content,
      placement: "bottom",
      interactive: true,
      arrow: true,
      trigger: "click",
      interactiveBorder: 30,
      theme: "daisy",
      maxWidth: "none",
      appendTo: () => document.body,
    }}
  >
    {value.__field.name}
    {#if value.val && Object.values(value.val).filter((val) => val.val).length > 0}
      <span class="ml-1 flex-none">
        <Icon src={Filter} solid class="h-5 w-5" />
      </span>
    {/if}
  </a>
</th>
