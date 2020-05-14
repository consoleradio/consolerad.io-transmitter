import IHandler from "@consolerad.io/stdlib/lib/interfaces/IHandler";
import IConstructor from "@consolerad.io/stdlib/lib/interfaces/IConstructor";

export default abstract class BaseHandlersManager<T, H extends IHandler> {

    private _handlers: Map<T, H>;

    constructor() {
        this._handlers = new Map<T, H>();

        this.initHandlers();
    }

    protected abstract initHandlers(): void;

    public registerHandler(Handler: IConstructor<H>) {
        const handler = new Handler();

        if (this._handlers.has(handler.handles)) {
            console.warn(`Handler "${handler.handles}" already registered.`);
            return;
        }

        this._handlers.set(handler.handles, handler);
    }

    public canHandle(handler: T): boolean {
        return this._handlers.has(handler);
    }

    public async handle<P = any>(handler: T, ...args: any[]): Promise<P> {
        if (this.canHandle(handler)) {
            return this._handlers
                .get(handler)
                .handle(...args);
        }
    }

}