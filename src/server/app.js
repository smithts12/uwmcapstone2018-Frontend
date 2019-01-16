'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const { resolve } = require('path');
const https = require('https');
const http = require('http');
const config = require('config');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const server = require('./');

let httpServer = null;
let httpsServer = null;

// is the service needing an api key?
// here is a good spot to do this
// axios.defaults.headers.common['apikey'] = process.env.MY_VARIABLE_NAME;

if (config.get('allowCORS')) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        next();
    });
}

// logging middleware
app.use(morgan('dev'));

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// prepend '/api' to URIs
app.use('/api', server);

// serve static files from public
app.use(express.static(resolve(__dirname, '..', '..', 'dist')));

// request any page and receive index.html
app.get('*', (req, res) => res.sendFile(resolve(__dirname, '..', '..', 'dist/index.html')));

if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production') {
    try {
        var certs = {
            cert: fs.readFileSync(process.env.SSL_CERT_FILE, 'utf8'),
            key: fs.readFileSync(process.env.SSL_KEY_FILE, 'utf8'),
        };
    } catch (error) {
        if (error.code === 'ENOENT') {
            const parsedError = new Error('Service is running inside kube cluster, but certificates are not found.');
            parsedError.code = 'ENOENT';
            throw (parsedError);
        } else {
            const parsedError = new Error('Service is running inside kube cluster, but an unknown error occured');
            parsedError.code = 'UNKNOWN_ERR';
            throw (parsedError);
        }
    }
    httpsServer = https.createServer(certs, app).listen(config.get('httpsListenerPort'), () => {
        const host = httpsServer.address().address;
        const port = httpsServer.address().port;
        console.log(`server listening at ${host}:${port}`);
    });
}

httpServer = http.createServer(app).listen(config.get('httpListenerPort'), () => {
    const host = httpServer.address().address;
    const port = httpServer.address().port;
    console.log(chalk.cyan('server listening at'), chalk.yellow(`${host}:${port}`));
});

process.on('SIGTERM', () => {
    if (httpServer) {
        httpServer.close(() => {
            console.log.info(chalk.red('SIGTERM issued...app is shutting down'));
            process.exit(0);
        });
    }
    if (httpsServer) {
        httpsServer.close(() => {
            console.log.info(chalk.red('SIGTERM issued...app is shutting down'));
            process.exit(0);
        });
    }
});

module.exports = app;
