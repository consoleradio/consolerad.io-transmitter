import { tryParseJSON } from "@consolerad.io/stdlib/lib/json"
import ICommandHandler from "interfaces/ICommandHandler";
import { Command } from "common/enums";
import { alias, define, singleton } from "@injex/core";
import { setStyle } from "common/utils/style";

type Params = {
    selector: string;
    styles: Partial<CSSStyleDeclaration>;
};

@define()
@singleton()
@alias("CommandHandler")
export class SetElementStyleCommandHandler implements ICommandHandler<Params> {

    public readonly command = Command.SetElementStyle;

    public handle(params: Params): void {
        const element = document.querySelector<HTMLElement>(params.selector);

        if (!element) {
            throw new Error("element not found");
        }

        params.styles = tryParseJSON(params.styles);

        if (!params.styles) {
            throw new Error("style declerations not valid");
        }

        setStyle(element, params.styles);
    }
}