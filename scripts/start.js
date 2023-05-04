const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/start.js');
const webpackConfig = require('react-scripts/config/webpack.config');

//In order to override the webpack configuration without ejecting the create-react-app
defaults.__set__('configFactory', (webpackEnv) => {
    let config = webpackConfig(webpackEnv);

    //Customize the webpack configuration here,
    config.stats = { warnings:false }
    config.resolve.fallback = {
        "url": false,
        "path": false
    }

    return config;
}); 