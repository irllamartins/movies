module.exports = {
  presets:  ['@react-native/babel-preset'],//['module:metro-react-native-babel-preset'],
    plugins: [
     // ['@babel/plugin-transform-private-methods', { loose: true }],
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }]
    ]
  };