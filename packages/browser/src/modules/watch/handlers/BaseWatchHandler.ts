import Hook from "@consolerad.io/stdlib/lib/Hook";
import { guid } from "@consolerad.io/stdlib/lib/string";
import IWatchHandler, { WatchHandlerHooks } from "interfaces/IWatchHandler";

export default abstract class BaseWatchHandler<S = any> implements IWatchHandler<S> {

    public id: string;
    public hooks: WatchHandlerHooks<S>;

    protected state: S;

    constructor(public userId: string) {
        this.id = guid();
        this.state = null;
        this.hooks = {
            stateChange: new Hook()
        };
    }

    public setState(state: S) {
        if (this.shouldUpdate(this.state, state)) {
            this.state = state;
            this.hooks.stateChange.call(this, state);
        }
    }

    protected shouldUpdate(state: S, nextState: S): boolean {
        return state !== nextState;
    }

    public abstract watch(...args: any[]): void;
    public abstract willDestroy(): void | Promise<void>;
}