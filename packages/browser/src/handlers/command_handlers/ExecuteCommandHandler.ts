import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";

export default class ExecuteCommandHandler implements ICommandHandler {

    public readonly handles = Command.Execute;

    public async handle(code: string): Promise<any> {
        const fn = new Function(code);
        const result = await fn();

        return result;
    }
}