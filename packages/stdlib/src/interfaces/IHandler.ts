export default interface IHandler<T = any, P = any> {
    readonly handles: T;
    handle(...args: any[]): Promise<P> | P;
}