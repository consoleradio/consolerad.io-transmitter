import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";

export default interface IConsoleMethodHandler {
    readonly method: ConsoleMethod;
    handle(argsRef: any[], payloadRef: any): void;
}