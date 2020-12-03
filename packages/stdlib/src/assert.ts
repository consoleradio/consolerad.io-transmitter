export function isDefined(predicate: any): boolean {
    return typeof predicate !== "undefined";
}

export function isDomain(predicate: string): boolean {
    return /(?=^.{1,254}$)(^(?:(?!\d+\.)[a-zA-Z0-9_\-]{1,63}\.?)+(?:[a-zA-Z]{2,})$)/.test(predicate);
}

export function isString(predicate: any): boolean {
    return typeof predicate === "string";
}

export function isNumber(predicate: any): boolean {
    return !isNaN(predicate) && typeof predicate === "number";
}

export function isFunction(predicate: any): boolean {
    return predicate && typeof predicate === "function";
}

export function any(...cases: boolean[]): boolean {
    for (let i = 0, len = cases.length; i < len; i++) {
        if (!!cases[i]) {
            return true;
        }
    }

    return false;
}