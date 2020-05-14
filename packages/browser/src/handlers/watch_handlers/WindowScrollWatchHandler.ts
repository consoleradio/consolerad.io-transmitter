import { Watch } from "../../enums";
import BaseWatchHandler from "./BaseWatchHandler";
import { throttle } from "@consolerad.io/stdlib/lib/timing";

export default class WindowScrollWatchHandler extends BaseWatchHandler {

    public static readonly handles = Watch.WindowScroll;
    private _throttleValue: number;

    public watch(throttleValue: number = 100): void {
        this._throttleValue = Math.max(throttleValue, 0);
        window.addEventListener("scroll", this._onWindowScroll, { passive: true });
    }

    private _onWindowScroll = throttle(() => {
        window.requestAnimationFrame(() => {
            this.setState({
                scrollY: window.scrollY,
                scrollX: window.scrollX
            });
        });
    }, this._throttleValue);

    public willDestroy(): void | Promise<void> {
        window.removeEventListener("scroll", this._onWindowScroll);
    }
}