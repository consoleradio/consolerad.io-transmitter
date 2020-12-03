import { LogLevel } from "@injex/core";

export default interface IEnvironment {
    amplifiersNamespace: string;
    consoleId: string;
    apiUrl: string;
    logLevel: LogLevel;
    useSecureConnection: boolean;
}