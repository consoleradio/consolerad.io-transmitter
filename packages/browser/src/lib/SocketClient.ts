import * as io from "socket.io-client";

export default class SocketClient {
    protected socket: SocketIOClient.Socket;

    constructor(protected url: string, protected namespace: string = "") { }

    public async initialize(options: SocketIOClient.ConnectOpts) {
        this.socket = io.connect(`${this.url}/${this.namespace}`, {
            ...options,
            transports: ["websocket", "polling"],
            reconnectionAttempts: Infinity
        });
    }

    public emit(event: string, params: any = {}) {
        if (this.socket.disconnected) {
            return;
        }

        params.__t = Date.now();
        this.socket.emit(event, params);
    }

    public on(event: string, callback: (...args: any[]) => void) {
        this.socket.on(event, callback);
    }

    public un(event: string, callback: (...args: any[]) => void) {
        this.socket.off(event, callback);
    }

    public disconnect() {
        this.socket.close();
    }
}