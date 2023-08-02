import type { BuilderConfig } from "graphace-codegen-commons/types/types";
export interface GraphacePresetConfig {

  graphqlPath?: string;

  componentsPath?: string;

  dataPath?: string;

  routesPath?: string;

  i18nPath?: string;

  i18nDefault?: string;

  builder?: BuilderConfig;
}