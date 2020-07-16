export interface ISerializedError {
    name: string;
    message: string;
    stack: string;
    fileName?: string;
    lineNumber?: number;
    colNumber?: number;
}

export default class ErrorSerializer {
    public static create() {
        return new ErrorSerializer();
    }

    private constructor() {
        this.serialize = this.serialize.bind(this);
    }

    public serialize(error: Error): ISerializedError {
        return {
            name: error.name || "",
            message: error.message || "",
            stack: error.stack || ""
        };
    }

    public serializeFromEvent(event: ErrorEvent) {
        return {
            fileName: event.filename,
            lineNumber: event.lineno,
            colNumber: event.colno,
            ...this.serialize(event.error)
        }
    }
}