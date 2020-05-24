export enum Command {
    Reload = "reload",
    QuerySelector = "querySelector",
    QuerySelectorAll = "querySelectorAll",
    GetBoundingClientRect = "getBoundingClientRect",
    Execute = "execute",
    Ping = "ping",
}

export enum Watch {
    WindowSize = "windowSize",
    WindowScroll = "windowScroll",
    Intersection = "intersection",
    MediaQuery = "mediaQuery"
}

export enum ActionResultStatus {
    Success = "success",
    Error = "error"
}