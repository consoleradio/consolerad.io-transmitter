import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";
import { setStyle } from "../../common/utils/style";

export default class SetElementStyleCommandHandler implements ICommandHandler {

    public readonly handles = Command.SetElementStyle;

    public handle(query: string, styles: Partial<CSSStyleDeclaration>): void {
        const element = document.querySelector<HTMLElement>(query);

        if (!element) {
            throw new Error("element not found");
        }

        setStyle(element, styles);
    }
}