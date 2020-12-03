import ICommandHandler from "interfaces/ICommandHandler";
import { Command } from "common/enums";
import { alias, define, singleton } from "@injex/core";

type Params = {
    selector: string;
};

@define()
@singleton()
@alias("CommandHandler")
export class GetBoundingClientRectCommandHandler implements ICommandHandler<Params, ClientRect> {

    public readonly command = Command.GetBoundingClientRect;

    public handle(params: Params): ClientRect {
        const element = document.querySelector(params.selector);

        return element.getBoundingClientRect();
    }
}