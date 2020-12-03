import Hook from "@consolerad.io/stdlib/lib/Hook";

export type WatchHandlerHooks<S> = {
    stateChange: Hook<[watchHandler: IWatchHandler<S>, state: S]>;
}

export default interface IWatchHandler<S = any> {
    id: string;
    userId: string;
    hooks: WatchHandlerHooks<S>;
    watch(params: any): void;
    willDestroy(): void | Promise<void>;
}