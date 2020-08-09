import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";
import ElementSerializer, { ISerializedElement } from "../../serializers/ElementSerializer";

export default class QuerySelectorCommandHandler implements ICommandHandler {

    public readonly handles = Command.QuerySelector;

    public handle(params: { selector: string; }): ISerializedElement {
        const element = document.querySelector(params.selector);

        return ElementSerializer.create().serialize(element);
    }
}