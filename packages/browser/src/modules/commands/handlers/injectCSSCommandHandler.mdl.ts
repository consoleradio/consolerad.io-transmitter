import ICommandHandler from "interfaces/ICommandHandler";
import { Command } from "common/enums";
import { alias, define, singleton } from "@injex/core";
import { injectStyleRules } from "common/utils/style";

type Params = {
    css: string;
};

@define()
@singleton()
@alias("CommandHandler")
export class InjectCSSCommandHandler implements ICommandHandler {

    public readonly command = Command.InjectCSS;

    public handle(params: Params): void {
        injectStyleRules(params.css);
    }
}   