import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";
import { setStyle } from "../../common/utils/style";
import { tryParseJSON } from "@consolerad.io/stdlib/lib/json"

export default class SetElementStyleCommandHandler implements ICommandHandler {

    public readonly handles = Command.SetElementStyle;

    public handle(params: { selector: string; styles: Partial<CSSStyleDeclaration>; }): void {
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