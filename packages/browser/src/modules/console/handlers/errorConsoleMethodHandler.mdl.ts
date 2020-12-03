import { define, singleton, alias } from "@injex/core";
import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import IConsoleMethodHandler from "interfaces/IConsoleMethodHandler";
import ErrorSerializer from "serializers/ErrorSerializer";

@define()
@singleton()
@alias("ConsoleMethodHandler")
export class ErrorConsoleHandler implements IConsoleMethodHandler {

    public readonly method = ConsoleMethod.Error;

    private _serializer: ErrorSerializer;

    constructor() {
        this._serializer = ErrorSerializer.create();
    }

    public handle(argsRef: any[], payloadRef: any): void {
        for (let i = 0, len = argsRef.length; i < len; i++) {
            if (Error.prototype.isPrototypeOf(argsRef[i])) {
                argsRef[i] = this._serializer.serialize(argsRef[i]);
            }
        }
    }
}