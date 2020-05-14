export default interface IConsoleHandler {
    readonly handles: string;
    handle(argsRef: any[], payloadRef: any): void;
}