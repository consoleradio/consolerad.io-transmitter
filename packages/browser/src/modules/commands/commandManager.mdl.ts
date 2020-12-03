import { define, singleton, inject, injectAlias, AliasMap, init } from "@injex/core";
import { ActionResultStatus, Command } from "common/enums";
import ICommandRequest from "interfaces/ICommandRequest";
import ICommandHandler from "interfaces/ICommandHandler";
import IEnvironment from "interfaces/IEnvironment";
import { SocketService } from "services/socketService.mdl";

@define()
@singleton()
export class CommandManager {

    @inject() private socketService: SocketService;
    @inject() private env: IEnvironment;
    @injectAlias("CommandHandler", "command") private commandHandlers: AliasMap<Command, ICommandHandler>;

    @init()
    protected initialize() {
        this.socketService.hooks.commandRequest.tap(this._onCommandRequest, null, this);
    }

    private async _onCommandRequest(commandRequest: ICommandRequest) {
        if (!this._isValidCommandRequest(commandRequest)) {
            return;
        }

        let status = ActionResultStatus.Success,
            response = null,
            error = null;

        try {
            response = await this.commandHandlers[commandRequest.cmd].handle(commandRequest.params);
        } catch (err) {
            status = ActionResultStatus.Error;
            error = { message: err.toString(), error: err };
        }

        this.socketService.send("command:response", {
            id: commandRequest.id,
            uid: commandRequest.uid,
            cid: commandRequest.cid,
            aid: commandRequest.aid,
            cmd: commandRequest.cmd,
            response,
            error,
            status
        });
    }

    private _isValidCommandRequest(commandRequest: ICommandRequest): boolean {
        return commandRequest.cid === this.env.consoleId
            && commandRequest.aid === this.socketService.amplifierId
            && commandRequest.cmd in this.commandHandlers;
    }
}