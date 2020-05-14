export enum ConsoleMethod {
    Log = "log",
    Error = "error",
    Warn = "warn",
    Info = "info",
    Debug = "debug",
    Table = "table"
}

export enum KillCode {
    CONSOLE_NOT_FOUND = 1001,
    BAD_CONNECTION = 2001,
    BAD_ORIGIN = 3001,
    RATE_LIMIT = 4001,
    MANUAL = 5001,
}

export enum GlobalCommands {

}

export function enumNames(enm: any): string[] {
    let res = [];

    for (let key in enm) {
        if (res.indexOf(key) === -1 && res.indexOf(enm[key]) === -1 && isNaN(key as any)) {
            res.push(key);
        }
    }

    return res;
}

export function enumValues(enm: any): string[] {
    let res = [];

    for (let key in enm) {

        let useValue = enm[key];

        if (!isNaN(key as any)) {
            useValue = +key;
        }

        if (res.indexOf(useValue) === -1 && res.indexOf(key) === -1) {
            res.push(useValue);
        }
    }

    return res;
}