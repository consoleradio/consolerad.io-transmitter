import IConsoleHandler from "../handlers/console_handlers/IConsoleHandler";
import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import * as handlers from "../handlers/console_handlers";
import BaseHandlersManager from "./BaseHandlersManager";

export default class ConsoleManager extends BaseHandlersManager<ConsoleMethod, IConsoleHandler> {
    protected initHandlers() {
        for (const handler in handlers) {
            this.registerHandler(handlers[handler]);
        }
    }
}