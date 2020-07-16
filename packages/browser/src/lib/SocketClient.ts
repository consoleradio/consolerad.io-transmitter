import * as io from "socket.io-client";
import EventDispatcher from "./EventDispatcher";

export default abstract class SocketClient extends EventDispatcher {

    protected socket: SocketIOClient.Socket;
    protected namespace: string;
    protected url: string;

    protected abstract onInitialize(): void;

    constructor(url: string, namespace: string = "") {
        super();

        this.url = url;
        this.namespace = namespace;
    }

    public async initialize(options: SocketIOClient.ConnectOpts = {}) {
        this.socket = io(`${this.url}/${this.namespace}`, {
            ...options,
            transports: ["websocket", "polling"],
            reconnectionAttempts: Infinity
        });

        this.onInitialize();
    }

    protected emit(event: string, params: any = {}) {
        params.__t = Date.now();
        this.socket.emit(event, params);
    }
}