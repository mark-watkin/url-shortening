import express from 'express';
import swaggerRoutes from './swagger.route';
import urlRoutes from './url.route';

export = (() => {
    const router = express.Router();
          
    router.use('/urls', urlRoutes);
    router.use('/', swaggerRoutes);

    return router;
})();