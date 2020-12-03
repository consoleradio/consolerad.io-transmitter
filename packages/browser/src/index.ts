import { LogLevel } from "@injex/core";
import { EnvPlugin } from "@injex/env-plugin";
import { Injex } from "@injex/webpack";
import { BrowserTransmitter } from "browserTransmitter.mdl";

const context = require.context(__dirname, true, /\.mdl\.ts$/);

async function createTransmitter(consoleId: string): Promise<BrowserTransmitter> {
    if (!consoleId) {
        throw new TypeError(`'consoleId' is missing.`);
    }

    const container = Injex.create({
        resolveContext: () => context,
        plugins: [
            new EnvPlugin({
                defaults: {
                    amplifiersNamespace: "amplifiers",
                    logLevel: LogLevel.Error,
                    useSecureConnection: false,
                    consoleId
                },
                environments: {
                    development: {
                        apiUrl: "http://api.dev.consolerad.io:3006",
                        logLevel: LogLevel.Debug
                    },
                    production: {
                        apiUrl: "https://api.consolerad.io",
                        useSecureConnection: true
                    }
                }
            })
        ]
    });

    await container.bootstrap();

    return container.get<BrowserTransmitter>("browserTransmitter");
}

export {
    createTransmitter
};
