import ErrorSerializer from "../serializers/ErrorSerializer";

export interface IGlobalEventManagerDelegate {
    globalEventManagerDidInvoke(globalEventManager: GlobalEventManager, ...args: any[]): void;
}

export default class GlobalEventManager {

    private _errorSerializer: ErrorSerializer;

    constructor(public delegate?: IGlobalEventManagerDelegate) {
        this._errorSerializer = ErrorSerializer.create();
        this._onWindowError = this._onWindowError.bind(this);
        window.addEventListener("error", this._onWindowError);
    }

    private _onWindowError(e: ErrorEvent) {
        this._invokeDelegateFn("globalEventManagerDidInvoke", e.type, this._errorSerializer.serializeFromEvent(e));
    }

    private _invokeDelegateFn(fn: keyof IGlobalEventManagerDelegate, ...args: any[]) {
        if (!this.delegate) {
            return;
        }

        this.delegate[fn].apply(this.delegate, [this, ...args]);
    }
}