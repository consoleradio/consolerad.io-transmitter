import { alias, define } from "@injex/core";
import { Watch } from "common/enums";
import BaseWatchHandler from "./BaseWatchHandler";

interface IScreenRotationState {
    angle: number;
}

@define()
@alias("WatchHandler")
export class ScreenRotationWatchHandler extends BaseWatchHandler<IScreenRotationState> {

    public static readonly handles = Watch.ScreenRotation;

    public watch(): void {
        window.addEventListener("orientationchange", this._onOrientationChange);
    }

    private _onOrientationChange = () => {
        this.setState({
            angle: window.screen.orientation.angle
        });
    }

    protected shouldUpdate(state: IScreenRotationState, nextState: IScreenRotationState): boolean {
        return !state || state.angle !== nextState.angle;
    }

    public willDestroy(): void | Promise<void> {
        window.removeEventListener("orientationchange", this._onOrientationChange);
    }
}