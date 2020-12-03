import { define, inject, singleton } from "@injex/core";
import ErrorSerializer from "serializers/ErrorSerializer";
import { SocketService } from "services/socketService.mdl";

@define()
@singleton()
export class GlobalEventManager {

    @inject() private socketService: SocketService;

    private _errorSerializer: ErrorSerializer;

    constructor() {
        this._errorSerializer = ErrorSerializer.create();
        this._onWindowError = this._onWindowError.bind(this);
        window.addEventListener("error", this._onWindowError);
    }

    private _onWindowError(e: ErrorEvent) {
        const type = e.type;
        const serialized = this._errorSerializer.serializeFromEvent(e);

        this.socketService.send("global:event", {
            type,
            args: [serialized]
        });
    }
}