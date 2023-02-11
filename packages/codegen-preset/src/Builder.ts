import { Template } from 'graphace-codegen-commons/types'
import { buildEngine } from 'graphace-codegen-commons'

const engine = buildEngine();

export const buildPath = (template: Template, scope?: object): string => {
    return engine.renderSync(engine.parse(template), scope);
}