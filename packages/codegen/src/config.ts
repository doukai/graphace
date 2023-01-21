import type { RawTypesConfig } from '@graphql-codegen/visitor-plugin-common';
import type { Template } from '.';

export interface GraphacePluginConfig extends RawTypesConfig {
  template: Template;
  query?: { fieldName: string }
  mutation?: { fieldName: string, update?: boolean }
  typeTable?: { name: string }
}
