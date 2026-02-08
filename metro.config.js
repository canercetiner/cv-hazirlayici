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

    // Mock react-native-google-mobile-ads for web platform
    if (platform === 'web' && moduleName === 'react-native-google-mobile-ads') {
        return {
            filePath: require.resolve('./node_modules/react-native-google-mobile-ads/lib/commonjs/index.js'),
            type: 'sourceFile',
        };
    }

    return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
