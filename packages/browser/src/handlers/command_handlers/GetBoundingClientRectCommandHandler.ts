import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";

export default class GetBoundingClientRectCommandHandler implements ICommandHandler {

    public readonly handles = Command.GetBoundingClientRect;

    public handle(params: { selector: string; }): ClientRect {
        const element = document.querySelector(params.selector);

        if (!element) {
            return null;
        }

        return element.getBoundingClientRect();
    }
}