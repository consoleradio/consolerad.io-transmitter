import { bootstrap, IBootstrap, init, inject } from "@injex/core";
import { Injex } from "@injex/webpack";
import IEnvironment from "interfaces/IEnvironment";

@bootstrap()
export class Bootstrap implements IBootstrap {
    @inject() private $injex: Injex;
    @inject() private env: IEnvironment;

    @init()
    protected initialize() {
        this.$injex.logger.setLogLevel(this.env.logLevel);
        this.$injex.logger.setNamespace("BrowserTransmitter");
    }

    public run(): void | Promise<void> {
        this.$injex.logger.info(`browser transmitter created succesfully (${this.env.consoleId}).`);
    }
}