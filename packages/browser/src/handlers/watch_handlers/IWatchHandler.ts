import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";
import IHandler from "@consolerad.io/stdlib/lib/interfaces/IHandler";
import IConstructor from "@consolerad.io/stdlib/lib/interfaces/IConstructor";
import { Watch } from "../../enums";

export interface IWatchHandlerConstructor extends IConstructor<IWatchHandler> {
    readonly handles: Watch;
}

export default interface IWatchHandler {
    id: string;
    setUpdater(updater: (...args: any[]) => void): void;
    watch(...args: any[]): void;
    willDestroy(): void | Promise<void>;
}