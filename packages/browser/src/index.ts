import BrowserTransmitter from "./BrowserTransmitter";
import ITransmitterOptions from "./interfaces/ITransmitterOptions";
import ICommandHandler, { ICommandHandlerConstructor } from "./handlers/command_handlers/ICommandHandler";

function createTransmitter(consoleId: string, options?: ITransmitterOptions): BrowserTransmitter {
    if (!consoleId) {
        throw new TypeError(`ConsoleID is missing.`);
    }

    const transmitter = new BrowserTransmitter(consoleId, options);

    return transmitter;
}

export {
    ICommandHandler,
    ICommandHandlerConstructor,
    ITransmitterOptions,
    createTransmitter
};

if (module.hot) {
    module.hot.accept();
}