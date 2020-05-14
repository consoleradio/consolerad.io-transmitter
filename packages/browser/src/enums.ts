export enum Command {
    Reload = "reload",
    QuerySelector = "querySelector",
    QuerySelectorAll = "querySelectorAll",
    GetBoundingClientRect = "getBoundingClientRect",
    Execute = "execute",
}

export enum Watch {
    WindowSize = "windowSize",
    WindowScroll = "windowScroll",
    Intersection = "intersection"
}

export enum ActionResultStatus {
    Success = "success",
    Error = "error"
}