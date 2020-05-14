import { Command } from "../enums";
import ICommandHandler from "../handlers/command_handlers/ICommandHandler";
import * as handlers from "../handlers/command_handlers";
import BaseHandlersManager from "./BaseHandlersManager";

export default class CommandManager extends BaseHandlersManager<Command, ICommandHandler> {
    protected initHandlers() {
        for (const handler in handlers) {
            this.registerHandler(handlers[handler]);
        }
    }
}