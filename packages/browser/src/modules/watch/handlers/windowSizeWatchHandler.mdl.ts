import { throttle } from "@consolerad.io/stdlib/lib/async";
import { alias, define } from "@injex/core";
import { Watch } from "common/enums";
import BaseWatchHandler from "./BaseWatchHandler";

interface IWindowResizeState {
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
}

@define()
@alias("WatchHandler")
export class WindowSizeWatchHandler extends BaseWatchHandler<IWindowResizeState> {

    public static readonly handles = Watch.WindowSize;
    private _throttleValue: number;

    public watch({ throttleValue = 100 }: { throttleValue: number; }): void {
        this._throttleValue = Math.max(throttleValue, 0);
        this._onWindowResize = throttle(this._onWindowResize.bind(this), this._throttleValue);
        window.addEventListener("resize", this._onWindowResize, { passive: true });
    }

    private _onWindowResize() {
        window.requestAnimationFrame(() => {
            this.setState({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
            });
        });
    }

    public willDestroy(): void | Promise<void> {
        window.removeEventListener("resize", this._onWindowResize);
    }
}