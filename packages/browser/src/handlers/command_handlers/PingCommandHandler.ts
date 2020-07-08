import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";

export default class PingCommandHandler implements ICommandHandler {

    public readonly handles = Command.Ping;

    public async handle(params: { timestamp: number; }): Promise<number> {
        return Date.now() - params.timestamp;
    }
}