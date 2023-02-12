import type { Template } from 'graphace-codegen-commons/types'
import { buildEngine } from 'graphace-codegen-commons'

const engine = buildEngine();

export const buildFileContent = (template: Template, scope?: object): string => {
    return engine.renderFileSync(template, scope);
}