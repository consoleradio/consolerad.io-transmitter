import { Watch } from "../../enums";
import BaseWatchHandler from "./BaseWatchHandler";

interface IState {
    angle: number;
}

export default class ScreenRotationWatchHandler extends BaseWatchHandler<IState> {

    public static readonly handles = Watch.ScreenRotation;

    public watch(): void {
        window.addEventListener("orientationchange", this._onOrientationChange);
    }

    private _onOrientationChange = () => {
        this.setState({
            angle: window.screen.orientation.angle
        });
    }

    protected shouldUpdate(state: IState, nextState: IState): boolean {
        return !state || state.angle !== nextState.angle;
    }

    public willDestroy(): void | Promise<void> {
        window.removeEventListener("orientationchange", this._onOrientationChange);
    }
}