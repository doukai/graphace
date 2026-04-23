import { Directive } from "~/types";
import { buildArgs } from "./index.js";

export const buildDirectives = (directives?: Directive[] | undefined): string => directives?.map(buildDirective).join(' ') ?? '';

export const buildDirective = (directive: Directive): string => `@${directive.name}${buildArgs(directive.args)}`;