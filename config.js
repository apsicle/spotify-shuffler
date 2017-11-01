var config = function(env) {
    var configObj = {};
    if (env === 'prod') {
        configObj = {
            client_id: '7e69bb758d454f14a37b31aa195deb70',
            secret: process.env.NODE_ENV_SECRET,
            redirect_uri: 'https://spotify-shuffler.herokuapp.com/callback',
            port: process.env.PORT
        }
    } else {
        configObj = {
            client_id: '7e69bb758d454f14a37b31aa195deb70',
            secret: require('./secret.js').secret,
            redirect_uri: 'http://localhost:8080/callback',
            port: 8080
        }
    }
    
    return configObj;
}

module.exports = config;