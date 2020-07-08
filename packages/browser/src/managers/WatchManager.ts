import { Watch } from "../enums";
import IWatchHandler, { IWatchHandlerConstructor } from "../handlers/watch_handlers/IWatchHandler";
import * as handlers from "../handlers/watch_handlers";

export interface IWatchManagerDelegate {
    watchManagerDidReceiveUpdate(watchManager: WatchManager, watcherId: string, ...args: any[]): void;
}

export default class WatchManager {

    private _handlers: Map<Watch, IWatchHandlerConstructor>;
    private _watchers: Map<string, IWatchHandler>;

    public delegate: IWatchManagerDelegate;

    constructor() {
        this._handlers = new Map<Watch, IWatchHandlerConstructor>();
        this._watchers = new Map<Watch, IWatchHandler>();

        for (const handler in handlers) {
            this.registerHandler(handlers[handler]);
        }
    }

    public registerHandler(Handler: IWatchHandlerConstructor) {

        if (this._handlers.has(Handler.handles)) {
            console.warn(`Watch handler "${Handler.handles}" already registered.`);
            return;
        }

        this._handlers.set(Handler.handles, Handler);
    }

    public canHandle(watch: Watch): boolean {
        return this._handlers.has(watch);
    }

    public getWatchInstance(watcherId: string): IWatchHandler {
        return this._watchers.get(watcherId);
    }

    public watch(watch: Watch, params: any, userId: string): string {
        if (this.canHandle(watch)) {
            const WatcherConstructor = this._handlers.get(watch);

            const watcher = new WatcherConstructor(userId);

            watcher.setUpdater(this._createUpdaterFn(watcher));

            this._watchers.set(watcher.id, watcher);

            try {
                watcher.watch(params);
            } catch (e) {
                this.destroy(watcher.id);

                throw e;
            }

            return watcher.id;
        }
    }

    public async destroy(watcherId: string) {
        if (!this._watchers.has(watcherId)) {
            return;
        }

        await this._watchers.get(watcherId).willDestroy();

        this._watchers.delete(watcherId);
    }

    private _createUpdaterFn(watcher: IWatchHandler): (...args: any[]) => void {
        return (...args: any[]) => {
            this._invokeDelegateFn("watchManagerDidReceiveUpdate", watcher.id, ...args);
        }
    }

    private _invokeDelegateFn(fn: keyof IWatchManagerDelegate, ...args: any[]) {
        if (!this.delegate) {
            return;
        }

        this.delegate[fn].apply(this.delegate, [this, ...args]);
    }
}