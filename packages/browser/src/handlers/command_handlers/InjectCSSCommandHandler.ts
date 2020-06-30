import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";
import { injectStyleRules } from "../../common/utils/style";

export default class InjectCSSCommandHandler implements ICommandHandler {

    public readonly handles = Command.InjectCSS;

    public handle(css: string): void {
        injectStyleRules(css);
    }
}