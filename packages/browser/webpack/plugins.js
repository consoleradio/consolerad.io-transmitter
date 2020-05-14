const webpack = require("webpack");
const shared = require("./shared");
const mode = require("./mode");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const ForkTsCheckerWebpackPluginConfig = new ForkTsCheckerWebpackPlugin({
    tsconfig: "../tsconfig.json",
    compilerOptions: {
        outDir: "",
        declaration: false
    }
});

const DefinePluginConfig = new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.VERSION": JSON.stringify(shared.version),
    "__DEV__": shared.dev,
});

const DotenvConfig = new Dotenv({
    path: `env/${mode}.env`,
    defaults: `env/default.env`
});

const plugins = [
    ForkTsCheckerWebpackPluginConfig,
    DefinePluginConfig,
    DotenvConfig
];

if (shared.dev) {
    plugins.unshift(new webpack.HotModuleReplacementPlugin());
} else {

    plugins.push(new CleanWebpackPlugin());

    if (process.env.ANALYZE_BUNDLE === "true") {
        plugins.push(new BundleAnalyzerPlugin());
    } else {
        plugins.push(new CompressionPlugin({
            filename: '[path]?gz',
            test: /\.(js)$/,
            deleteOriginalAssets: true
        }));
    }
}

module.exports = plugins;
