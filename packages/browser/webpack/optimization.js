const TerserPlugin = require("terser-webpack-plugin");

const TerserPluginConfig = new TerserPlugin({
    parallel: true,
    extractComments: false,
    terserOptions: {
        ecma: 6,
        output: {
            comments: false
        }
    }
});

module.exports = {
    minimizer: [
        TerserPluginConfig
    ]
};