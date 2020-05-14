import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";

export default class GetBoundingClientRectCommandHandler implements ICommandHandler {

    public readonly handles = Command.GetBoundingClientRect;

    public handle(query: string): ClientRect {
        const element = document.querySelector(query);

        if (!element) {
            return null;
        }

        return element.getBoundingClientRect();
    }
}