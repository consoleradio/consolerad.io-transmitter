const webpack = require("webpack");
const shared = require("./shared");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const ForkTsCheckerWebpackPluginConfig = new ForkTsCheckerWebpackPlugin({
    eslint: {
        files: '../src/**/*.{ts,tsx}'
    },
    typescript: {
        configFile: "../tsconfig.json",
        configOverwrite: {
            compilerOptions: {
                outDir: "",
                declaration: false
            }
        }
    }
});

const DefinePluginConfig = new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.VERSION": JSON.stringify(shared.version),
    "__DEV__": shared.dev,
});

const plugins = [
    ForkTsCheckerWebpackPluginConfig,
    DefinePluginConfig
];

if (shared.dev) {
    plugins.unshift(new webpack.HotModuleReplacementPlugin());
} else {

    plugins.push(new CleanWebpackPlugin());

    plugins.push(new CompressionPlugin({
        filename: '[path]?gz',
        test: /\.(js)$/,
        deleteOriginalAssets: true
    }));
}

module.exports = plugins;