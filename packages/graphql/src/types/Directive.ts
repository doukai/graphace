export type Directive = {
    name: string;
    arguments?: unknown | undefined;
}

export const directiveToString = (directive: Directive): string => {
    if (directive.arguments) {
        return `@${directive.name}(${Object.entries(directive.arguments).map(argument => JSON.stringify(argument)).join(', ')})`;
    } else {
        return `@${directive.name}`;
    }
}