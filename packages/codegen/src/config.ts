import type { RawTypesConfig } from '@graphql-codegen/visitor-plugin-common';
import type { BuilderConfig } from "graphace-codegen-commons/types/types";
import type { Template } from 'graphace-codegen-commons';

export interface GraphacePluginConfig extends RawTypesConfig {
  template: Template;

  graphqlPath?: string;

  componentsPath?: string;

  dataPath?: string;

  routesPath?: string;

  schemaTypesPath?: string;

  i18nPath?: string;

  i18nDefault?: string;

  name?: string;

  objectFieldName?: string;

  builder?: BuilderConfig;
}
