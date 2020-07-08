import { Watch } from "../../enums";
import BaseWatchHandler from "./BaseWatchHandler";
import { throttle } from "@consolerad.io/stdlib/lib/timing";

export default class WindowSizeWatchHandler extends BaseWatchHandler {

    public static readonly handles = Watch.WindowSize;
    private _throttleValue: number;

    public watch({ throttleValue = 100 }: { throttleValue: number; }): void {
        this._throttleValue = Math.max(throttleValue, 0);
        window.addEventListener("resize", this._onWindowResize, { passive: true });
    }

    private _onWindowResize = throttle(() => {
        window.requestAnimationFrame(() => {
            this.setState({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
            });
        });
    }, this._throttleValue);

    public willDestroy(): void | Promise<void> {
        window.removeEventListener("resize", this._onWindowResize);
    }
}