import ITransmitterOptions from "./interfaces/ITransmitterOptions";
import SocketClient from "./lib/SocketClient";
import ConsoleAdapter, { ConsoleAdapterEvent, InvokeEventArgs } from "./ConsoleAdapter";
import { Command, ActionResultStatus, Watch } from "./enums";
import { KillCode } from "@consolerad.io/stdlib/lib/enums";
import ConsoleManager from "./managers/ConsoleManager";
import CommandManager from "./managers/CommandManager";
import WatchManager, { IWatchManagerDelegate } from "./managers/WatchManager";
import { ICommandHandlerConstructor } from "./handlers/command_handlers/ICommandHandler";

function defaults(options: Partial<ITransmitterOptions>): ITransmitterOptions {
    return {
        ...options
    };
}

interface IAuthorizationData {
    amplifierId: string;
    publicKey: string;
}

interface ICommand {
    uid: string;
    cid: string;
    aid: string;
    id: string;
    cmd: Command;
    params: any;
}

interface IWatch {
    uid: string;
    cid: string;
    aid: string;
    watch: Watch;
    params: any;
}

const commandManager = Symbol("commandManager");
const consoleManager = Symbol("consoleManager");
const watchManager = Symbol("watchManager");

export default class BrowserTransmitter extends SocketClient implements IWatchManagerDelegate {

    private _consoleId: string;
    private _options: ITransmitterOptions;
    private _amplifierId: string;
    private _publicKey: string;
    private _killCode: KillCode;

    [commandManager]: CommandManager;
    [consoleManager]: ConsoleManager;
    [watchManager]: WatchManager;

    constructor(consoleId: string, options: ITransmitterOptions = {}) {
        super(process.env.BASE_URL, process.env.AMPLIFIERS_NS);

        this._onConsoleInvoke = this._onConsoleInvoke.bind(this);

        this._consoleId = consoleId;
        this._options = defaults(options);

        this[commandManager] = new CommandManager();
        this[consoleManager] = new ConsoleManager();
        this[watchManager] = new WatchManager();

        this[watchManager].delegate = this;
    }

    public connect() {
        this.initialize({
            secure: process.env.NODE_ENV === "production",
            reconnection: false,
            multiplex: false,
            query: {
                origin: window.location.origin,
                consoleId: this._consoleId
            }
        });
    }

    public disconnect() {
        this.socket.close();
    }

    public registerCommandHandler(handler: ICommandHandlerConstructor) {
        this[commandManager].registerHandler(handler);
    }

    protected onInitialize(): void {
        this.socket.on("welcome", this._onAuthorization.bind(this));
        this.socket.on("command:request", this._onCommandRequest.bind(this));
        this.socket.on("watch:request", this._onWatchRequest.bind(this));
        this.socket.on("watch:destroy", this._onDestroyWatch.bind(this));
        this.socket.on("kill", this._onKill.bind(this));
        this.socket.on("disconnect", this._onDisconnect.bind(this));
    }

    private _onAuthorization(data: IAuthorizationData) {
        this._amplifierId = data.amplifierId;
        this._publicKey = data.publicKey;

        ConsoleAdapter.Instance.on(
            ConsoleAdapterEvent.Invoke,
            this._onConsoleInvoke
        );
    }

    private _onDisconnect() {
        ConsoleAdapter.Instance.un(
            ConsoleAdapterEvent.Invoke,
            this._onConsoleInvoke
        );
    }

    private _onKill(data: { code: KillCode }) {
        this._killCode = data.code;
        console.warn(`Console Radio transmitter (${this._consoleId}) has been killed (${data.code}).\nUse 'connect()' method to reconnect.`);
    }

    private async _onCommandRequest(command: ICommand) {
        if (!this._isValidCommandObject(command)) {
            return;
        }

        let status = ActionResultStatus.Success,
            response = null,
            error = null;

        try {
            response = await this[commandManager].handle(command.cmd, command.params);
        } catch (err) {
            error = {
                message: err.toString(),
                error: err
            };
            status = ActionResultStatus.Error;
        }

        this.emit("command:response", {
            id: command.id,
            uid: command.uid,
            cid: command.cid,
            aid: command.aid,
            cmd: command.cmd,
            response,
            error,
            status
        });
    }

    private async _onWatchRequest(watch: IWatch) {
        if (!this._isValidWatchObject(watch)) {
            return;
        }

        let status = ActionResultStatus.Success,
            watcherId = null,
            error = null;

        try {
            watcherId = this[watchManager].watch(watch.watch, watch.params, watch.uid);
        } catch (err) {
            error = {
                message: err.toString(),
                error: err
            };
            status = ActionResultStatus.Error;
        }

        this.emit("watch:response", {
            watch: watch.watch,
            uid: watch.uid,
            cid: watch.cid,
            aid: watch.aid,
            id: watcherId,
            error,
            status
        });
    }

    public watchManagerDidReceiveUpdate(_: WatchManager, watcherId: string, ...args: any[]): void {
        const watcher = _.getWatchInstance(watcherId);

        if (!watcher) {
            return;
        }

        this.emit("watch:data", {
            id: watcherId,
            uid: watcher.userId,
            cid: this._consoleId,
            aid: this._amplifierId,
            args
        });
    }

    private async _onDestroyWatch(data: { watcherId: string; }) {
        await this[watchManager].destroy(data.watcherId);
    }

    private _onConsoleInvoke(event: CustomEvent<InvokeEventArgs>) {
        const { method, args, payload } = event.detail;

        this[consoleManager].handle(method, args, payload);

        this.emit(`console:${method}`, { args, payload });
    }

    private _isValidWatchObject(watch: IWatch) {
        return watch.cid === this._consoleId
            && watch.aid === this._amplifierId
            && this[watchManager].canHandle(watch.watch);
    }

    private _isValidCommandObject(command: ICommand) {
        return command.cid === this._consoleId
            && command.aid === this._amplifierId
            && this[commandManager].canHandle(command.cmd);
    }
}