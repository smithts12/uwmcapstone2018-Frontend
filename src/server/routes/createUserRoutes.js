const express = require('express');
const axios = require('axios');
const uuid = require('uuid');
const router = express.Router();
const config = require('config');
const serviceUrl = config.get('serviceUrl');
const useMock = config.get('useMock');
const mockConfig = {
    root: 'user',
    responses: {
        get: true,
        create: true,
        update: false,
        delete: true
    }
};

const serviceURI = `${serviceUrl}/user`;
let mock = useMock ? require('../mock')[mockConfig.root] : null;

// Get all entities of this type
router.get('/', (req, res, next) => {
    if (useMock) {
        if (mockConfig.responses.get) {
            return res.status(200).send(mock);
        } else {
            return res.status(200).send('');
        }
    } else {
        const config = { headers: {
            Authorization: req.headers.authorization
        } };
        return axios.get(serviceURI, config)
            .then(response => res.send(response.data))
            .catch(err => next(err));
    }
});

// Create a new entity
router.post('/', (req, res, next) => {
    const { userData } = req.body;
    if (useMock) {
        if (mockConfig.responses.create) {
            const createdUser = { id: uuid.v4(), ...userData };
            mock = createdUser;
            return res.status(200).send(createdUser);
        } else {
            return res.status(401).send({ error: new Error("Uhhhh you're not authorized to create.") });
        }
    } else {
        const headers = { headers: { Authorization: req.headers.authorization } };
        return axios.post(serviceURI, null, headers)
            .then(response => res.send(response.data))
            .catch(err => next(err));
    }
});

// Update an entity
router.put('/', (req, res, next) => {
    const { userData } = req.body;
    if (useMock) {
        if (mockConfig.responses.update) {
            mock = userData;
            return res.status(200).send(userData);
        } else {
            return res.status(401).send({ error: new Error("Uhhhh you're not authorized to update.") });
        }
    } else {
        const headers = { headers: { Authorization: req.headers.authorization } };
        return axios.put(serviceURI, userData, headers)
            .then(response => res.send(response.data))
            .catch(err => next(err));
    }
});

// Delete an entity
router.delete('/', (req, res, next) => {
    const { userData } = req.body;

    if (useMock) {
        if (mockConfig.responses.delete) {
            mock = {};
            return res.status(200).send();
        } else {
            return res.status(401).send({ error: new Error("Uhhhh you're not authorized to delete.") });
        }
    } else {
        const headers = { headers: { Authorization: req.headers.authorization, 'Content-Type': req.headers['content-type'] } };
        return axios.delete(serviceURI, userData, headers)
            .then(response => res.send(response.data))
            .catch(err => next(err));
    }
});

module.exports = router;
