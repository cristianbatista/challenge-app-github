'use strict';

const router = require('express').Router();
const errors = require('./src/errors');
const healthRouter = require('./src/health/router');

// Wire up routers
router.use('/health', healthRouter);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
