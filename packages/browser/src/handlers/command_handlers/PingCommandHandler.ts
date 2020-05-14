import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";

export default class PingCommandHandler implements ICommandHandler {

    public readonly handles = Command.Ping;

    public async handle(unixTime: number): Promise<number> {
        const now = Date.now().valueOf() / 1000;

        return now - unixTime;
    }
}