export enum SocketEvent {
    Welcome = "welcome",
    CommandRequest = "command:request",
    WatchRequest = "watch:request",
    WatchDestroy = "watch:destroy",
    Kill = "kill",
    Disconnect = "disconnect",
}

export enum Command {
    Reload = "reload",
    QuerySelector = "querySelector",
    QuerySelectorAll = "querySelectorAll",
    GetBoundingClientRect = "getBoundingClientRect",
    Execute = "execute",
    Ping = "ping",
    SetElementStyle = "setElementStyle",
    InjectCSS = "injectCSS",
}

export enum Watch {
    WindowSize = "windowSize",
    WindowScroll = "windowScroll",
    Intersection = "intersection",
    MediaQuery = "mediaQuery",
    ScreenRotation = "screenRotation",
}

export enum ActionResultStatus {
    Success = "success",
    Error = "error"
}