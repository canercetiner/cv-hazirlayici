const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("mjs");

config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (moduleName === '@iabtcf/core') {
        return {
            filePath: require.resolve('@iabtcf/core/lib/cjs/index.js'),
            type: 'sourceFile',
        };
    }
    return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
