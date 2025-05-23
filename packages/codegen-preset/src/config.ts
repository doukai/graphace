import type { BuilderConfig } from "graphace-codegen-commons";
export interface GraphacePresetConfig {
  appName?: string;

  graphqlPath?: string;

  componentsPath?: string;

  dataPath?: string;

  routesPath?: string;

  chartRoutesPath?: string;

  gridRoutesPath?: string;

  storesPath?: string;

  i18nPath?: string;

  i18nDefault?: string;

  i18nDescription?: string;

  builder?: BuilderConfig;

  useAuth?: boolean;
}