import type { RawTypesConfig } from '@graphql-codegen/visitor-plugin-common';
import type { Template } from 'graphace-codegen-commons';

export interface GraphacePluginConfig extends RawTypesConfig {
  template: Template;

  graphqlPath?: string;

  componentsPath?: string;

  dataPath?: string;

  routesPath?: string;

  schemaTypesPath?: string;

  name?: string;

  objectFieldName?: string;
}
