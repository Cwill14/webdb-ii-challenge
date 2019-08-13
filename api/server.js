const express = require('express');
const helmet = require('helmet');

const carRouter = require('../routers/car-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/cars', carRouter);

function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = Date.now();
    console.log(`${method} request to '${url}' at ${timestamp}`);
    next()
};

server.get('/', (req, res) => {
    res.status(200).json({ message: "it's working!" })
});

module.exports = server;