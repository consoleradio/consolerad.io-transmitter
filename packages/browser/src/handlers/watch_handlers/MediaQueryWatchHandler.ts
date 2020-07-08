import { Watch } from "../../enums";
import BaseWatchHandler from "./BaseWatchHandler";

export default class MediaQueryWatchHandler extends BaseWatchHandler<{ media: string; matches: boolean; }> {

    public static readonly handles = Watch.MediaQuery;
    private _mediaQueryList: MediaQueryList;

    public watch(params: { query: string; }): void {
        this._mediaQueryList = window.matchMedia(params.query);

        this._mediaQueryList.addListener(this._onMediaChange);
    }

    private _onMediaChange = (e: MediaQueryListEvent) => {
        const { media, matches } = e;

        this.setState({
            media, matches
        });
    }

    public willDestroy(): void | Promise<void> {
        this._mediaQueryList.removeListener(this._onMediaChange);
        this._mediaQueryList = null;
    }
}