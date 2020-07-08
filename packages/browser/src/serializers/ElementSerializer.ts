import { toArray } from "@consolerad.io/stdlib/lib/arrays";
import { INameValuePair } from "@consolerad.io/stdlib/lib/interfaces/INameValuePair";
import asyncRaf from "async-raf";

export interface ISerializedElement {
    tagName: string;
    scrollWidth: number;
    scrollTop: number;
    scrollLeft: number;
    scrollHeight: number;
    nodeType: number;
    nodeName: string;
    localName: string;
    id: string;
    clientWidth: number;
    clientTop: number;
    clientLeft: number;
    clientHeight: number;
    attributes: INameValuePair[];
    rect: ClientRect;
}

export default class ElementSerializer {
    public static create() {
        return new ElementSerializer();
    }

    private constructor() {
        this.serialize = this.serialize.bind(this);
    }

    public serialize(element: Element): ISerializedElement {
        if (!element) {
            return null;
        }

        return {
            tagName: element.tagName,
            scrollWidth: element.scrollWidth,
            scrollTop: element.scrollTop,
            scrollLeft: element.scrollLeft,
            scrollHeight: element.scrollHeight,
            nodeType: element.nodeType,
            nodeName: element.nodeName,
            localName: element.localName,
            id: element.id,
            clientWidth: element.clientWidth,
            clientTop: element.clientTop,
            clientLeft: element.clientLeft,
            clientHeight: element.clientHeight,
            attributes: this._serializeAttributes(element.attributes),
            rect: this._serializeRect(element.getBoundingClientRect())
        };
    }

    public serializeAsync(element: Element): Promise<ISerializedElement> {
        return asyncRaf(() => this.serialize(element));
    }

    private _serializeAttributes(attributes: NamedNodeMap): INameValuePair[] {
        return toArray(attributes).map(({ name, value }) => ({ name, value }));
    }

    private _serializeRect(rect: ClientRect): ClientRect {
        return {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            bottom: rect.bottom,
            right: rect.right
        };
    }
}