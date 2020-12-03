import { Command } from "common/enums";

export default interface ICommandHandler<T = any, K = void> {
    readonly command: Command;
    handle(params: T): K | Promise<K>;
}