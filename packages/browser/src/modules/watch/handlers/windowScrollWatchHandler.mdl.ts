import { throttle } from "@consolerad.io/stdlib/lib/async";
import { alias, define } from "@injex/core";
import { Watch } from "common/enums";
import BaseWatchHandler from "./BaseWatchHandler";

interface IWindowScrollState {
    scrollX: number;
    scrollY: number;
}

@define()
@alias("WatchHandler")
export class WindowScrollWatchHandler extends BaseWatchHandler<IWindowScrollState> {

    public static readonly handles = Watch.WindowScroll;
    private _throttleValue: number;

    public watch({ throttleValue = 100 }: { throttleValue: number; }): void {
        this._throttleValue = Math.max(throttleValue, 0);
        this._onWindowScroll = throttle(this._onWindowScroll.bind(this), this._throttleValue);
        window.addEventListener("scroll", this._onWindowScroll, { passive: true });
    }

    private _onWindowScroll() {
        window.requestAnimationFrame(() => {
            this.setState({
                scrollY: window.scrollY,
                scrollX: window.scrollX
            });
        });
    }

    protected shouldUpdate(state: IWindowScrollState, nextState: IWindowScrollState): boolean {
        return state === null || state.scrollX !== nextState.scrollX || state.scrollY !== nextState.scrollY;
    }

    public willDestroy(): void | Promise<void> {
        window.removeEventListener("scroll", this._onWindowScroll);
    }
}