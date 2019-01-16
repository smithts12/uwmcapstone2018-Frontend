'use strict';

const express = require('express');
const createEntityRoute = require('./routes/createEntityRoute');
const router = new express.Router();

// Auth/User routes
router.use('/user', require('./routes/createUserRoutes'));

// Documents routes
router.use('/document', require('./routes/createDocumentRoutes'));

// Entity routes
['certifications', 'companies', 'contacts', 'education', 'positions', 'projects'].forEach(entityType => {
    const { proxyRoute, ...entityRouteConfig } = require(`./routes/entities/${entityType}`);
    router.use(proxyRoute, createEntityRoute(entityRouteConfig));
});

module.exports = router;
