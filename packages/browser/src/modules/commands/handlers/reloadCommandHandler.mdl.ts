import ICommandHandler from "interfaces/ICommandHandler";
import { Command } from "common/enums";
import { alias, define, singleton } from "@injex/core";

@define()
@singleton()
@alias("CommandHandler")
export class ReloadCommandHandler implements ICommandHandler {

    public readonly command = Command.Reload;

    public handle(): void {
        window.location.reload();
    }
}