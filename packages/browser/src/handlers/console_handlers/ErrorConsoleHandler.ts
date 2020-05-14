import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import IConsoleHandler from "./IConsoleHandler";

export default class ErrorConsoleHandler implements IConsoleHandler {

    public readonly handles = ConsoleMethod.Error;

    public handle(argsRef: any[], payloadRef: any): void {
        for (let i = 0, len = argsRef.length; i < len; i++) {
            if (Error.prototype.isPrototypeOf(argsRef[i])) {
                argsRef[i] = argsRef[i].stack;
            }
        }
    }
}