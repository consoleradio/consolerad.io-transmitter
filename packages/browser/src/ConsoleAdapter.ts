import EventDispatcher from "./lib/EventDispatcher";
import { toArray } from "@consolerad.io/stdlib/lib/arrays";
import { ConsoleMethod } from "@consolerad.io/stdlib/lib/enums";

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

export default class ConsoleAdapter extends EventDispatcher<ConsoleAdapterEvent> {

    private static _instance: ConsoleAdapter;

    public static get Instance(): ConsoleAdapter {
        if (!ConsoleAdapter._instance) {
            ConsoleAdapter._instance = new ConsoleAdapter();
        }

        return ConsoleAdapter._instance;
    }

    private _originalConsoleMethods: { [index: string]: (...args: any[]) => void; };

    private constructor() {
        super();

        this._originalConsoleMethods = {};

        this._initialize();
    }

    private _initialize() {
        const self = this;
        INTERCEPT_CONSOLE_METHODS
            .map((method) => {
                this._originalConsoleMethods[method] = console[method];
                console[method] = function () {
                    self._invoke(method, toArray(arguments))
                };
            });
    }

    private _invoke(method: ConsoleMethod, args: any[]) {
        this._originalConsoleMethods[method].apply(console, args);
        this.dispatch<InvokeEventArgs>(ConsoleAdapterEvent.Invoke, {
            method,
            args,
            payload: {}
        });
    }
}