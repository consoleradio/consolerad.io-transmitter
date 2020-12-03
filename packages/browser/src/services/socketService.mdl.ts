import Hook from "@consolerad.io/stdlib/lib/Hook";
import { define, inject, singleton } from "@injex/core";
import { SocketEvent } from "common/enums";
import IAuthorizationResponse from "interfaces/IAuthorizationResponse";
import ICommandRequest from "interfaces/ICommandRequest";
import IEnvironment from "interfaces/IEnvironment";
import IKillInfo from "interfaces/IKillInfo";
import IWatchDestroyRequest from "interfaces/IWatchDestroyRequest";
import IWatchRequest from "interfaces/IWatchRequest";
import SocketClient from "lib/SocketClient";

export type SocketServiceHooks = {
    authorization: Hook<[authorizationResponse: IAuthorizationResponse]>;
    disconnect: Hook;
    commandRequest: Hook<[commandRequest: ICommandRequest]>;
    watchRequest: Hook<[watchRequest: IWatchRequest]>;
    watchDestroy: Hook<[watchDestroyRequest: IWatchDestroyRequest]>;
    kill: Hook<[info: IKillInfo]>;
};

@define()
@singleton()
export class SocketService {
    @inject() private env: IEnvironment;

    public hooks: SocketServiceHooks;
    private _client: SocketClient;
    private _amplifierId: string;

    public get amplifierId(): string {
        return this._amplifierId;
    }

    constructor() {
        this.hooks = {
            authorization: new Hook(),
            disconnect: new Hook(),
            commandRequest: new Hook(),
            watchRequest: new Hook(),
            watchDestroy: new Hook(),
            kill: new Hook(),
        };
    }

    public connect() {
        this._client = new SocketClient(this.env.apiUrl, this.env.amplifiersNamespace);

        this._client.initialize({
            secure: this.env.useSecureConnection,
            reconnection: false,
            multiplex: false,
            query: {
                origin: window.location.origin,
                consoleId: this.env.consoleId
            }
        });

        this._bindSocketEvents();
    }

    private _bindSocketEvents() {
        this._client.on(SocketEvent.Welcome, this._onAuthorization.bind(this));
        this._client.on(SocketEvent.CommandRequest, this._onCommandRequest.bind(this));
        this._client.on(SocketEvent.WatchRequest, this._onWatchRequest.bind(this));
        this._client.on(SocketEvent.WatchDestroy, this._onWatchDestroy.bind(this));
        this._client.on(SocketEvent.Kill, this._onKill.bind(this));
        this._client.on(SocketEvent.Disconnect, this._onDisconnect.bind(this));
    }

    private _onAuthorization(authorizationResponse: IAuthorizationResponse) {
        this._amplifierId = authorizationResponse.amplifierId;
        this.hooks.authorization.call(authorizationResponse);
    }

    private _onCommandRequest(commandRequest: ICommandRequest) {
        this.hooks.commandRequest.call(commandRequest);
    }

    private _onWatchRequest(watchRequest: IWatchRequest) {
        this.hooks.watchRequest.call(watchRequest);
    }

    private _onWatchDestroy(watchDestroyRequest: IWatchDestroyRequest) {
        this.hooks.watchDestroy.call(watchDestroyRequest);
    }

    private _onKill(info: IKillInfo) {
        this.hooks.kill.call(info);
    }

    private _onDisconnect() {
        this.hooks.disconnect.call();
    }

    public disconnect() {
        this._client.disconnect();
    }

    public send(event: string, params: any) {
        this._client.emit(event, params);
    }
}