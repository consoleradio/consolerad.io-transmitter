import ElementSerializer, { ISerializedElement } from "serializers/ElementSerializer";
import { toArray } from "@consolerad.io/stdlib/lib/array";
import ICommandHandler from "interfaces/ICommandHandler";
import { Command } from "common/enums";
import { alias, define, singleton } from "@injex/core";

type Params = {
    selector: string;
};

@define()
@singleton()
@alias("CommandHandler")
export class QuerySelectorAllCommandHandler implements ICommandHandler<Params, ISerializedElement[]> {

    public readonly command = Command.QuerySelectorAll;

    public handle(params: Params): ISerializedElement[] {
        const elements = document.querySelectorAll(params.selector)
            , serializer = ElementSerializer.create();

        return toArray(elements).map<ISerializedElement>((element) => serializer.serialize(element));
    }
}