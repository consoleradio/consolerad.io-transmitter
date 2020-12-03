export default interface IConstructor<T> {
    new(...args: any[]): T;
}