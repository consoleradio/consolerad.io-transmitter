import { KillCode } from "@consolerad.io/stdlib/lib/enums";
import { define, init, inject, singleton } from "@injex/core";
import IEnvironment from "interfaces/IEnvironment";
import IKillInfo from "interfaces/IKillInfo";
import { SocketService } from "services/socketService.mdl";

@singleton()
@define()
export class BrowserTransmitter {

    @inject() private env: IEnvironment;
    @inject() private socketService: SocketService;

    private _killCode: KillCode;

    @init()
    protected initialize() {
        this.socketService.hooks.kill.tap(this._onKill, null, this);
    }

    public connect() {
        this.socketService.connect();
    }

    public disconnect() {
        this.socketService.disconnect();
    }

    private _onKill(info: IKillInfo) {
        this._killCode = info.code;
        console.warn(`Console Radio transmitter (${this.env.consoleId}) has been killed (${info.code}).\nUse 'connect()' method to reconnect.`);
    }

}