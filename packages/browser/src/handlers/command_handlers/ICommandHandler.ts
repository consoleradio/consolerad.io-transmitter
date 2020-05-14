import { Command } from "../../enums";
import IHandler from "@consolerad.io/stdlib/lib/interfaces/IHandler";
import IConstructor from "@consolerad.io/stdlib/lib/interfaces/IConstructor";

export interface ICommandHandlerConstructor<P = any> extends IConstructor<ICommandHandler<P>> {

}

export default interface ICommandHandler<P = any> extends IHandler<Command, P> {

}