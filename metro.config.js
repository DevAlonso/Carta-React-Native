const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ignora react-native-maps cuando se compile para web
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName === "react-native-maps") {
    return {
      type: "empty",
    };
  }

  // Comportamiento por defecto para otros módulos
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
