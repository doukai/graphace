import { Field } from "~/types";
import { buildArgs, buildDirectives } from "./index.js";

export const buildFields = (fields?: Field[] | undefined): string => fields?.map(buildField).join(' ') ?? '';

export const buildField = (field: Field): string => `${field.alias ? `${field.alias}: ` : ''}${field.name}${buildArgs(field.args)}${field.fields?.length ? ` { ${buildFields(field.fields)} }` : ''}${field.directives?.length ? ` ${buildDirectives(field.directives)}` : ''}`;