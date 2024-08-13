import type { RawTypesConfig } from '@graphql-codegen/visitor-plugin-common';
import type { BuilderConfig, Template } from "graphace-codegen-commons";

export interface GraphacePluginConfig extends RawTypesConfig {
  template: Template;

  appName?: string;

  graphqlPath?: string;

  componentsPath?: string;

  dataPath?: string;

  routesPath?: string;

  schemaTypesPath?: string;

  i18nPath?: string;

  i18nDefault?: string;

  i18nDescription?: string;

  name?: string;

  objectFieldName?: string;

  builder?: BuilderConfig;

  useAuth?: boolean;
}
