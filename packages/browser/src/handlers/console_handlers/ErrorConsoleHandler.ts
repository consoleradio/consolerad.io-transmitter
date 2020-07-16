import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import IConsoleHandler from "./IConsoleHandler";
import ErrorSerializer from "../../serializers/ErrorSerializer";

export default class ErrorConsoleHandler implements IConsoleHandler {

    public readonly handles = ConsoleMethod.Error;
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