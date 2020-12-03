import ElementSerializer, { ISerializedElement } from "serializers/ElementSerializer";
import ICommandHandler from "interfaces/ICommandHandler";
import { Command } from "common/enums";
import { alias, define, singleton } from "@injex/core";

type Params = {
    selector: string;
};

@define()
@singleton()
@alias("CommandHandler")
export class QuerySelectorCommandHandler implements ICommandHandler<Params, ISerializedElement> {

    public readonly command = Command.QuerySelector;

    public handle(params: Params): ISerializedElement {
        const element = document.querySelector(params.selector);

        return ElementSerializer.create().serialize(element);
    }
}