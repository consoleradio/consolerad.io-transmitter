import { Watch } from "../../enums";
import BaseWatchHandler from "./BaseWatchHandler";
import { throttle } from "@consolerad.io/stdlib/lib/timing";

interface IState {
    scrollX: number;
    scrollY: number;
}

export default class WindowScrollWatchHandler extends BaseWatchHandler<IState> {

    public static readonly handles = Watch.WindowScroll;
    private _throttleValue: number;

    public watch({ throttleValue = 100 }: { throttleValue: number; }): void {
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

    protected shouldUpdate(state: IState, nextState: IState): boolean {
        return state === null || state.scrollX !== nextState.scrollX || state.scrollY !== nextState.scrollY;
    }

    public willDestroy(): void | Promise<void> {
        window.removeEventListener("scroll", this._onWindowScroll);
    }
}