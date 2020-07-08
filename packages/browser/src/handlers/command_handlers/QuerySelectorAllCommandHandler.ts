import ICommandHandler from "./ICommandHandler";
import { Command } from "../../enums";
import ElementSerializer, { ISerializedElement } from "../../serializers/ElementSerializer";
import { toArray } from "@consolerad.io/stdlib/lib/arrays";

export default class QuerySelectorAllCommandHandler implements ICommandHandler {

    public readonly handles = Command.QuerySelectorAll;

    public handle(params: { selector: string; }): Promise<ISerializedElement[]> {
        const elements = document.querySelectorAll(params.selector)
            , serializer = ElementSerializer.create();

        return Promise.all(toArray(elements).map((element) => serializer.serializeAsync(element)));
    }
}