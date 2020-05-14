import { Watch } from "../../enums";
import BaseWatchHandler from "./BaseWatchHandler";
import ElementSerializer, { ISerializedElement } from "../../serializers/ElementSerializer";

export interface IIntersectionState {
    boundingClientRect: DOMRectReadOnly;
    intersectionRatio: number;
    intersectionRect: DOMRectReadOnly;
    isIntersecting: boolean;
    rootBounds: DOMRectReadOnly | null;
    target: ISerializedElement;
    time: number;
}

export default class IntersectionWatchHandler extends BaseWatchHandler<IIntersectionState> {

    public static readonly handles = Watch.Intersection;

    private _observer: IntersectionObserver;
    private _serializer: ElementSerializer;

    public watch(selector: string, options: IntersectionObserverInit = {}): void {

        const element = document.querySelector(selector);

        if (!element) {
            throw new Error(`${this.constructor.name}: element selector not found.`);
        }

        this._observer = new IntersectionObserver(this._onIntersection, options);

        this._serializer = ElementSerializer.create();

        this._observer.observe(element);
    }

    private _onIntersection = (entries: IntersectionObserverEntry[]) => {
        const { target, ...others } = entries[0];

        const state: IIntersectionState = {
            ...others,
            target: this._serializer.serialize(target)
        };

        this.setState(state);
    }

    protected shouldUpdate(state: IIntersectionState, nextState: IIntersectionState): boolean {
        return state.isIntersecting !== nextState.isIntersecting;
    }

    public willDestroy(): void | Promise<void> {
        this._observer.disconnect();
        this._observer = null;
    }
}