import Hook from "./Hook";
import { toArray } from "./array";
import { ConsoleMethod } from "./enums";

const INTERCEPT_CONSOLE_METHODS: ConsoleMethod[] = [ConsoleMethod.Log, ConsoleMethod.Error, ConsoleMethod.Warn, ConsoleMethod.Info, ConsoleMethod.Debug, ConsoleMethod.Table];

export enum ConsoleAdapterEvent {
    Invoke = "invoke"
}

export type InvokeEventArgs = {
    method: ConsoleMethod;
    args: any[];
    payload: {
        [index: string]: any;
    };
}

export type ConsoleAdapterHooks = {
    invoke: Hook<[method: ConsoleMethod, args: any[]]>
}

export default class ConsoleAdapter {
    private static _instance: ConsoleAdapter;

    public static get Instance(): ConsoleAdapter {
        if (!ConsoleAdapter._instance) {
            ConsoleAdapter._instance = new ConsoleAdapter();
        }

        return ConsoleAdapter._instance;
    }

    public hooks: ConsoleAdapterHooks;
    private _originalConsoleMethods: { [index: string]: (...args: any[]) => void; };

    private constructor() {
        this._originalConsoleMethods = {};
        this.hooks = {
            invoke: new Hook
        };
        this._initialize();
    }

    private _initialize() {
        const self = this;
        INTERCEPT_CONSOLE_METHODS
            .map((method) => {
                this._originalConsoleMethods[method] = console[method];
                console[method] = function () {
                    const args = toArray(arguments);
                    self._originalConsoleMethods[method].apply(console, args)
                    self.hooks.invoke.call(method, args);
                };
            });
    }
}