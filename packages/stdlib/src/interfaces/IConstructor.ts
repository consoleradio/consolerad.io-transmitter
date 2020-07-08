export default interface IConsoleHandlerConstructor<T> {
    new(...args: any[]): T;
}