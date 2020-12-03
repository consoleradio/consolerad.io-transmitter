import { AliasFactory, define, init, inject, injectAlias, singleton } from "@injex/core";
import { ActionResultStatus, Watch } from "common/enums";
import IEnvironment from "interfaces/IEnvironment";
import IWatchDestroyRequest from "interfaces/IWatchDestroyRequest";
import IWatchHandler from "interfaces/IWatchHandler";
import IWatchRequest from "interfaces/IWatchRequest";
import { SocketService } from "services/socketService.mdl";

@define()
@singleton()
export class WatchManager {

    @inject() private socketService: SocketService;
    @inject() private env: IEnvironment;
    @injectAlias("WatchHandler", "handles") private watchHandlers: AliasFactory<Watch, IWatchHandler>;

    private _watchers: Map<string, IWatchHandler>;

    constructor() {
        this._watchers = new Map<Watch, IWatchHandler>();
    }

    @init()
    protected initialize() {
        this.socketService.hooks.watchRequest.tap(this._onWatchRequest, null, this);
        this.socketService.hooks.watchDestroy.tap(this._onWatchDestroy, null, this);
    }

    private _onWatchRequest(watchRequest: IWatchRequest) {
        if (!this._isValidWatchRequest(watchRequest)) {
            return;
        }

        let status = ActionResultStatus.Success,
            watcherId = null,
            error = null;

        try {
            const watcher = this.watchHandlers[watchRequest.watch](watchRequest.uid);

            watcher.hooks.stateChange.tap(this._onWatchStateChange, null, this);

            this._watchers.set(watcher.id, watcher);

            try {
                watcher.watch(watchRequest.params);
                watcherId = watcher.id;
            } catch (e) {
                this.destroy(watcher.id);
                throw e;
            }

        } catch (err) {
            status = ActionResultStatus.Error;
            error = { message: err.toString(), error: err };
        }

        this.socketService.send("watch:response", {
            watch: watchRequest.watch,
            uid: watchRequest.uid,
            cid: watchRequest.cid,
            aid: watchRequest.aid,
            id: watcherId,
            error,
            status
        });
    }

    private _onWatchStateChange(watchHandler: IWatchHandler, state: any) {
        this.socketService.send("watch:data", {
            id: watchHandler.id,
            uid: watchHandler.userId,
            watch: (watchHandler as any).constructor.handles,
            cid: this.env.consoleId,
            aid: this.socketService.amplifierId,
            args: [state]
        });
    }

    private _onWatchDestroy(watchDestroyRequest: IWatchDestroyRequest) {
        this.destroy(watchDestroyRequest.wid);
    }

    public async destroy(watcherId: string) {
        if (!this._watchers.has(watcherId)) {
            return;
        }

        const watcher = this._watchers.get(watcherId);

        await watcher.willDestroy();

        watcher.hooks.stateChange.untap(this._onWatchStateChange);

        this._watchers.delete(watcherId);
    }

    private _isValidWatchRequest(watchRequest: IWatchRequest): boolean {
        return watchRequest.cid === this.env.consoleId
            && watchRequest.aid === this.socketService.amplifierId
            && watchRequest.watch in this.watchHandlers;
    }
}