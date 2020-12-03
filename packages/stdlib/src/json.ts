export function tryParseJSON<T = any>(value: any): T {
    if (typeof value !== "string") {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
}