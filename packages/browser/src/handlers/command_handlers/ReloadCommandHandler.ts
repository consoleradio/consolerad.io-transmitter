import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";

export default class ReloadCommandHandler implements ICommandHandler {

    public readonly handles = Command.Reload;

    public handle(): void {
        window.location.reload();
    }
}