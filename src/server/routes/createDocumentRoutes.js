const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('config');
const serviceUrl = config.get('serviceUrl');

const serviceURI = `${serviceUrl}/document`;

// Get all documents for a user
router.get('/:userID', (req, res, next) => {
    const { userID } = req.params;
    const config = { headers: {
        Authorization: req.headers.authorization
    } };
    const getUrl = serviceURI + '/retrievemany/' + userID;
    return axios.get(getUrl, config)
        .then(response => res.send(response.data))
        .catch(err => next(err));
});

// Create a new document
router.post('/', (req, res, next) => {
    const documentData = req.body;
    const headers = { headers: { Authorization: req.headers.authorization } };
    return axios.post(serviceURI, documentData, headers)
        .then(response => res.send(response.data))
        .catch(err => next(err));
});

// Delete a document
router.delete('/', (req, res, next) => {
    const { documentData } = req.body;
    const headers = { headers: { Authorization: req.headers.authorization, 'Content-Type': req.headers['content-type'] } };
    return axios.delete(serviceURI, documentData, headers)
        .then(response => res.send(response.data))
        .catch(err => next(err));
});

module.exports = router;
