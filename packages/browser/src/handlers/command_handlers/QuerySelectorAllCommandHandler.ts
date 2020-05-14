import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";
import ElementSerializer, { ISerializedElement } from "../../serializers/ElementSerializer";
import { toArray } from "@consolerad.io/stdlib/lib/arrays";

export default class QuerySelectorAllCommandHandler implements ICommandHandler {

    public readonly handles = Command.QuerySelectorAll;

    public handle(query: string): Promise<ISerializedElement[]> {
        const elements = document.querySelectorAll(query)
            , serializer = ElementSerializer.create();

        return Promise.all(toArray(elements).map(serializer.serializeAsync));
    }
}