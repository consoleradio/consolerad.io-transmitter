import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import IHandler from "@consolerad.io/stdlib/lib/interfaces/IHandler";
import IConstructor from "@consolerad.io/stdlib/lib/interfaces/IConstructor";

export interface IConsoleHandlerConstructor extends IConstructor<IConsoleHandler> {

}

export default interface IConsoleHandler extends IHandler<ConsoleMethod, void> {

}