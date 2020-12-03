import ICommandHandler from "interfaces/ICommandHandler";
import { Command } from "common/enums";
import { alias, define, singleton } from "@injex/core";

type Params = {
    timestamp: number;
};

@define()
@singleton()
@alias("CommandHandler")
export class PingCommandHandler implements ICommandHandler<Params, number> {

    public readonly command = Command.Ping;

    public async handle(params: { timestamp: number; }): Promise<number> {
        return Date.now() - params.timestamp;
    }
}