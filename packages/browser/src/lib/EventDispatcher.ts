export default class EventDispatcher<T extends string = string> {

    private _eventTarget: EventTarget;

    constructor() {
        this._eventTarget = document.createElement("a");
    }

    public on<P = any>(event: T, fn: (e: CustomEvent<P>) => void, options?: any) {
        this._eventTarget.addEventListener(event, fn, options);
    }

    public un<P = any>(event: T, fn: (e: CustomEvent<P>) => void, options?: any) {
        this._eventTarget.removeEventListener(event, fn, options);
    }

    protected dispatch<P = any>(event: T, payload: P) {
        this._eventTarget.dispatchEvent(new CustomEvent<P>(event, { detail: payload }));
    }
}