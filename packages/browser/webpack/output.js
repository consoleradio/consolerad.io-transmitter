const path = require("path");
const shared = require("./shared");

module.exports = {
    path: path.resolve(__dirname, "..", shared.destinationDir),
    publicPath: shared.publicPath,
    filename: `transmitter.js`,
    libraryTarget: 'umd',
    libraryExport: "default",
    library: ["ConsoleRadio"]
};