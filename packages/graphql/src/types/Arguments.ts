export const valueToString = (value: unknown): string => {
    if (Array.isArray(value)) {
        return `[${value.filter((item) => item !== undefined).map((item) => valueToString(item)).join(', ')}]`;
    } else if (value !== null && typeof value === 'object') {
        return `{${Object.entries(value).filter(([k, v]) => v !== undefined).map(([k, v]) => `${k}: ${valueToString(v)}`).join(', ')}}`;
    } else {
        return JSON.stringify(value);
    }
}