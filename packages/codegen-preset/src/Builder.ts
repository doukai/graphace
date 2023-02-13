import { type Template, buildEngine } from 'graphace-codegen-commons'

const engine = buildEngine();

export const buildPath = (template: Template, scope?: object): string => {
    return engine.renderSync(engine.parse(template), scope);
}