<script lang="ts">
  import type { __EnumValue } from "@packages/graphql/types";
  import type { Error } from "@packages/common/types";
  import { Select, CheckboxGroup } from "@packages/components/input";
  export let name: string;
  export let value: any;
  export let __enumValues: __EnumValue[];
  export let className: string = "";
  export let error: Error = null;
</script>

<Select {name} {className} bind:value {error}>
  {#each __enumValues as enumValue}
    <option value={enumValue.name}>{enumValue.name}</option>
  {/each}
</Select>
