import ICommandHandler from "interfaces/ICommandHandler";
import { Command } from "common/enums";
import { alias, define, singleton } from "@injex/core";

@define()
@singleton()
@alias("CommandHandler")
export class ExecuteCommandHandler implements ICommandHandler {

    public readonly command = Command.Execute;

    public async handle(params: { code: string; }): Promise<any> {
        const fn = new Function(params.code);
        const result = await fn();

        return result;
    }
}