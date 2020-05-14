import { createTransmitter } from "./index";

if (window["ConsoleRadio"] && window["ConsoleRadio"].VERSION !== process.env.VERSION) {
    throw new Error(`Console Radio v${window["ConsoleRadio"].VERSION} already loaded.\nLoading 2 different versions on the same page is not allowed.`);
}

export default {
    VERSION: process.env.VERSION,
    createTransmitter
};

/**
 * Create a transmitter if the UMD script tag contains
 * `data-console-id` attribute.
 */
(function (): void {
    const consoleId = document.currentScript?.dataset?.consoleId ?? null;
    consoleId && createTransmitter(consoleId).connect();
})();