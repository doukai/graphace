import type { RawTypesConfig } from '@graphql-codegen/visitor-plugin-common';
import type { Template } from '.';

export interface GraphacePluginConfig extends RawTypesConfig {
  template: Template;
  query?: { fieldName: string };
  schemaTypesPath?: string;
  mutation?: { fieldName: string, update?: boolean };
  typeTable?: { name: string, componentsPath?: string };
  typeForm?: { name: string, componentsPath?: string };
  typeCreateForm?: { name: string, componentsPath?: string };
  pageSvelte?: { name: string, componentsPath?: string };
  pageTs?: { name: string };
  pageEditSvelte?: { name: string, componentsPath?: string };
  pageEditTs?: { name: string };
  pageCreateSvelte?: { name: string, componentsPath?: string };
  pageCreateTs?: { name: string };
  enumTh?: { name: string };
  enumTd?: { name: string };
  enumItem?: { name: string };
}