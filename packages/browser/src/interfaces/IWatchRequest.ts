import { Watch } from "common/enums";

export default interface IWatchRequest {
    uid: string;
    cid: string;
    aid: string;
    watch: Watch;
    params: any;
}