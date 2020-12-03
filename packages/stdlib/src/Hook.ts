export type HookFn<A extends Array<any> = any[]> = (...args: A) => void;
export type HookCatchFn = (e: Error) => void;
export type CallbackArgs<A extends Array<any> = any[]> = {
    async: boolean;
    callback: HookFn<A>;
    catchFn?: HookCatchFn;
    scope?: any;
    once?: boolean;
};

export type HooksMap<T extends string> = {
    [index in T]: Hook<any>;
}

export default class Hook<A extends Array<any> = any[]> {

    private _callbacks: Array<CallbackArgs<A>>;

    constructor() {
        this._callbacks = [];
    }

    public pipe(hook: Hook) {
        this.tap(hook.call, null, hook);
    }

    public unpipe(hook: Hook) {
        this.untap(hook.call);
    }

    public tap(callback: HookFn<A>, catchFn?: HookCatchFn, scope?: any) {
        this._callbacks.push({
            async: false,
            callback,
            catchFn,
            scope,
        });
    }

    public tapOnce(callback: HookFn<A>, catchFn?: HookCatchFn, scope?: any) {
        this._callbacks.push({
            async: false,
            once: true,
            callback,
            catchFn,
            scope,
        });
    }

    public tapAsync(callback: HookFn<A>, catchFn?: HookCatchFn, scope?: any) {
        this._callbacks.push({
            async: true,
            callback,
            catchFn,
            scope,
        });
    }

    public tapAsyncOnce(callback: HookFn<A>, catchFn?: HookCatchFn, scope?: any) {
        this._callbacks.push({
            async: true,
            once: true,
            callback,
            catchFn,
            scope,
        });
    }

    public untap(callbackToRemove: HookFn<A>) {
        this._callbacks = this._callbacks.filter(({ callback }) => {
            return callbackToRemove !== callback;
        });
    }

    public async call(...args: A) {
        const onceCallbacks = [];
        let callbackArgs: CallbackArgs<A>;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
            callbackArgs = this._callbacks[i];
            if (!callbackArgs) continue;

            try {
                if (callbackArgs.once) {
                    onceCallbacks.push(callbackArgs.callback);
                }
                if (callbackArgs.async) {
                    await callbackArgs.callback.apply(callbackArgs.scope, args);
                } else {
                    callbackArgs.callback.apply(callbackArgs.scope, args);
                }
            } catch (e) {
                if (callbackArgs.catchFn) {
                    callbackArgs.catchFn(e);
                } else {
                    throw e;
                }
            }
        }

        if (onceCallbacks.length) {
            onceCallbacks.map((callback) => this.untap(callback));
            onceCallbacks.length = 0;
        }
    }
}