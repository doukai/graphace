export class Directive {
    name: string;
    arguments?: Record<string, unknown> | undefined;
    constructor(params: { name: string, arguments?: Record<string, unknown> | undefined }) {
        this.name = params.name;
        this.arguments = params.arguments;
    }
    public toString = (): string => {
        return `@${this.name}${this.arguments ? `(${Object.entries(this.arguments).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')})` : ''}`;
    }
}