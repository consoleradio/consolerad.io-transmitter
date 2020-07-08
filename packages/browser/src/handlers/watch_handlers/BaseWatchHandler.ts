import { guid } from "@consolerad.io/stdlib/lib/strings";
import IWatchHandler from "./IWatchHandler";

export default abstract class BaseWatchHandler<S = any> implements IWatchHandler {

    public id: string;

    protected state: S;

    protected update: (...args: any[]) => void;

    constructor(public userId: string) {
        this.id = guid();
        this.state = null;
    }

    public setUpdater(updateFn: (...args: any[]) => void): void {
        this.update = updateFn;
    }

    public setState(state: S) {
        if (this.shouldUpdate(this.state, state)) {
            this.state = state;
            this.update(state);
        }
    }

    protected shouldUpdate(state: S, nextState: S): boolean {
        return state !== nextState;
    }

    public abstract watch(...args: any[]): void;
    public abstract willDestroy(): void | Promise<void>;
}