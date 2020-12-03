import { define, singleton, alias } from "@injex/core";
import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import IConsoleMethodHandler from "interfaces/IConsoleMethodHandler";

@define()
@singleton()
@alias("ConsoleMethodHandler")
export class TableConsoleMethodHandler implements IConsoleMethodHandler {

    public readonly method = ConsoleMethod.Table;

    public handle(argsRef: any[], payloadRef: any): void {

    }
}