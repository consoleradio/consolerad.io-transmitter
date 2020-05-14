import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import IConsoleHandler from "./IConsoleHandler";

export default class TableConsoleHandler implements IConsoleHandler {

    public readonly handles = ConsoleMethod.Table;

    public handle(argsRef: any[], payloadRef: any): void {

    }
}