import { Command } from "common/enums";

export default interface ICommandRequest {
    uid: string;
    cid: string;
    aid: string;
    id: string;
    cmd: Command;
    params: any;
}