const CracoAntDesignPlugin = require('craco-antd');
// const decoratorsPlugin = require('@babel/plugin-proposal-decorators')
module.exports = {
  babel: {
    plugins: [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#008B8B",
        }
      }
    },
  ]
};