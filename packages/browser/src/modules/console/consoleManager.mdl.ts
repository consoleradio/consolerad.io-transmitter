import ConsoleAdapter from "@consolerad.io/stdlib/lib/ConsoleAdapter";
import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import { AliasMap, define, init, inject, injectAlias, singleton } from "@injex/core";
import IConsoleMethodHandler from "interfaces/IConsoleMethodHandler";
import { SocketService } from "services/socketService.mdl";

@define()
@singleton()
export class ConsoleManager {

    @inject() private socketService: SocketService;
    @injectAlias("ConsoleMethodHandler", "method") private consoleMethodHandlers: AliasMap<ConsoleMethod, IConsoleMethodHandler>;

    @init()
    protected initialize() {
        this.socketService.hooks.authorization.tap(this._onAuthorization, null, this);
        this.socketService.hooks.disconnect.tap(this._onDisconnect, null, this);
    }

    private _onAuthorization() {
        ConsoleAdapter.Instance.hooks.invoke.tap(this._onConsoleInvoke, null, this);
    }

    private _onConsoleInvoke(method: ConsoleMethod, args: any[]) {
        const payload = {};
        const methodHandler = this.consoleMethodHandlers[method];

        if (methodHandler) {
            methodHandler.handle(args, payload);
        }

        this.socketService.send(`console:${method}`, { args, payload });
    }

    private _onDisconnect() {
        ConsoleAdapter.Instance.hooks.invoke.untap(this._onConsoleInvoke);
    }
}