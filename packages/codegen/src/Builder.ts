import { type Template, buildEngine } from 'graphace-codegen-commons'

const engine = buildEngine({
    root: `${__dirname}/../templates`
});

export const buildFileContent = (template: Template, scope?: object): string => {
    return engine.renderFileSync(`${template}.liquid`, scope);
}