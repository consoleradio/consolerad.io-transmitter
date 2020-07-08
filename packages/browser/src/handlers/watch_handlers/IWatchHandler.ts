import IConstructor from "@consolerad.io/stdlib/lib/interfaces/IConstructor";
import { Watch } from "../../enums";

export interface IWatchHandlerConstructor extends IConstructor<IWatchHandler> {
    readonly handles: Watch;
}

export default interface IWatchHandler {
    id: string;
    userId: string;
    setUpdater(updater: (...args: any[]) => void): void;
    watch(params: any): void;
    willDestroy(): void | Promise<void>;
}