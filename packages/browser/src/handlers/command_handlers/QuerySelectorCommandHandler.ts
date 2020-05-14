import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";
import ElementSerializer, { ISerializedElement } from "../../serializers/ElementSerializer";

export default class QuerySelectorCommandHandler implements ICommandHandler {

    public readonly handles = Command.QuerySelector;

    public handle(query: string): Promise<ISerializedElement> {
        const element = document.querySelector(query);

        return ElementSerializer.create().serializeAsync(element);
    }
}