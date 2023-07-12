import { Liquid, type LiquidOptions } from 'liquidjs';
import * as changeCase from "change-case";

export const buildEngine = (opts?: LiquidOptions): Liquid => {
    const engine = new Liquid(opts);
    engine.registerFilter('camelCase', (v: string) => changeCase.camelCase(v));
    engine.registerFilter('capitalCase', (v: string) => changeCase.capitalCase(v));
    engine.registerFilter('constantCase', (v: string) => changeCase.constantCase(v));
    engine.registerFilter('dotCase', (v: string) => changeCase.dotCase(v));
    engine.registerFilter('headerCase', (v: string) => changeCase.headerCase(v));
    engine.registerFilter('noCase', (v: string) => changeCase.noCase(v));
    engine.registerFilter('paramCase', (v: string) => changeCase.paramCase(v));
    engine.registerFilter('pascalCase', (v: string) => changeCase.pascalCase(v));
    engine.registerFilter('pathCase', (v: string) => changeCase.pathCase(v));
    engine.registerFilter('sentenceCase', (v: string) => changeCase.sentenceCase(v));
    engine.registerFilter('snakeCase', (v: string) => changeCase.snakeCase(v));
    return engine;
}