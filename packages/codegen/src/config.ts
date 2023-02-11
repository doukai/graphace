import type { RawTypesConfig } from '@graphql-codegen/visitor-plugin-common';
import type { Template } from '.';

export interface GraphacePluginConfig extends RawTypesConfig {
  template: Template;

  graphqlPath?: string;

  componentsPath?: string;

  routesPath?: string;

  name?: string;

  objectFieldName?: string;
}
