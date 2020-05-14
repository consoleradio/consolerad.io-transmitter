export function toArray<T = any>(arrayLike: any[] | IArguments | Iterable<T> | NodeList | NamedNodeMap): T[] {
    return Array.prototype.slice.apply(arrayLike);
}